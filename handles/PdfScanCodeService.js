const { loadingPdfCodes, checkPdfTrayCodeQuery, checkPdfTrayIdQuery, getStId, deleteErrorPdfBarCode, deleteErrorPdfTrayCode, queryBarCodeInTrayCode} = require('../services/PdfScanCodeMapper')
const { OPEN_DEBUG } = require('../globalconfig')


function loadingPdfCodesService(pdaCode, scanId, whId) {
    return loadingPdfCodes(pdaCode, scanId, whId)
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
    if(stId.length > 0){
        stId = stId[0].stId
        //先删除StorageBar所有条码，外键stId
        flag = await deleteErrorPdfBarCode(stId)
        //再删除storageTray的主键对应的记录
        flag = await deleteErrorPdfTrayCode(stId)
        flag = affectedRows
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
    scanAPdfTrayCodeService
}