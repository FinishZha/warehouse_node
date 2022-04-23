const mysql = require('mysql')
const config = require('./config')
const { OPEN_DEBUG } = require('../globalconfig')

// 数据库连接函数
function connect(){
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        //关闭数据并行
        multipleStatements: true
    })
}

function querySql(sql) {
    const conn =  connect()
    OPEN_DEBUG && console.log(sql)
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
            if(err){
                OPEN_DEBUG && console.log('查询失败，原因：' , JSON.stringify(results))
                reject(err)
            }else{
                OPEN_DEBUG && console.log('查询成功' , JSON.stringify(results))
                // 结果需要转换
                resolve(JSON.parse(JSON.stringify(results)))
            }
            })
        }catch(e){
            reject(e)
        }finally{
            conn.end()
        }
    })
}

module.exports = {
    querySql
}