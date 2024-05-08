import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import api from "./api/index.js"
import emailSync from "./gmail-sync/index.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

api(app)
emailSync()

app.listen(3000, () => console.log("Server started at PORT:", PORT))