const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { checkPdfWarehouseExit,addWarehouse }  = require('../handles/InventoryService')
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
        checkMsg = await checkPdfWarehouseExit(fstId, whCode)
        if(checkMsg == 'unexited') {
            let addRes = await addWarehouse( whCode, fstId, createPerson)
            if( addRes == 'success') {
                new Result('库插入成功').success(res)
            }else{
                new Result('库插入失败').fail(res)
            }
        }else{
            new Result(`创建失败,因为该库${checkMsg}`).fail(res)
        }
    }
    createNewWarehouse()
})




module.exports = router