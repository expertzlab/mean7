import { Router } from "express";
import cookieParser = require("cookie-parser");

const router:Router = Router()

router.use(cookieParser())

router.get('/cookie', (req, res) => {
    //res.send('{"data":"Welcome to Expertzlab! '+ req.params.name+'}')
    console.log('cookie:', req.cookies)
    res.cookie('myid','2333',{domain:'127.0.0.1',maxAge:600000, httpOnly:false})
    res.send('cookie set done')
})

export const cookiecontroller:Router = router