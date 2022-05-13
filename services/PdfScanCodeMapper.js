const { querySql } = require('../db/index')

function loadingPdfCodes(pdaCode, scanId, whId){
    return querySql(`SELECT * FROM storagetray WHERE pdaCode = '${pdaCode}' AND scanId = '${scanId}' AND whId = '${ whId }' AND actFlag = 1;`)
}

function checkPdfTrayCodeQuery(trayCode) {
     return querySql(`SELECT ps.trayId, ps.trayCode, ps.fstId, ps.whId, ps.pkStatus FROM packages ps WHERE ps.trayCode = '${trayCode}' AND actFlag = 1`)
}

function checkPdfTrayIdQuery(trayId, trayCode) {
    return querySql(`SELECT * FROM  storagetray st WHERE st.trayId = '${trayId}' AND st.trayCode = '${trayCode}';`)
}

function queryBarCodeInTrayCode(trayCode){
    return querySql(`SELECT pis.fstId, pis.barcode, pis.reqCode, pis.proId from productItems pis  WHERE pis.proId in (SELECT proId FROM packageItems WHERE trayId in (SELECT trayId FROM packages WHERE actFlag = 1 AND trayCode = '${trayCode}' )) AND pis.actFlag = 1;`)
}

function getStId(pdaCode, trayCode, scanId, whId){
    return querySql(`SELECT stId FROM storagetray WHERE pdaCode = '${pdaCode}' AND scanId = '${scanId}' AND whId = '${whId}' AND trayCode = '${trayCode}';`)
}

function updatePdfBarCodes(pdaCode, scanId, whId){
    return querySql(`UPDATE storagebar SET actFlag = -1 WHERE stId IN (SELECT stId FROM storagetray WHERE pdaCode = '${pdaCode}' AND scanId = '${scanId}' AND whId = '${whId}');`)
}

function updatePdfTrayCodes(pdaCode, scanId, whId){
    return querySql(`UPDATE storagetray SET actFlag = '-1' WHERE stId IN (SELECT * FROM storagetray WHERE pdaCode = '${pdaCode}' AND scanId = '${scanId}' AND whId = '${whId}');`)
}

function deleteErrorPdfBarCode(stId){
    return querySql(`UPDATE storagebar SET actFlag = 0 WHERE stId = '${stId}';`)
}

function deleteErrorPdfTrayCode(stId){
    return querySql(`UPDATE storagetray SET actFlag = 0 WHERE stId = '${ stId }';`)
}

function getProducyItemsCountQuery() {
    return querySql(`SELECT COUNT(*) FROM productitems WHERE fstId = '4' AND  whId = '1' AND trayId = '1' AND productStatus = '1001';`)
}

module.exports = {
    loadingPdfCodes,
    checkPdfTrayCodeQuery,
    checkPdfTrayIdQuery,
    getProducyItemsCountQuery,
    queryBarCodeInTrayCode,
    updatePdfBarCodes,
    updatePdfTrayCodes,
    getStId,
    deleteErrorPdfBarCode,
    deleteErrorPdfTrayCode
}