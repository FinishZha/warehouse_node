const { loadingPdfCodes, checkPdfTrayCodeQuery, checkPdfTrayIdQuery, getStId, deleteErrorPdfBarCode, deleteErrorPdfTrayCode, queryBarCodeInTrayCode, getProducyItemsCountQuery, addTrayCodeInStQuery, checkNTrayCodeQuery, delErrorBarCodeQuery, addNewBarCodeQuery} = require('../services/PdfScanCodeMapper')
const { getTargetTrayCountQuery } = require('../services/InventoryMapper')
const { OPEN_DEBUG } = require('../globalconfig')


function loadingPdfCodesService(pdaCode, scanId, whId) {
    return loadingPdfCodes(pdaCode, scanId, whId)
}


//缓存表新建托，storagetray
async function addNewPdftrayService(pdaCode, trayCode, createPerson){
    let msg = 'success'
    let addRes = await addTrayCodeInStQuery(pdaCode ,trayCode, createPerson)
    if(addRes.affectRows <= 0){
        return msg = 'failed'
    }
    return msg
}


// 先检测要创建的托是否存在
async function checkNewTrayStService(fstId, whId, trayCode ) {
    let msg = 'success'
    let trayList = await getTargetTrayCountQuery(fstId, whId, trayCode)
    console.log(trayList);
    if(trayList[0].trayCount >= 1){
        msg = 'real excited'
    }
    let trayNMsg = await checkNTrayCodeQuery(trayCode)
    if( trayNMsg[0].whCount >= 1){
        msg = 'vitual excited'
    }
    console.log(msg);
    return msg
}



// 插入单条数据到缓存库里面
async function addTargetBarCodeService(barCode){
    let msg = 'success'
    let delRes = await addNewBarCodeQuery(barCode)
    if(delRes.affectedRows <= 0){
        msg = 'failed'
    }
    return msg
    // console.log(del);
}


//删除指定的体条码
async function delTargetBarCodeService(barCode){
    let msg = 'success'
    let delRes = await delErrorBarCodeQuery(barCode)
    if(delRes.affectedRows <= 0){
        msg = 'failed'
    }
    return msg
    // console.log(del);
}




async function scanAPdfTrayCodeService(pdaCode, scanId, whId, trayCode){
    let msg = 'success'
    msg = await checkPdfTrayCode(pdaCode, scanId, whId, trayCode)
    if( msg != 'success' ){
        return msg
    }
    //2:取出托码对应的信息和托码下面条码对应的信息，
        
    //3:插入数据到storagetray和storageBar.此处还需要加上事务控制，保证全部成功或者全部失败

    return msg
}


async function checkPdfTrayCodeService( pdaCode, scanId, whId, trayCode ){
    let msg = 'success'
    let res = await checkPdfTrayCodeQuery(trayCode)
    //1:要校验托码是属于本公司的，
    if(res.length == 0 || res == null){
       return msg = '该托码不属于本公司'
    }else{
         //2:校验托码是属于本仓库的
        if( res[0].whId != whId ){
            return  msg = '该托码不属于本仓库'
        }
        //3:要校验托码状态是为1，表示待入库状态的。
        if(res[0].pkStatus != 1 ){
            return  msg = '该托码状态不是待入库状态'
        }
        //4:要校验(校验那个表？ strongTray)暂存表里面已经有该条记录，不能重复插入.
        let stbTrayIdCheckRes = await checkPdfTrayIdQuery(res[0].trayId, trayCode)
        OPEN_DEBUG &&  console.log(stbTrayIdCheckRes);
        if(stbTrayIdCheckRes.length > 0 || stbTrayIdCheckRes != null){
            return msg = '已有记录，不可重复插入'
        }
    }
    //返回结果
    return msg
}

async function deleteErrorPdfCodeServiece(pdaCode, trayCode, scanId, whId){
    //建立初始状态
    let flag = 0
    //根据传入参数找到要删除的StorageTray的主键stId
    let stId = await getStId(pdaCode, trayCode, scanId , whId) 
    console.log(stId);
    if(stId.length > 0){
        stId = stId[0].stId
        //先删除StorageBar所有条码，外键stId
        flag = await deleteErrorPdfBarCode(stId)
        console.log(flag);
        //再删除storageTray的主键对应的记录
        flag = await deleteErrorPdfTrayCode(stId)
        // if(flag) {
        //     flag = affectedRows
        // }
        flag = flag.affectedRows
    }else{
         flag = 0
    }
    return flag
}

async function queryBarCodeInTrayCodeService(trayCode){
    return await queryBarCodeInTrayCode(trayCode)
}

async function commitTrayCodeIntoWhService(pdaCode, scanId, whId){
    //1:检验是否能提交。这里简化不写了.
        //2:提交要生成一个单据，需要重新设计三张表，这里就化简了。
        //...最后一步，就是提交插入都完成了，就把storageTray和StorageBar的暂存表对应的actFlag
        // 置为-1表示已经提交，0表示是误操作删除。
        //这里只写最后一步。其实和误删除的操作方式类似.但是这里是批处理
}

module.exports = {
    loadingPdfCodesService,
    checkPdfTrayCodeService,
    deleteErrorPdfCodeServiece,
    queryBarCodeInTrayCodeService,
    commitTrayCodeIntoWhService,
    scanAPdfTrayCodeService,
    checkNewTrayStService,
    addNewPdftrayService,
    delTargetBarCodeService,
    addTargetBarCodeService
}