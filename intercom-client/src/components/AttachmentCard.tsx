import { Clock, FileText, Image, User } from "lucide-react";
import { Attachment } from "../types";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { baseUrl } from "../utils";
import moment from "moment";

export default function AttachmentCard({ attachment }: { attachment: Attachment }) {
    const { currentShipment } = useContext(AppContext)

    return <a target="_blank" href={`${baseUrl}/shipments/${currentShipment.id}/attachments/${attachment.id}/download`} key={attachment.id} className="flex items-center gap-2 border p-4 rounded-md hover:bg-neutral-50 hover:bg-opacity-80 transition-colors duration-200 cursor-pointer">
        {attachment.type === "application/pdf" && <FileText strokeWidth={1} className="w-14 h-14 text-neutral-400" />}
        {attachment.type === "image/png" && <Image strokeWidth={1} className="w-16 h-16 text-neutral-400" />}
        <div className="flex flex-col items-start gap-1">
            <h1 className="text-neutral-800 text-sm font-medium">{attachment.name}</h1>
            <p className="text-sm flex items-center gap-1 text-neutral-400"><User className="w-4 h-4" />{attachment.from}</p>
            <p className="text-sm flex items-center gap-1 text-neutral-400"><Clock className="w-4 h-4" />{moment(attachment.timestamp).fromNow()}</p>
        </div>
    </a>
}