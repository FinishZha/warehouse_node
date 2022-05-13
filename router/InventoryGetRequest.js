const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { checkPdfWarehouseExitService, addWarehouseService, checkWarehouseIsFullService,addNewTaryService,checkTrayIsReaptService}  = require('../handles/InventoryService')
const { getAllWoreHouseQuery, getAllTrayQuery, getAllProductItemQuery } = require('../services/InventoryMapper')


//传入fstId获取库列表（此接口已完成）
router.get('/getAllWareHouse', (req, res) => {
    let { fstId } = req.query
    getAllWoreHouseQuery(fstId).then(wareHouseList => {
        new Result(wareHouseList, 'success').success(res)
    })
})

//传入fstId、whId获取托码列表（此接口已完成）
router.get('/getAllTray', (req, res)=>{
    let { fstId, whId } = req.query
    getAllTrayQuery(fstId, whId).then( trayList => {
        new Result(trayList, 'success').success(res)
    })
})


//传入fstId、whId、 trayId获取产品列表（此接口已完成）
router.get('/getAllProductItems', (req, res)=>{
    let {fstId, whId, strayId} = req.query
    getAllProductItemQuery(fstId, whId, strayId).then(productItemsList => {
        new Result(productItemsList, 'success').success(res)
    })
})

// 创建新库
router.post('/createNewWarehouse', (req, res) => {
    let { fstId, whCode, createPerson } = req.body
    let checkMsg = ''
    async function createNewWarehouse(){
        checkMsg = await checkPdfWarehouseExitService(fstId, whCode)
        if(checkMsg == 'unexited') {
            let addRes = await addWarehouseService( whCode, fstId, createPerson)
            if( addRes == 'success') {
                new Result('库创建成功').success(res)
            }else{
                new Result(`库创建失败,原因：此库${addRes}`).fail(res)
            }
        }else{
            new Result(`创建失败,原因：此库${checkMsg}`).fail(res)
        }
    }
    createNewWarehouse()
})

//创建新托
router.post('/createNewTray', (req, res)=>{
    let {trayCode, whId, fstId, createPerson} = req.body
    let checkMsg = ''
    async function createNewTray(){
       checkMsg = await checkWarehouseIsFullService(fstId, whId)
       if(checkMsg == 'full'){
         new Result(`不可创建托，原因:该库状态为${checkMsg}`).fail(res)
       }else{
        let checkTrayMsg = await checkTrayIsReaptService(fstId, whId, trayCode)
        if(checkTrayMsg == 'unduplication' ){
            //添加的调用
          let addRes = await addNewTaryService(trayCode, whId, fstId, createPerson) 
          if(addRes == 'success') {
                new Result('托创建成功').success(res)
            }else{
                new Result(`托创建失败,原因：${addRes}`).fail(res)
            }
          }else{
            new Result(`托创建失败,原因：本托码${checkTrayMsg}`).fail(res)
          }
       }
    }
    createNewTray()
})



module.exports = router