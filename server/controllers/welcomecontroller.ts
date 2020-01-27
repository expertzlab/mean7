import { Router } from "express";

const router:Router = Router()

router.get('/welcome/:name', (req, res) => {
    //res.send('{"data":"Welcome to Expertzlab! '+ req.params.name+'}')
    var obj = {data:'', name:''}
    obj.name = req.params.name
    obj.data = "welcome to Expertzlab"
    res.send(obj)
})

export const welcomecontroller:Router = router