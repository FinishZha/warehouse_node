const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { getAllInQuery,outTargetProductQuery } = require('../services/OutWhMapper')

router.get('/getAllOut', (req, res) => {
    let {fstId} = req.query
    getAllInQuery(fstId).then( result => {
        new Result( result,'success').success(res)
    })

})

router.post('/commonOut', (req, res) => {
    let {barCode, outWarehousePerson} = req.body
    outTargetProductQuery(barCode, outWarehousePerson).then(result=>{
        if(result.affectedRows >= 1){
            new Result('出库成功').success(res)
        }else{
            new Result('出库失败，目标产品不存在或已出库').fail(res)
        }
    })
})


module.exports = router