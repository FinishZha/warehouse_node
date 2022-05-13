const { OPEN_DEBUG } = require('../globalconfig');
const { getTargetWarehouseQuery, addWarehouseQuery, getAllTrayQuery, addTrayQuery, getTargetTrayCountQuery } = require('../services/InventoryMapper')

/**
 * 这是库存车间相关的服务函数
 */


//检测某库是否存在
async function checkPdfWarehouseExitService(fstId, whCode){
    let msg = 'unexited'
    targetWarehouseCount = await getTargetWarehouseQuery(fstId, whCode)
    if( targetWarehouseCount[0].whCount > 0 ) {
        msg = 'exited'
    }
    console.log(msg);
    return msg
}

//创建库
async function addWarehouseService(whCode, fstId, createPerson){
    let msg = 'success'
    if(whCode.length > 0){
        addStatus = await addWarehouseQuery(whCode, fstId, createPerson)
        OPEN_DEBUG && console.log(addStatus);
        if(addStatus.affectRows < 1) {
            return msg = 'filed'
        }
        }else{
            return msg = 'whCode不能为空！'
        }
    return msg
}


//检查目标库是否满托
async function checkWarehouseIsFullService(fstId, whId){
    let msg = 'not full'
    trayCount = await getAllTrayQuery(fstId, whId)
    if(trayCount.length > 5){
        return msg = 'full'
    }
    return msg
}

//检查该添加托是否有重复
async function checkTrayIsReaptService(fstId, whId, trayCode){
    let msg = 'unduplication'
    let trayCount = await getTargetTrayCountQuery(fstId, whId, trayCode)
    console.log(trayCount[0].trayCount);
    if(trayCount[0].trayCount > 0){
        return msg = 'duplication'
    }
    console.log(msg + '1');
    return msg
}


//创建托
async function addNewTaryService(trayCode, whId, fstId, createPerson){
    let msg = 'success'
    if( trayCode.length > 0 ){
        console.log(createPerson);
        addStatus = await addTrayQuery(trayCode, whId, fstId, createPerson) 
        OPEN_DEBUG && console.log(addStatus);
        if(addStatus.affectRows < 1){
            return msg = 'failed'
        }
    }else{
        return mgs = 'trayCode不能为空！'
    }
   OPEN_DEBUG && console.log(msg);
    return msg
}


//检查各托是否满件


module.exports = {
    checkPdfWarehouseExitService,
    addWarehouseService,
    checkWarehouseIsFullService,
    addNewTaryService,
    checkTrayIsReaptService
}