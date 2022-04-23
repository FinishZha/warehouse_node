const express = require('express')
const { getFuncName, getfstName } = require('../services/company')
const Result = require('../model/Result')

const router = express.Router()

router.get('/getcompany', (req, res) => {
    getfstName().then( fstNames => {
        if(!fstNames || fstNames.length === 0){
            new Result('获取公司名列表失败').fail(res)
        }else{
            new Result(fstNames, '获取所有公司名成功').success(res)
        }
    })
})

router.get('/getbill', (req, res) => {
    getFuncName().then(funcNames => {
        if(!funcNames || funcNames.length === 0){
            new Result('获取账套名列表失败').fail(res)
        }else{
            let funcNamesList = funcNames
            new Result(funcNamesList, '获取所有账套名成功').success(res)
        }
    })
})

//接着写者两接口

module.exports = router