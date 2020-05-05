# BlogService
个人项目的后台

> 克隆与使用

`1.clone整个项目`

`2.执行 npm  install 进行依赖安装`

`3.在base同级目录创建uploads文件夹`
`4.执行 node Service.js 启动整个项目`


> 根据类型查询文章
```javascript
'/getArticleByType':{
   size // 查询的每页数量，非必传 默认10
   page // 查询页数  必传
   selectType // 要选择的文章类型 必传
}
```
> 根据ID删除文章
```javascript
'/deleteActicleById': {
  id // 必传  文章的id
}
 ```

> 添加文章分类类型
```javascript
'/classification/insert': {
  lists: [ //数组
    {
      type // 要加入的刘鑫
    }
  ]
}
```
> 删除文章分类
```javascript
'/classification/delete': {
  deleteType // 要删除的类型
}
```
> 返回得数据格式
```javascript
{
  data = {
      status, // 状态码
      showAlert, // 是否弹窗显示提示
      message  // 提示信息
      data //返回的数据
    }
}
```


