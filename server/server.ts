import express = require("express");
import path = require('path')
import { welcomecontroller, usercontroller } from "./controllers";
var app = express()

app.use('/rest',welcomecontroller)
app.use('/rest/user/',usercontroller)
console.log('static path:', path.join(__dirname,'../client/dist'))
app.use('/',express.static(path.join(__dirname,'../client/dist/client')))

app.listen(8080, ()=>{
    console.log('server listening on 8080:')
})
