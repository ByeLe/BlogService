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
  var size = req.query.size || 10
  size = Number(size)
  const page = req.query.page || 0
  const selectSql = 'SELECT * FROM articleInfo WHERE type = ? LIMIT  ?, ?'
  const param = [req.query.selectType, page * size, (page + 1) * size]
  const selectAll = 'SELECT * FROM articleInfo WHERE type = ?'
  const allParam = [req.query.selectType]
  var all = await db.sqlHandle(selectAll, allParam)
  try {
    let data = await db.sqlHandle(selectSql, param)
    const send = {
      len: all.length,
      detail: data
    }
    sendMessage.sendWithData(res, 200, 'notAlert', '', send)
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