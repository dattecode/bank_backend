import express from "express"
import { testIng, transfer } from "./tranfer.controller.js"

export const router = express.Router()

router.get("/test", testIng)

router.post("/", transfer)