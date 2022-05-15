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


module.exports = {
    getAllInQuery,
    outTargetProductQuery
}