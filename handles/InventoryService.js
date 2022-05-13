const { OPEN_DEBUG } = require('../globalconfig');
const { getTargetWarehouseQuery, addWarehouseQuery } = require('../services/InventoryMapper')

/**
 * 这是库存车间相关的服务函数
 */


//检测某库是否存在
async function checkPdfWarehouseExit(fstId, whCode){
    let msg = 'unexited'
    targetWarehouseCount = await getTargetWarehouseQuery(fstId, whCode)
    if( targetWarehouseCount[0].whCount > 0 ) {
        msg = 'exited'
    }
    console.log(msg);
    return msg
}

//创建库
async function addWarehouse(whCode, fstId, createPerson){
    let msg = 'success'
    addStatus = await addWarehouseQuery(whCode, fstId, createPerson)
    OPEN_DEBUG && console.log(addStatus);
    if(addStatus.affectRows < 1) {
        return msg = 'filed'
    }
    console.log(msg);
    return msg
}


//检查各方库是否满托
// async function che



//检查各托是否满件


module.exports = {
    checkPdfWarehouseExit,
    addWarehouse
}