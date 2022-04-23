const { querySql } = require('../db/index')

function login(usercod, pwd){
    return querySql(`SELECT usercode, pwd FROM userinfo WHERE usercode='${usercod}' AND pwd='${pwd}';`)
}

module.exports = {
    login
}