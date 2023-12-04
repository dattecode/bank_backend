import { AppError } from "../../common/errors/appErrors.js";
import { catchAsync } from "../../common/utils/catch.async.js";
import { UserSevice } from "./user.service.js";
import bcrypt from "bcrypt";

export const emailCheck = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSevice.findOneEmail(email);
  if (!user) {
    return next(new AppError("email or user invalid", 400));
  }

  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return next(new AppError("Rejected password", 400));
  }

  req.user = user;
  next();
});

export const userIdCheck = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserSevice.findOneId(id)
  if (!user) {
    return next(new AppError("email or user invalid", 400))
  }
  req.user = user,
  next()
});
