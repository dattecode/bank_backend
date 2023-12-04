import { TransferModel } from "./transfer.module.js";

export class TranferService{
  static async createTranfer(data){
    return await TransferModel.create(data)
  }
  static async getAlltransfer(){
    return await TransferModel.findAll()
  }
  static async senderSearchTranfers(account){
    return await TransferModel.findAll({
      where:{
        senderAccount: account,
      },      
    })
  }
  static async reciverSearchTranfers(account){
    return await TransferModel.findAll({
      where:{
        reciverAccount: account,
      },      
    })
  }
}