import express = require("express");
import path = require('path')
import { json } from "body-parser";
import { welcomecontroller, usercontroller, logincontroller } from "./controllers";
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

passport.use(new LocalStrategy(function(username, password, done){
    console.log('Authentication Started:')
    if("james" === username && "abc123" === password)
        done(null, {'user.id':1})
    else
        done(null,false)

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

//app.use('/rest/user',logincontroller)

app.post('/rest/user/login',json(),
passport.authenticate('local',{failureRedirect:'/error'}),
function(req, resp){
    console.log('Authentication Success!')
    console.log('req-body:',req.body)
    //resp.redirect('/success?username=jack');
    resp.redirect('/success?username='+req.body.username)

})

console.log('static path:', path.join(__dirname,'../client/dist'))
app.use('/',express.static(path.join(__dirname,'../client/dist/client')))

app.listen(8080, ()=>{
    console.log('server listening on 8080:')
})
