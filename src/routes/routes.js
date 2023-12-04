import express from "express"
import { router as routerUser } from "../modules/users/user.routes.js"
import { router as routerTransfer } from "../modules/transfers/transfer.routes.js"
export const router = express.Router()

router.use("/users", routerUser)
router.use("/transfers", routerTransfer)
