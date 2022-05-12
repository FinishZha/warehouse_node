const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const { loadingPdfCodesService, checkPdfTrayCodeService, deleteErrorPdfCodeServiece, queryBarCodeInTrayCodeService, commitTrayCodeIntoWhService, scanAPdfTrayCodeService } = require('../handles/PdfScanCodeService')
const { OPEN_DEBUG } = require('../globalconfig')

//1：每次扫入的一个托码到服务端进行验证并插入到暂存表(StorageTray和storageBar)
router.get('/scanAPdfTrayCode', (req, res)=>{
    let { pdaCode, scanId, whId, trayCode } = req.query
    let checkMsg = {}
    async function beginCheckTrayCode(){
        OPEN_DEBUG && console.log(checkMsg);
        //校验托码是属于本公司的结果处理
        let checkRes = await checkPdfTrayCodeService(null, null, whId, trayCode)
        console.log(checkRes);
        if(checkRes === 'success'){
            checkMsg.checkRes = '合法'
        }else{
            checkMsg.checkRes = checkRes
        }
        new Result(checkMsg).success(res)
        return checkMsg
    }
    //执行检查，检查扫入托码是否有资格插入暂存表
    beginCheckTrayCode()

    if(checkMsg.checkRes != '合法'){
        //不合法干什么
        return new Result('这条数据不可插入')
    }

    if(checkMsg.checkRes == '合法') {
        return new Result('这条数据可插入')
        //合法干什么
        //开始插入数据
        //2:取出托码对应的信息和托码下面条码对应的信息，
        //3:插入数据到storagetray和storageBar.此处还需要加上事务控制，保证全部成功或者全部失败
    }


    
})

//2：提交扫入的所有托码.
router.post('/commitPdfCode', (req, res) => {
    new Result('success').success(res)
})

//3:进入页面的时候载入上次还没有提交的暂存表的数据（此接口已完成）
router.get('/loadingPdfCodes', (req, res) => {
    let {pdaCode, scanId, whId} = req.query
    loadingPdfCodesService(pdaCode, scanId, whId).then( result => {
        new Result(result, 'success').success(res)
    } )
})

//4：左滑删除误扫入的托码,（此接口已完成）
router.post('/deleteErrorPdfCode', (req, res) => {
    // res.send('success')
    let {pdaCode, trayCode, scanId, whId} = req.body
    async function getFlag(){
        let flag =  await deleteErrorPdfCodeServiece(pdaCode, trayCode, scanId, whId)
        console.log(flag);
        if(flag > 0){
            return new Result('success').success(res)
        }else{
            return new Result('error').fail(res)
        }
    }
    getFlag()
})

//5：根据输入的托码查询对应该托码的条码（此接口已完成）
router.get('/queryBarCodeInTrayCode', (req, res) => {
    // res.send('success')
    let { trayCode } = req.query
    let productItemsList = ''
    async function getProduceItemsList(){
        productItemsList = await queryBarCodeInTrayCodeService(trayCode)
        return new Result(productItemsList, 'success').success(res)
    }
    getProduceItemsList()
})

//6.将托码提交到仓库
router.post('/commitTrayCodeIntoWh', (req, res) => {
    let { pdaCode, scanId, whId } = req.body
    let flag = ''
    async function getCommitTrayCodeFlag(){
        flag = await commitTrayCodeIntoWhService(pdaCode, scanId, whId)

        if( flag > 0 ){
            flag = 'success'
        }else{
            flag = 'error'
        }
        return flag
    }
    getCommitTrayCodeFlag()
})


module.exports = router