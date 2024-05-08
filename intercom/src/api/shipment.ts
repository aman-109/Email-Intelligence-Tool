import { Router } from "express";
import prisma from "../prisma.js";
import logger from "../logger.js";
import fs from "fs"
import { authorize } from "../gmail-sync/index.js";
import { google } from "googleapis";
import { sendEmailAlert } from "../util/sendEmailAlert.js";
import { getusers } from "../util/getusers.js";
const router = Router()

//create shipment
router.post("/create", async (req, res) => {
    const { alias, mode, freightClass, originAddress, destinationAddress, users } = req.body;
    console.log("req.body",req.body);
    try {
        const shipment = await prisma.shipment.create({
            data: {
                id: `Inlops${Date.now()}`,
                alias,
                mode,
                freightClass,
                originAddress,
                destinationAddress,
                users: {
                    connect: users.map((userId) => ({ id: userId }))
                }
            }
        })
        logger.info(`Shipment created with alias:${alias} with users:${users}`)
        const usersobjs = await getusers(shipment.id);
        await sendEmailAlert(usersobjs,shipment.id);
        res.status(200).json(shipment)
    } catch (error) {
        logger.error(`Error creating shipment:`, error)
        res.sendStatus(500)
    }
})

//update shipment
router.patch("/:shipmentId", async (req, res) => {
    const { shipmentId } = req.params
    try {
        const shipment = await prisma.shipment.update({
            where: { id: shipmentId },
            data: { ...req.body }
        })
        logger.info(`Updated shipment:${shipmentId} successfully`)
        res.status(200).json(shipment)
    } catch (error) {
        logger.error(`Error updating shipment:${shipmentId}`, error)
        res.sendStatus(500)
    }
})

//get all shipments
router.get("/", async (req, res) => {
    console.log("Entered")
    try {
        const shipments = await prisma.shipment.findMany()
        res.status(200).json({ shipments })
        logger.info(`Fetched all shipments`)
    } catch (error) {
        logger.error(`Error fetching shipments:`, error)
        res.sendStatus(500)
    }
})

//get all shipments assigned to a user
router.get("/assignee/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const shipments = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                shipments: true
            }
        })
        logger.info(`Fetched all shipments for user:${userId}`)
        res.status(200).json(shipments)
    } catch (error) {
        logger.error(`Error fetching shipments for user:${userId} error:${error}`)
        res.sendStatus(500)
    }
})

//create shipment message
router.post("/:shipmentId/messages/create", async (req, res) => {
    const { shipmentId } = req.params
    const { from, to, content, authorId } = req.body
    try {
        const response = await prisma.message.create({
            data: {
                from,
                to,
                content,
                authorId,
                shipmentId
            }
        })
        logger.info(`Message stored for shipment:${shipmentId} from user:${authorId}`)
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Error storing message for shipment:${shipmentId} from user:${authorId}`, error)
        res.sendStatus(500)
    }
})


//get all shipment messages
router.get("/:shipmentId/messages", async (req, res) => {
    const { shipmentId } = req.params
    try {
        const response = await prisma.shipment.findUnique({
            where: { id: shipmentId },
            select: {
                messages: true
            }
        })
        logger.info(`Fetched all messages for shipment:${shipmentId}`)
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Error fetching shipments for shipment:${shipmentId}`, error)
        res.sendStatus(500)
    }
})

//get all shipment emails
router.get("/:shipmentId/emails", async (req, res) => {
    const { shipmentId } = req.params
    try {
        const response = await prisma.email.findMany({
            where: { shipmentId: shipmentId },
            include: {
                threadEmails: true
            }
        })
        logger.info(`Fetched all emails for shipment:${shipmentId}`)
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Error fetching emails for shipment:${shipmentId}`, error)
        res.sendStatus(500)
    }
})

router.get("/:shipmentId/emails/:parentEmailId/threads", async (req, res) => {
    const { shipmentId, parentEmailId } = req.params
    try {
        const response = await prisma.threadEmail.findMany({
            where: {
                parentId: parentEmailId
            }
        })
        logger.info(`Fetched thread emails successfully for parentEmailId:${parentEmailId}`)
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Error fetching thread emails for shipment:${shipmentId} with parentId:${parentEmailId}`)
        res.sendStatus(500)
    }
})

router.get("/:shipmentId/attachments", async (req, res) => {
    const { shipmentId } = req.params
    try {
        const response = await prisma.attachment.findMany({
            where: {
                shipmentId
            }
        })
        logger.info(`Fetched attachments for shipment:${shipmentId}`)
        res.status(200).json(response)
    } catch (error) {
        logger.error(`Error fetching attachments for shipment:${shipmentId} error:${error}`)
        res.sendStatus(500)
    }
})

router.get("/:shipmentId/attachments/:attachmentId/download", async (req, res) => {
    const { shipmentId, attachmentId } = req.params
    try {
        const attachment = await prisma.attachment.findUnique({
            where: {
                id: attachmentId
            }
        })

        const auth = await authorize()
        const attachmentData = await google.gmail({ version: "v1", auth }).users.messages.attachments.get({
            userId: process.env.GMAIL_USER_ID,
            messageId: attachment.messageId,
            id: attachment.gmailAttachmentId
        })
        logger.info(JSON.stringify(attachmentData))
        const tempFilePath = `./${attachment.id}-${attachment.name}`;
        fs.writeFileSync(tempFilePath, Buffer.from(attachmentData.data.data, 'base64'));

        res.download(tempFilePath, attachment.name, (err) => {
            if (err) {
                console.error('Download failed:', err);
                res.status(500).send('Error downloading file');
            } else {
                fs.unlinkSync(tempFilePath);
            }
        });
    } catch (error) {
        logger.error(`Error sending attachment for id:${attachmentId} error:${error}`)
        res.sendStatus(500)
    }
})

export { router as ShipmentRouter }