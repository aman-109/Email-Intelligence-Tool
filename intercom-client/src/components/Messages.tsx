import { useContext, useEffect, useState } from "react"
import { AppContext } from "../AppContext"
import axios from "axios"
import { baseUrl } from "../utils"
import { Attachment, Email } from "../types"
import EmailMessage from "./EmailMessage"
import AttachmentCard from "./AttachmentCard"
import { Container } from "lucide-react"
import SelecShipmentImage from "../assets/select-shipment.svg"
import NoAttachmentsImage from "../assets/no-attachments.svg"
import NoEmailImage from "../assets/no-emails.svg"

export default function Messages() {

    const { currentShipment } = useContext(AppContext)

    const [messages, setMessages] = useState<Email[]>([])
    const [attachments, setAttachments] = useState<Attachment[]>([])
    type MessageFilterType = "emails" | "attachments"
    const [messageFilter, setMessageFilter] = useState<MessageFilterType>("emails")
    const filters: { label: string, value: MessageFilterType }[] = [
        {
            label: "Emails",
            value: "emails"
        },
        {
            "label": "Attachments",
            value: "attachments"
        }
    ]

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/shipments/${currentShipment.id}/emails`)
                const messages: Email[] = response.data
                setMessages(messages)
            } catch (error) {
                console.log(error)
            }
        }
        const getAttachments = async () => {
            try {
                const response = await axios.get(`${baseUrl}/shipments/${currentShipment.id}/attachments`)
                const attachments: Attachment[] = response.data
                setAttachments(attachments)
            } catch (error) {
                console.log(error)
            }
        }
        messageFilter === "attachments" ? getAttachments() : getMessages()
    }, [currentShipment, messageFilter])

    return <div className={`w-full h-full flex flex-col ${!currentShipment && "items-center justify-center"}`}>
        {currentShipment && <>
            <div className="flex items-center border-b h-14">
                <div className="max-w-3xl w-full mx-auto flex items-center justify-between">
                    <div className="text-sm flex items-center gap-2">
                        <Container className="w-8 h-8" />
                        <div className="">
                            <h1>{currentShipment.id}</h1>
                            <p className="text-neutral-400">{currentShipment.alias}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {filters.map((filter) => <button
                            className={`text-xs px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${messageFilter === filter.value ? "bg-neutral-800 text-white" : "bg-neutral-100"}`}
                            onClick={() => setMessageFilter(filter.value)}
                            key={filter.value}>
                            {filter.label}
                        </button>)}
                    </div>
                </div>
            </div>
            {messageFilter !== "attachments" && <div className={`flex flex-col max-w-3xl w-full mx-auto items-end gap-3 overflow-y-auto py-4`}>
                {messages.length > 0 && messages.map((message) => <EmailMessage key={message.id} message={message} />)}
            </div>}
            {messages.length === 0 && messageFilter !== "attachments" && <div className="flex flex-col items-center gap-4">
                <img src={NoEmailImage} />
                <h1 className="text-lg font-semibold">No emails recevied</h1>
                <p className="max-w-xs text-center text-neutral-400">Currently there are no emails recevied for this shipment Id.</p>
            </div>}
            {messageFilter === "attachments" && attachments.length > 0 && <div className="h-full w-full">
                <h1 className="text-center text-neutral-400 py-4">All your attachments can be found below. Click on them to download.</h1>
                <div className="grid grid-cols-2 w-full max-w-3xl gap-4 mx-auto overflow-y-auto p-4">
                    {attachments.length > 0 && attachments.map((attachment) => <AttachmentCard key={attachment.id} attachment={attachment} />)}
                </div>
            </div>}
            {attachments.length === 0 && messageFilter === "attachments" && <div className="flex flex-col items-center justify-center gap-4">
                <img src={NoAttachmentsImage}  />
                <h1 className="text-lg font-semibold">No attachments found</h1>
                <p className="max-w-xs text-center text-neutral-400">Currently there are no attachments recevied for this shipment Id.</p>
            </div>}
        </>}
        {!currentShipment && <div className="flex flex-col items-center gap-4">
            <img src={SelecShipmentImage} />
            <h1 className="text-lg font-semibold">You must select a shipment</h1>
            <p className="max-w-xs text-center text-neutral-400">Once you select a shipment you will be able to view further details.</p>
        </div>}
    </div>
}