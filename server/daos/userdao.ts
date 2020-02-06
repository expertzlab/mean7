import { MongooseDaoBase } from "./MongooseDaoBase";
var mongoose = require('mongoose')
var MongooseSchema = mongoose.Schema
export class UserDao extends MongooseDaoBase{

    static dao: UserDao = new UserDao()

    static getUserDaoObject(){
        return this.dao
    }

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

    async findUser(username, password){
        let obj = {username:'', password:''}
        obj.username = username
        obj.password = password
        return await this.AccountModel.findOne(obj)
    }

    async closeConnection(){
        //this.mongooseConnection.close()
    }
}


