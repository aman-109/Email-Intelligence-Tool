import { Express } from "express"
import { ShipmentRouter } from "./shipment.js"
import { UserRouter } from "./user.js"

export default function api(app: Express) {
    app.use("/api/v1/shipments", ShipmentRouter)
    app.use("/api/v1/users", UserRouter)
}