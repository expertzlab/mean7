import { Router } from "express";
import { json } from "body-parser";
const passport = require('passport')
const jwt = require('jsonwebtoken')
var router:Router = Router()


router.post('/login',json(),
passport.authenticate('local',{failureRedirect:'/error'}),
function(req, resp){
    console.log('Authentication Success!')
    console.log('req-body:',req.body)
    if(req.isAuthenticated){
        console.log('logincontroller: creating jwt')
        let token = jwt.sign({'userid':req.params.uid},'mykey')
        resp.send('{"meesage":"Welcome to Home","token":"'+token+'"}')
  
    } else {
        resp.send('{"message":"error"}')
    }

})

export const logincontroller:Router = router