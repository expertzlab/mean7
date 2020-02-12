import express = require("express");
import path = require('path')
import { json } from "body-parser";
import { welcomecontroller, usercontroller, logincontroller, homecontroller } from "./controllers";
import { UserDao } from "./daos/userdao";
var app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

var sessCookieConf = {
    secret: 'my cat',
    resave: true,
    saveUninitialized: true
}
app.use(session(sessCookieConf))

app.use(passport.initialize())
app.use(passport.session())
let udao = UserDao.getUserDaoObject()

app.use(function(req, res, next){
    console.log('url:'+ req.url)
    if(req.url == '/' || req.url == '/rest/user/login' || req.url.endsWith(".js")
    || req.url.endsWith(".css") || req.url.endsWith(".map")
    || req.url.endsWith(".ico")){
        console.log('forward')
        next();
    } else {
        console.log('jwt verification')
        console.log('req.headers', req.headers)
        
        if(req.headers.authorization == null){
            console.log('authorization header does not exist')
            res.send("Authentication Failed")
        } else {
            const token = req.headers.authorization.split(" ")[1]
            console.log('token found:', token)
            jwt.verify(token,'mykey',function(err, payload){
                if(err) throw new Error("Authentication Failed")
                else{
                    if(payload){
                        console.log('token user id:', payload.userid)
                        udao.findUserById(payload.userid).then((udoc) => {
                            console.log('user-loaded:', udoc)
                            req.user = udoc
                            next()
                        })
                    } else {
                        console.log('payload was not found')
                    }
                }
            })
        }
        
    }

    
})


passport.use(new LocalStrategy(function(username, password, done){
    console.log('Authentication Started:')
    udao.findUser(username, password).then(function(user){
        console.log('Local Strategy:',user)
        if(user == null)
            return done("User or Password Does Not exist", false)
        if(user.id){
            return done(null, {'userid':user.id})
        } else {
            return done(null,false)
        }
    })  
}))

passport.serializeUser(function(user, cb){
    console.log('serialize called')
    console.log('User object in serialize:', user)
    cb(null,{'id': user.userid})
})
passport.deserializeUser(function(user, cb){
    console.log('deserialize called')
    console.log('parms object in de-serialize:', id)
    cb(null,{'userid':user.id})
})

app.use('/rest',welcomecontroller)
app.use('/rest/user/',usercontroller)
app.use('/rest/success',homecontroller)
app.get('/error', (req, res) => res.send('{"message:"error logging in"}'));

app.use('/rest/user',logincontroller)

console.log('static path:', path.join(__dirname,'../client/dist'))
app.use('/',express.static(path.join(__dirname,'../client/dist/client')))

app.listen(8080, ()=>{
    console.log('server listening on 8080:')
})
