const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const router = require('./router/index')

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended:true }))
app.use(bodyparser.json())

app.use('/', router)

const server = app.listen(5001, ()=>{
    const { port } = server.address()
    console.log('http server is running on http://localhost:%s', port)
})