//引入模块
const express = require('express')
const userRoter = require('./user')
const companyRouter = require('./company')
const workshopRouter = require('./workshop')
// 注册路由
const router = express.Router()

router.get('/', (req, res) => {
   res.send('Hello world!')
})

router.use('/user', userRoter)
router.use('/company', companyRouter)


router.use('/workshop', workshopRouter)

module.exports = router