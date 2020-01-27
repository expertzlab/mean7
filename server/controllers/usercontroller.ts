import { Router } from "express";
import { json } from "body-parser";
import {MongoConnection} from '../utils/MongoConnection'
import { UserDao } from "../daos/userdao";
var bodyparser = require('body-parser')

var router:Router = Router()

router.post('/register',json(),(req, res) => {
    var user = req.body
    console.log('received from client:', user)
    let uid = user.id
    console.log('uid:',uid)
    let connection = MongoConnection.getConnection()
    connection.then((client)=>{
        let session = client.startSession()
        session.startTransaction()
        let db = client.db('crm')
        let userDao = new UserDao()
        let promise = userDao.insertUser(user, db, (result)=> {
            res.send(result)
        })
        promise.then((result)=>{
            session.commitTransaction()
            session.endSession()
        })
        .catch((err)=>{
            session.abortTransaction();
            session.endSession();

            res.send('{"users":"User Insertion failed"}')
        })
    })
    .catch((err) => {
        console.log("db connection error:",err)
    })
 
    
})

export const usercontroller:Router = router