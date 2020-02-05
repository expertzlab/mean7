import { MongooseDaoBase } from "./MongooseDaoBase";
var mongoose = require('mongoose')
var MongooseSchema = mongoose.Schema
export class UserDao extends MongooseDaoBase{

    AccountSchema
    AccountModel
    constructor(){
        super();
        this.AccountSchema = new MongooseSchema({
            username: {type:String, match:/[a-zA-Z]/},
            password:{type:String},
            profession:{type:String},
            date_created: {type: Date, default: Date.now},
            id: {type: Number, defualt:0},
            age:{type: Number, min:[18, 'Adults only'], max:45},
            active: {type: Boolean, default: false}
        })
        this.AccountModel = mongoose.model ('account',this.AccountSchema)
    }
    
   async insertUser(user, cb){
           let accountModel = new this.AccountModel(user)
           await accountModel.save(cb)
           return null
    }

    async loadAllUsers(){
       return await this.AccountModel.find({})
    }
}


