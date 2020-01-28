import { Router } from "express";
import { json } from "body-parser";
import {MongoConnection} from '../utils/MongoConnection'
import { UserDao } from "../daos/userdao";
var bodyparser = require('body-parser')
let userDao = new UserDao()
var router:Router = Router()

router.post('/register',json(),(req, res) => {
    var user = req.body
    console.log('received from client:', user)
    let uid = user.id
    console.log('uid:',uid)
    userDao.insertUser(user).then(function(result){
        console.log('Result:',result)
        res.send(result)
    })
})

export const usercontroller:Router = router