// 引入基本文件
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const uploadFile = require('./base/uploadFile.js')
// 创建express实例
const app = express()
// 中间件设置允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(uploadFile)
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(8888)
console.log('Listening on port 8888')

