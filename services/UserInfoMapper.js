const { querySql } = require('../db/index')

function login(usercode, pwd){
    return querySql(`SELECT usercode, pwd FROM userinfo WHERE usercode='${usercode}' AND pwd='${pwd}';`)
}

module.exports = {
    login
}