import { Router } from "express";
import { json } from "body-parser";

import {MongoConnection} from '../utils/MongoConnection'
import { UserDao } from "../daos/userdao";
var bodyparser = require('body-parser')
let userDao = UserDao.getUserDaoObject()
var router:Router = Router()
const jwt = require('jsonwebtoken')

router.get('/',json(),(req, res) => {
    console.log('authenticated: '+req.isAuthenticated())
    
})

export const homecontroller:Router = router