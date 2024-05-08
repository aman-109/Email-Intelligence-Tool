import { Router } from "express";
import prisma from "../prisma.js";
import logger from "../logger.js";
const router = Router();

//get all users
router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
        logger.info("Fetched all users")
    } catch (error) {
        logger.error(`Error fetching users:`, error)
        res.sendStatus(500)
    }
})

//create new user
router.post("/create", async (req, res) => {
    const { email, name, role, phone } = req.body

    if (!email || !name || !role || !phone) {
        return res.sendStatus(400)
    }
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                role,
                phone
            }
        })
        res.status(200).json(user)
        logger.info(`Created user:${name} email:${email}  successfully`)
    } catch (error) {
        logger.info(`Error creating user:${name} & email:${email}`, error)
        res.sendStatus(500)
    }
})



export { router as UserRouter }