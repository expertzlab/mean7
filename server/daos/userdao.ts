import { MongooseDaoBase } from "./MongooseDaoBase";
var mongoose = require('mongoose')
var MongooseSchema = mongoose.Schema
export class UserDao extends MongooseDaoBase{

    AccountSchema
    AccountModel
    constructor(){
        super();
        this.AccountSchema = new MongooseSchema({
            username: {type:String},
            password:{type:String},
            profession:{type:String},
            date_created: {type: Date, default: Date.now},
            id: {type: Number, defualt:0},
            age:{type: Number},
            active: {type: Boolean, default: false}
        })
        this.AccountModel = mongoose.model ('account',this.AccountSchema)
    }
    
   async insertUser(user){
           let accountModel = new this.AccountModel(user)
           let result = await accountModel.save()
           return result
    }

    async loadAllUsers(){
       return await this.AccountModel.find({})
    }
}


