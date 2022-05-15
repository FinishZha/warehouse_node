const { reWorkBackTargetProductQuery,reWorkOutTargetProductQuery } = require('../services/OutWhMapper')

//返工回库的操作
async function reWorkBackService(barCode, createPerson){
    let flag = 'success'
    let changeCount = await reWorkBackTargetProductQuery(barCode, createPerson)
    console.log(changeCount);
    if(changeCount.affectedRows < 1 ){
        return flag = 'failed'
    }
    console.log(flag);
    return flag
}


//返工出库
async function reWorkOutService(barCode, outWarehousePerson){
    let flag = 'success'
    let changeCount = await reWorkOutTargetProductQuery(barCode, outWarehousePerson)
    console.log(changeCount);
    if(changeCount.affectedRows < 1 ){
        return flag = 'failed'
    }
    console.log(flag);
    return flag 
}

module.exports = {
    reWorkBackService,
    reWorkOutService
}