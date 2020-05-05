// 引入相应的文件
const express = require('express')
const bodyParse = require('body-parser')
const fs = require('fs')
const multer = require("multer")
const db = require('./sqlHandle.js')
const sendMessage = require('./sendMessage.js')
// 创建路由实例
const uploadFile = express.Router()
var fileRoot = ''
// 设置存储位置以及文件名信息等
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var info = JSON.parse(JSON.stringify(req.body))
    console.log(info)
    if (!info.flietype) { 
      sendMessage.send(res, 400, 'show', '请选择上传的类型')
      return
    }
    if (!info.fileTitle) { 
      sendMessage.send(res, 400, 'show', '请填写标题')
      return 
    }
    if (!info.fileDesc) { 
      sendMessage.send(res, 400, 'show', '请填写简介')
      return 
    }
    fileRoot = './uploads/' + info.flietype
    cb(null, fileRoot);
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const uploadConfig = multer({ storage: storage })
//监听信息
uploadFile.get('/upload/changeType', function (req, res) {
  const data = {
    status: 200,
    type: 'notAlert'
  }
  fileType = req.query.fileType
  createFolder(fileType)
  res.end(JSON.stringify(data))
})
uploadFile.post('/upload/flie', uploadConfig.array('file', 1), async (req, res) => {
  console.log(req.body)
  const info = JSON.parse(JSON.stringify(req.body))
  console.log(req.files[0])
  if (req.files[0]) { 
    const insert = 'INSERT INTO articleInfo (path, title, type, fileDesc)VALUES(?, ?, ?, ?)'
    const path = req.files[0].destination +'/'+ req.files[0].filename
    const param = [path, info.fileTitle, info.flietype,info.fileDesc]
    const data = await db.sqlHandle(insert, param)
    sendMessage.send(res, 200, 'showAlert', '上传成功')
  } else {
    sendMessage.send(res, 400, 'showAlert', '上传失败,请重试')
  }
})
// 导出路由实例
module.exports = uploadFile