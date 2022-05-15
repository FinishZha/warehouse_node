const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { getAllInQuery,outTargetProductQuery,outHistoryQuery, reWorkHistotyQuery } = require('../services/OutWhMapper')
const { reWorkBackService, reWorkOutService } = require('../handles/OutWhService')

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
//获取出库记录
router.get('/getOutHistory', (req, res) =>{
    outHistoryQuery().then(history=>{
        new Result(history, '获取历史记录成功').success(res)
    })
})

//获取所有回库和返工出库的记录
router.get('/getReWorkHistory', (req, res)=>{
    reWorkHistotyQuery().then(history=>{
        new Result(history, '获取返工记录成功').success(res)
    }) 
})

//返工回库
router.post('/reWorkBack', (req, res)=>{
   let { barCode, createPerson } = req.body  
   async function reWorkBack(){
      let flag = await reWorkBackService(barCode, createPerson)
      if (flag === 'failed') {
          new Result('返工回库失败').fail(res)
      }else if(flag === 'success'){
          new Result('返工回库成功').success(res)
      }
   }
   reWorkBack()
})

//返工出库
router.post('/reWorkOut', (req, res)=>{
    let { barCode, outWarehousePerson } = req.body  
    async function reWorkOut(){
       let flag = await reWorkOutService(barCode, outWarehousePerson)
       if (flag === 'failed') {
           new Result('返工出库失败').fail(res)
       }else if(flag === 'success'){
           new Result('返工出库成功').success(res)
       }
    }
    reWorkOut()
 })

module.exports = router