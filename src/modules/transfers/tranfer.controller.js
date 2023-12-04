import { AppError } from "../../common/errors/appErrors.js";
import { catchAsync } from "../../common/utils/catch.async.js";
import { UserSevice } from "../users/user.service.js";
import { TranferService } from "./transfer.service.js";

export const testIng = catchAsync(async (req, res) => {
  const tranfers = await TranferService.getAlltransfer();

  return res.status(200).json({
    message: "connection tranfers",
    tranfers,
  });
});

export const transfer = catchAsync(async (req, res, next) => {
  const { senderUser, receiverUser, amount } = req.body;

  const sender = await UserSevice.findOneEmail(senderUser);
  if (!sender) {
    return next(new AppError("email or sender invalid", 400));
  }
  if (!sender.amount < 0) {
    return next(new AppError("insufficient funds to make the transfer", 500));
  }
  if (sender.amount < amount) {
    return next(new AppError("insufficient funds to make the transfer", 500));
  }

  const receiver = await UserSevice.findOneEmail(receiverUser);
  if (!receiver || sender.email === receiver.email) {
    return next(new AppError("email or receiver invalid", 400));
  }

  const senderUpdate = await UserSevice.updateAmount(sender, {
    amount: sender.amount - amount,
  });
  const receiverUpdate = await UserSevice.updateAmount(receiver, {
    amount: receiver.amount + amount,
  });

  const transfer = await TranferService.createTranfer({
    amount,
    senderAccount: sender.accountNumber,
    reciverAccount: receiver.accountNumber,
  });

  return res.status(200).json({
    message: "Connection Tranfers",
    senderTotal: `${senderUpdate.amount}`,
    receiverTotal: `${receiverUpdate.amount}`,
    transfer,
  });
});
