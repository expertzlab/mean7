import express = require("express");
import path = require('path')
import { json } from "body-parser";
import { welcomecontroller, usercontroller, logincontroller } from "./controllers";
import { UserDao } from "./daos/userdao";
var app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var cookieParser = require('cookie-parser')

var sessCookieConf = {
    secret: 'my cat',
    resave: true,
    saveUninitialized: true
}
app.use(session(sessCookieConf))

app.use(passport.initialize())
app.use(passport.session())
let udao = UserDao.getUserDaoObject()

passport.use(new LocalStrategy(function(username, password, done){
    console.log('Authentication Started:')
    udao.findUser(username, password).then(function(user){
        console.log('Local Strategy:',user)
        if(user == null)
            return done("User or Password Does Not exist", false)
        if(user.id){
            return done(null, {'user.id':user.id})
        } else {
            return done(null,false)
        }
    })  
}))

passport.serializeUser(function(user, cb){
    console.log('serialize called')
    cb(null,{'id':1})
})
passport.deserializeUser(function(id, cb){
    console.log('deserialize called')
    cb(null,{'user.id':id})
})

app.use('/rest',welcomecontroller)
app.use('/rest/user/',usercontroller)
app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error TT logging in"));

app.use('/rest/user',logincontroller)

console.log('static path:', path.join(__dirname,'../client/dist'))
app.use('/',express.static(path.join(__dirname,'../client/dist/client')))

app.listen(8080, ()=>{
    console.log('server listening on 8080:')
})
