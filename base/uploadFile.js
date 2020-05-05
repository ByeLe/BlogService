// 引入相应的文件
const express = require('express')
const bodyParse = require('body-parser')
const fs = require('fs')
const multer = require("multer")
// 创建路由实例
const uploadFile = express.Router()
var fileRoot = ''
//检测路径是否存在  不存在则创建
function createFolder(path) {
  path = './uploads/' + path
  try {
    fs.accessSync(folder)
  } catch (e) { 
    fs.mkdirSync(folder)
  } 
}
// 设置存储位置以及文件名信息等
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, fileRoot);
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const uploadConfig = multer({ storage: storage })
//监听信息
uploadFile.post('/upload/flie', uploadConfig.array('file', 1), function (req, res) { 
  fileRoot = './uploads/' + req.body.fileType
  createFolder(req.body.fileType)
  console.log( req.files[0])
})
// 导出路由实例
module.exports = uploadFile