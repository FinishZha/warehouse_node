const { querySql } = require('../db/index')

//获取公司名
function getfstName(){
   return querySql(`SELECT fstId, fstName FROM erporgan;`)
}

//获取账套名
function getFuncName(){
   return querySql(`SELECT FuncId, FuncName FROM erpfunc;`)
}

module.exports = {
    getfstName,
    getFuncName
}