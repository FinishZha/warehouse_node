//引入模块
const express = require('express')
const userRoter = require('./UserInfoRequest')
const companyRouter = require('./ErpAllRequest')
const workshopRouter = require('./PdfScanCodeRequest')
const inventory = require('./InventoryGetRequest')
// 注册路由
const router = express.Router()

router.get('/', (req, res) => {
   res.send('Hello world!')
})

router.use('/user', userRoter)
router.use('/company', companyRouter)
router.use('/pdfscancode', workshopRouter)
router.use('/inventory', inventory)

module.exports = router