import fs from "fs/promises"
import path, { parse } from "path"
import { google } from "googleapis"
import { authenticate } from "@google-cloud/local-auth"
import prisma from "../prisma.js"
import logger from "../logger.js"
import { getMessageTone } from "../lib/openai.js"
import { clouddebugger } from "googleapis/build/src/apis/clouddebugger/index.js"
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js"
import { info } from "console"
import { getusers } from "../util/getusers.js"
import { sendWhatsappAlert } from "../util/sendWhatsappAlert.js"

const SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/drive",
]

const TOKEN_PATH = path.join(process.cwd(), "token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json")

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH)
        const credentials = JSON.parse(content.toString())
        return google.auth.fromJSON(credentials)
    } catch (err) {
        console.log("Error while AUTH init from token.json:", err)
        return null
    }
}

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH)
    const keys = JSON.parse(content.toString())
    const key = keys.installed || keys.web
    const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    })
    await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
    let client = null
    client = await loadSavedCredentialsIfExist()
    if (client) {
        console.log("Authorized with saved credentials")
        return client
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    })
    if (client.credentials) {
        console.log("Saved credentials to:", TOKEN_PATH)
        await saveCredentials(client)
    }
    return client
}

async function listEmails(auth, lastFetchedTime) {
    const response = await google.gmail({ version: "v1", auth }).users.messages.list({
        userId: process.env.GMAIL_USER_ID,
        q: `after:${lastFetchedTime}`
    })
    if (response.data.resultSizeEstimate === 0) return

    const emailList = response.data.messages
    emailList.forEach(async (emailConfig) => {
        const emailResponse = await google.gmail({ version: "v1", auth }).users.messages.get({
            id: emailConfig.id,
            userId: process.env.GMAIL_USER_ID,
        })
        const from = emailResponse.data.payload.headers.find((header) => header.name === "From").value
        const emailRegex = /[\w.-]+@[a-zA-Z-]+\.[a-zA-Z]+/;
        const fromMatches = from.match(emailRegex)
        const fromEmail = fromMatches[0]
        const subject = emailResponse.data.payload.headers.find((header) => header.name === "Subject").value
        if(!emailResponse.data.payload.parts) return
        const encodedBody = emailResponse.data.payload.parts[0].body
        let bodytext = ""
        if (encodedBody.size === 0 && emailResponse.data.payload.parts[0].parts[0].mimeType === "text/plain") {
            bodytext = Buffer.from(emailResponse.data.payload.parts[0].parts[0].body.data, "base64").toString()
        }
        if (encodedBody.size > 0) {
            bodytext = Buffer.from(encodedBody.data, "base64").toString()
        }
        const parsedBodyText = bodytext.split("\r\n\r\nOn")[0]

        const inlopsIdRegex = /Inlops[\w\d]{13}/;
        const inlopsIdMatches = subject.match(inlopsIdRegex)

        if (!inlopsIdMatches) {
            return logger.info(`GMAIL PARSER:: No InlopsID matched for subject:${subject}`)
        }
        const inlopsId = inlopsIdMatches[0]
        try {
            logger.info(`GMAIL PARSER:: Processing email:${emailConfig.id} with InlopsId:${inlopsId} and subject:${subject}`)
            const shipment = await prisma.shipment.findUnique({
                where: {
                    id: inlopsId
                }
            })
            if (!shipment) return logger.info(`GMAIL PARSER:: No shipment found with InlopsId:${inlopsId} for email:${emailConfig.id}`)

            if (emailConfig.id === emailConfig.threadId) {
                const email = await prisma.email.findUnique({
                    where: {
                        id: emailConfig.id
                    }
                })
                if (email) return logger.info(`GMAIL PARSER:: Parent email with emailId: ${emailConfig.id} stored already`)

                const messageAnalysis: { tone: string, reply: string } | null = await getMessageTone(parsedBodyText)
                let eventKeys = []
                if (messageAnalysis.tone === "negative") {
                    eventKeys = ["destination-customs", "origin-trucking"]
                    const users = await getusers(inlopsId);
                    const sendAlert = await sendWhatsappAlert(users,inlopsId)
                }
                await prisma.email.create({
                    data: {
                        id: emailConfig.id,
                        subject: subject,
                        body: bodytext.toString(),
                        from: fromEmail,
                        to: process.env.GMAIL_USER_ID,
                        shipmentId: inlopsId,
                        ...(messageAnalysis && { reply: messageAnalysis.reply, tone: messageAnalysis.tone, eventKeys: eventKeys.join(", ") })
                    }
                })
                emailResponse.data.payload.parts.forEach(async (part) => {
                    if (part.mimeType !== "application/pdf" && part.mimeType !== "image/png") {
                        return
                    }
                    logger.info("Entered mime type check")
                    const attachment = await prisma.attachment.findFirst({
                        where: {
                            gmailAttachmentId: part.body.attachmentId
                        }
                    })

                    logger.info("No error while checking ")
                    if (attachment) return
                    try {
                        await prisma.attachment.create({
                            data: {
                                from: fromEmail,
                                name: part.filename,
                                messageId: emailConfig.id,
                                type: part.mimeType,
                                gmailAttachmentId: part.body.attachmentId,
                                shipmentId: inlopsId,
                            }
                        })
                    } catch (error) {
                        logger.error("Error storing attachments", error)
                    }
                })
                logger.info(`GMAIL PARSER:: Parent email:${emailConfig.id} stored for shipment:${inlopsId} with subject:${subject}`)
                return
            }

            const threadEmail = await prisma.threadEmail.findUnique({
                where: {
                    id: emailConfig.id
                }
            })

            if (threadEmail) return logger.info(`GMAIL PARSER:: Thread email:${emailConfig.id} of thread:${emailConfig.threadId} with stored already`)
            const messageAnalysis: { tone: string, reply: string } | null = await getMessageTone(parsedBodyText)
            let eventKeys = []
            if (messageAnalysis.tone === "negative") {
                eventKeys = ["destination-customs", "origin-trucking"]
            }
            await prisma.threadEmail.create({
                data: {
                    id: emailConfig.id,
                    body: parsedBodyText,
                    from: fromEmail,
                    parentId: emailConfig.threadId,
                    ...(messageAnalysis && { reply: messageAnalysis.reply, tone: messageAnalysis.tone, eventKeys: eventKeys.join(", ") })
                }
            })
            emailResponse.data.payload.parts.forEach(async (part) => {
                if (part.mimeType !== "application/pdf" && part.mimeType !== "image/png") {
                    return
                }
                const attachment = await prisma.attachment.findFirst({
                    where: {
                        gmailAttachmentId: part.body.attachmentId
                    }
                })
                if (attachment) return
                await prisma.attachment.create({
                    data: {
                        from: fromEmail,
                        name: part.filename,
                        type: part.mimeType,
                        gmailAttachmentId: part.body.attachmentId,
                        shipmentId: inlopsId,
                        messageId: emailConfig.id
                    }
                })
            })
        } catch (error) {
            logger.info(`Shipment error`, error)
        }
    })
}

export default async function emailSync() {
    const auth = await authorize();
    setInterval(async () => {
        await listEmails(auth, "1702631168")
        logger.info("GMAIL PARSER:: Synced emails for shipments")
    }, 10000)
}