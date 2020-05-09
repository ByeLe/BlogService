// 引入基本文件
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const uploadFile = require('./base/uploadFile.js')
const classification = require('./base/classification.js')
const articleInfo = require('./base/articleInfo.js')
// 创建express实例
const app = express()
// 中间件设置允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  // res.header('Content-Type', 'text/html; charset=utf-8')
  next()
})
// 解析 application/json
app.use(bodyParser.json())
app.use(express.static('uploads'));
app.use(express.static('static'));
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(classification) // 分类
app.use(uploadFile) // 上传
app.use(articleInfo) //文章信息
app.listen(7001)
console.log('Listening on port 7001')

