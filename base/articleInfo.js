// 引入相应文件
const express = require('express')
const bodyParse = require('body-parser')
const db = require('./sqlHandle.js')
const sendMessage = require('./sendMessage.js')
// 创建路由
const articleInfo = express.Router()
articleInfo.get('/getArticleByType', async (req, res) => { 
  if (!req.query.selectType || !req.query.page) { 
    sendMessage.send(res, 400, 'show', '暂时没有此分类文章')
    return
  }
  const size = req.query.size || 10
  const page = req.query.page || 0
  const selectSql = 'SELECT * FROM articleInfo WHERE type = ? LIMIT  ?, ?'
  const param = [req.query.selectType, page * size, size]
  try {
    let data = await db.sqlHandle(selectSql, param)
    sendMessage.sendWithData(res, 200, 'notAlert', '', data)
  } catch (e) { 

  } 
})
articleInfo.get('/deleteActicleById', async (req, res) => {
  if (!req.query.id) { 
    sendMessage.send(res, 400, 'showAlert', '参数错误，请重试')
    return
  }
  let selectSql = 'SELECT * FROM articleInfo WHERE id= ?'
  let param = [Number(req.query.id)]
  let result = await db.sqlHandle(selectSql, param)
  if (!result.length) { 
    sendMessage.send(res, 404, 'showAlert', '该资源不存在或已删除')
    return 
  }
  let deleteSql = 'DELETE from articleInfo WHERE id = ?'

  await db.sqlHandle(deleteSql, param)
  sendMessage.send(res, 200, 'showAlert', '删除成功')
}) 
//导出路由
module.exports = articleInfo