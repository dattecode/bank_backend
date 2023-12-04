import { validateUser, validatePartialUser } from "./use.schema.js";
import { catchAsync } from "../../common/utils/catch.async.js";
import { UserSevice } from "./user.service.js";
import { AppError } from "../../common/errors/appErrors.js";
import { TranferService } from "../transfers/transfer.service.js";

export const register = catchAsync(async (req, res) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  const user = await UserSevice.create(userData);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  return res.status(200).json(user);
});

export const login = catchAsync(async (req, res) => {
  const user = req.user

  return res.status(200).json({
    message: "Connection successfull",
    id: user.id,
    name: user.name,
    email: user.email,
    amount: user.amount,
    accountNumber: user.accountNumber,
  });
});

export const findAllusers = catchAsync(async (req, res) => {
  const users = await UserSevice.findAllusers();
  return res.status(200).json({
    message: "test conection on",
    users,
  });
});

export const historyAccount = catchAsync(async (req, res) => {
  const user = req.user

  const senderTransfers = await TranferService.senderSearchTranfers(user.accountNumber)
  const senderCheck = senderTransfers.length > 0 ?senderTransfers : null
  const reciverTransfers = await TranferService.reciverSearchTranfers(user.accountNumber)
  const reciverCheck = reciverTransfers.length > 0 ? reciverTransfers : null;

  return res.status(200).json({
    message: "Conection On",
    senderCheck,
    reciverCheck
  });
});
