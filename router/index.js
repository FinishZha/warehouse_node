//引入模块
const express = require('express')
const userRoter = require('./UserInfoRequest')
const companyRouter = require('./ErpAllRequest')
const workshopRouter = require('./PdfScanCodeRequest')
const inventoryRouter = require('./InventoryGetRequest')
const outRouter = require('./OutWhRequest')
// 注册路由
const router = express.Router()

router.get('/', (req, res) => {
   res.send('Hello world!')
})

router.use('/user', userRoter)
router.use('/company', companyRouter)
router.use('/pdfscancode', workshopRouter)
router.use('/inventory', inventoryRouter)
router.use('/out', outRouter)

module.exports = router