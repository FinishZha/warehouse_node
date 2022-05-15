const {querySql} = require('../db/index')

//该文件包含所有的出库类服务

//1.获取所有的已经入库和已经返工重入库的
// 1001 已经入库的
// 1003 返工后重新入库的
function getAllInQuery(fstId){
    return querySql(`SELECT * FROM productitems WHERE fstId = '${fstId}' AND actFlag = '1' AND productStatus in ('1003', '1001');`)
}


//扫码出库
function outTargetProductQuery(barCode, outWarehousePerson){
    return querySql(`UPDATE productitems SET outWarehouseDate = NOW(), outWarehousePerson = '${outWarehousePerson}', productStatus = '1002' WHERE barcode = '${barCode}' AND outWarehouseDate IS NULL;`)
}

//查询出库记录
function outHistoryQuery(){
    return querySql(`SELECT * FROM productitems WHERE actFlag=1 AND productStatus = 1002;`)
}

//查询所有返工出库和返工回库列表
function reWorkHistotyQuery(){
    return querySql(`SELECT * FROM productitems WHERE actFlag=1 AND productStatus IN (1006, 1003);`)
}

//返工出库
function reWorkOutTargetProductQuery(barCode, outWarehousePerson){
    return querySql(`UPDATE productitems SET reWorkData = NOW(), outWarehousePerson = '${outWarehousePerson}', productStatus = '1006' WHERE barcode = '${barCode}' AND productStatus IN ('1001', '1003');`)
}

//返工回库
//1006为返工中状态
function reWorkBackTargetProductQuery(barCode, createPerson){
    return querySql(`UPDATE productitems SET outWarehouseDate = NULL, reWorkData = NULL, createPerson = '${createPerson}', productStatus = '1003' WHERE barcode = '${barCode}' AND productStatus = '1006';`)
}

module.exports = {
    getAllInQuery,
    outTargetProductQuery,
    outHistoryQuery,
    reWorkHistotyQuery,
    reWorkOutTargetProductQuery,
    reWorkBackTargetProductQuery
}