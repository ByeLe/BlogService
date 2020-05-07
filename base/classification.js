// 引入响应文件
const express = require('express')
const bodyParse = require('body-parser')
const db = require('./sqlHandle.js')
const fs = require('fs')
const sendMessage = require('./sendMessage.js')
// 创建路由实例
const handle = express.Router()
// 创建类型文件存储位置
function createFolder(path) {
  path = './uploads/' + path
  try {
    fs.accessSync(path)
  } catch (e) { 
    fs.mkdirSync(path)
  } 
}
handle.get('/classification/select', async (req, res) => { 
  const select = 'SELECT * FROM classification'
  const param = []
  const data = await db.sqlHandle(select, param)
  sendMessage.sendWithData(res, 200, 'show', '数据获取成功', data)
})
handle.get('/classification/insert', async (req, res) => {
  if (!req.query.lists) { 
    sendMessage.send(res, 400, 'show', '数据格式有误，请重新输入')
    return 
  }
  const lists = JSON.parse(req.query.lists) 
  var awaitQueue = [];
  for (var i = 0; i < lists.length; i++) { 
    let insert = 'INSERT INTO classification (type) VALUES(?)'
    createFolder(String(lists[i].type))
    let param = [String(lists[i].type)]
    try {
      let fun = await db.sqlHandle(insert, param)
      awaitQueue.push(fun)
    } catch (e) {
      sendMessage.send(res, 400, 'show', e)
     }  
  }
  const data = await Promise.all(awaitQueue)
  sendMessage.send(res, 200, 'show', '添加成功')
})
handle.get('/classification/delete', async (req, res) => {
  if (!req.query.deleteType) { 
    sendMessage.send(res, 400, 'show', '请选择要删除的类型')
    return
  }
  const select = "SELECT * FROM classification WHERE type = ?"
  let param = [req.query.deleteType]
  const resList = await db.sqlHandle(select, param)
  if (!resList.length) { 
    sendMessage.send(res, 400, 'show', '要删除的文件不存在')
  }
  try {
    const deleteSql = 'DELETE FROM classification WHERE type = ?'
    const data  = await db.sqlHandle(deleteSql, param)
    sendMessage.send(res, 200, 'show', '删除成功')
  } catch (e) { 
    sendMessage.send(res, 400, 'show', e)
  }
})

module.exports = handle