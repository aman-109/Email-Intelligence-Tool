import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { baseUrl } from "../utils"
import { Shipment, ShipmentFilterType } from "../types"
import { AppContext } from "../AppContext"
import { Container } from "lucide-react"
import moment from "moment"

export default function ChatSidebar() {
    const { currentShipment, updateCurrentShipment } = useContext(AppContext)

    const [shipmentFilter, setShipmentFilter] = useState<ShipmentFilterType>("all")
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [isShipmentLoading, setShipmentLoading] = useState(true)

    const filters: { label: string, value: ShipmentFilterType }[] = [{ label: "All", value: "all" }, { label: "Assigned", value: "assigned" }]

    useEffect(() => {
        const getShipments = async () => {
            setShipmentLoading(true)
            const endpoint = shipmentFilter === "all" ? "/shipments" : "/shipments/assignee/a410e120-cf88-45ec-b644-2fd16cf8831e"
            try {
                const response = await axios.get(`${baseUrl}${endpoint}`)
                const data: Shipment[] = response.data.shipments
                setShipments(data)
                updateCurrentShipment(data[1])
                setShipmentLoading(false)
            } catch (error) {
                setShipmentLoading(false)
                console.log(error)
            }
        }
        getShipments()
    }, [shipmentFilter])


    return <div className="border-r min-w-[320px] h-full">
        <div className="flex items-center gap-2 px-4 h-14 border-b">
            {filters.map((filter) => <button
                className={`text-xs px-4 py-2 rounded-md transition-colors duration-200 ease-in-out ${shipmentFilter === filter.value ? "bg-neutral-800 text-white" : "bg-neutral-100"}`}
                onClick={() => setShipmentFilter(filter.value)}
                key={filter.value}>
                {filter.label}
            </button>)}
        </div>
        <div className="">
            {!isShipmentLoading && shipments.map((shipment, index) => <div key={index} onClick={() => {
                updateCurrentShipment(shipment)
            }} className={`py-2 px-4 cursor-pointer border-b flex flex-col items-start gap-1.5 ${currentShipment && shipment.id === currentShipment.id && "bg-neutral-900 text-white"}`}>
                <div className="flex items-center gap-2 w-full">
                    <Container className="w-6 h-6" />
                    <div className="w-full">
                        <h1 className="text-sm font-medium">{shipment.id}</h1>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm text-neutral-400">{shipment.alias}</p>
                            <p className="text-xs text-neutral-400">{moment(shipment.createdAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>)}
            {isShipmentLoading && <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
                <p>Please wait</p>
            </div>}
        </div>
    </div >
}