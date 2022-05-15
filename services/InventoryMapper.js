const { querySql } = require('../db/index')

/**
 * 该系列语句是对所有产品进行分类
 *       所操作的数据库表为：producutItems
 * 
 * 1. 获取所有的仓库 根据（fstId--公司Id）
 * 2. 根据仓库id获取指定仓库下的所有托
 * 3. 根据给定的
 * 
 */
//获取所有的仓库
function getAllWoreHouseQuery(fstId) {
    return querySql(`SELECT wh.whId, wh.whCode, wh.createPerson, wh.createDate FROM warehouse wh WHERE fstId = '${fstId}' AND actFlag = '1';`)
}

//查询特定的库
function getTargetWarehouseQuery(fstId, whCode) {
    return querySql(`SELECT COUNT(*) whCount FROM warehouse WHERE fstId = '${fstId}' AND whCode = '${ whCode }';`)
}

//获取所有的托 
function getAllTrayQuery(fstId, whId){
    return querySql(`SELECT * FROM packages WHERE whId = '${ whId }' AND fstId = '${fstId}' AND actFlag = '1';`)
}

//获取指定的托 
function getTargetTrayCountQuery(fstId, whId, trayCode){
    return querySql(`SELECT COUNT(*) trayCount FROM packages WHERE whId = '${ whId }' AND fstId = '${fstId}' AND trayCode = '${trayCode}' AND actFlag = '1';`)
}

//获取指定库、指定托的所有产品
function getAllProductItemQuery(fstId, whId, strayId){
    return querySql(`SELECT proId, barCode, reqCode, createdate, inWarehouseDate, productStatus FROM productitems WHERE fstId = '${fstId}' AND whId = '${whId}' AND trayId = '${strayId}' AND actFlag = '1' AND productStatus IN ('1001','1003') ;`)
}

//获取指定库、指定托的所有产品数量
function getTargetProductItemCountQuery(fstId, whId, strayId){
    return querySql(`SELECT proId, barCode, reqCode, createdate, inWarehouseDate, productStatus FROM productitems WHERE fstId = '${fstId}' AND whId = '${whId}' AND trayId = '${strayId}' AND actFlag = '1' AND productStatus = '1001';`)
}

// 添加库
function addWarehouseQuery(whCode, fstId, createPerson){
    return querySql(`INSERT INTO warehouse (whCode, fstId, actFlag, createPerson, createDate) VALUES ('${whCode}', '${fstId}' , 1 , '${createPerson}', SYSDATE());`)
}

//添加托
function addTrayQuery(trayCode, whId, fstId, createPerson){
    return querySql(`INSERT INTO packages (trayCode, fstId, whId ,createDate, createPerson, actFlag) VALUES ('${trayCode}', '${fstId}', '${whId}', SYSDATE(), '${createPerson}', '1');`)
}

module.exports = {
    getAllWoreHouseQuery,
    getAllProductItemQuery,
    getAllTrayQuery,
    getTargetWarehouseQuery,
    addWarehouseQuery,
    addTrayQuery,
    getTargetTrayCountQuery,
    getTargetProductItemCountQuery
}