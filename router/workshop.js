const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { waitintoWorkshop, getAllRealinWrokshop, getAllWaitintoWrokshop } = require('../services/workshop')
const { OPEN_DEBUG } = require('../globalconfig')


//提交数据(单条)
router.post('/codeinto', (req, res)=>{
    let { pdaCode, trayCode } = req.body
    if(pdaCode && trayCode){
        waitintoWorkshop(pdaCode, trayCode).then((result, error) => {
            if (error){
                OPEN_DEBUG && console.log(error);
                new Result( error, '插入数据失败').fail(res)
            }else{
                new Result('插入数据成功').success(res)
            }
        })
    }else{
        new Result('任何字段不能为空').fail(res)
    }
})

//查询仓库中真正存在的
router.get('/getallrealinworkshop', (req, res) =>{
    getAllRealinWrokshop().then((goods, err)=>{
        if(err) {
            new Result('查询失败').fail(req)
        }else{
            new Result(goods ,'查询数据成功').success(res)
        }
    })
})

//查询等待入库的
router.get('/getallwaitintoworkshop', (req, res) =>{
    getAllWaitintoWrokshop().then((goods, err)=>{
        if(err) {
            new Result('查询失败').fail(req)
        }else{
            new Result(goods ,'查询数据成功').success(res)
        }
    })
})

module.exports = router