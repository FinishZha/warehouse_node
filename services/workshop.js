const { querySql } = require('../db/index')

//待入库
function waitintoWorkshop(createPerson,pdaCode,trayCode){
    return querySql(`insert into storagetray(pdaCode,trayCode,actFlag,createDate) value('${createPerson}',${pdaCode}','${trayCode}',0,sysdate());`)
}

//全部入库(得多条插入)
function intoWorkshop(pdaCode,trayCode){
    return querySql(`insert into storagetray(pdaCode,trayCode,actFlag,createDate) value('${pdaCode}','${trayCode}',1,sysdate());`)
}

//查询真正在库里的
function getAllRealinWrokshop(){
    return querySql(`select pdaCode, trayCode, createDate from storagetray where actFlag = 1;`)
}

//查询待入库的(已经删除的或未入库)
function getAllWaitintoWrokshop(){
    return querySql(`select pdaCode, trayCode, createDate from storagetray where actFlag = 0;`)
}

// function addServeryIntoworkshop(){
    
// }


module.exports = {
    waitintoWorkshop,
    intoWorkshop,
    getAllRealinWrokshop,
    getAllWaitintoWrokshop
}