import express from "express";
import {
  findAllusers,
  historyAccount,
  login,
  register,
} from "./user.controller.js";
import { emailCheck, userIdCheck } from "./users.middleware.js";

export const router = express.Router();

router.post("/signup", register);
router.post("/login", emailCheck, login);

router.post("/:id/history", userIdCheck, historyAccount);

