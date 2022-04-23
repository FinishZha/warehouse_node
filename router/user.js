const express = require('express')
const { is } = require('express/lib/request')
const { OPEN_DEBUG } = require('../globalconfig')
const Result = require('../model/Result')
const { login } = require('../services/user')

const router = express.Router()

router.post('/login', (req, res)=>{
    let { usercode, pwd } = req.body
    OPEN_DEBUG && console.log(req.body)
    login(usercode, pwd).then( user => {
        if(!user || user.length === 0){
            new Result('登录失败').fail(res)
        }else{
            new Result('登录成功').success(res)
        }
    })
    
})


module.exports = router