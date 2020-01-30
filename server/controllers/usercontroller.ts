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
    userDao.insertUser(user).then(function(result1){
        console.log('Result1:',result1)
        userDao.loadAllUsers().then(function(result2){
            let resObj = {users:[]}
            resObj.users = result2
            console.log('Result2:',result2)
            res.send(resObj)
        }) 
    })
})

export const usercontroller:Router = router