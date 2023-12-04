import { UserModel } from "./user.model.js";

export class UserSevice {
  static async findOneEmail(email) {
    return await UserModel.findOne({
      where: {
        email,
      },
    });
  }
  static async findOneId(id) {
    return await UserModel.findOne({
      where: {
        id,
      },
    });
  }
  static async create(data) {
    return await UserModel.create(data);
  }
  static async findAllusers() {
    return await UserModel.findAll();
  }
  static async updateAmount(user, amount){
    return await user.update(amount)
  }
}
