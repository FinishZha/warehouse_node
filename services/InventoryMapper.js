const { querySql } = require('../db/index')

/**
 * 该系列语句是对所有产品进行分类
 *       所操作的数据库表为：producutItems
 * 
 * 1. 获取所有的仓库 根据（fstId--公司Id）
 * 2. 根据仓库id获取指定仓库下的所有托
 * 3. 根据给定的
 * 
 *          
 * 
 */
//获取所有的仓库
function getAllWoreHouseQuery(fstId) {
    return querySql(`SELECT wh.whId, wh.whCode FROM warehouse wh WHERE fstId = '${fstId}' AND actFlag = '1';`)
}

//获取所有的托 
function getAllTrayQuery(fstId, whId){
    return querySql(`SELECT * FROM packages WHERE whId = '${ whId }' AND fstId = '${fstId}' AND actFlag = '1';`)
}

//获取指定库、指定托的所有产品
function getAllProductItemQuery(fstId, whId, strayId){
    return querySql(`SELECT  * FROM productitems WHERE fstId = '${fstId}' AND whId = '${whId}' AND trayId = '${strayId}' AND actFlag = '1';`)
}

module.exports = {
    getAllWoreHouseQuery,
    getAllProductItemQuery,
    getAllTrayQuery
}