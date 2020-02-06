import { Router } from "express";
import { json } from "body-parser";
const passport = require('passport')

var router:Router = Router()


router.post('/login',json(),
passport.authenticate('local',{failureRedirect:'/error'}),
function(req, resp){
    console.log('Authentication Success!')
    console.log('req-body:',req.body)
    //resp.redirect('/success?username=jack');
    resp.redirect('/success?username='+req.body.username)

})

export const logincontroller:Router = router