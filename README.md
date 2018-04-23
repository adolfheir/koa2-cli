# koa-cli
一个基于koa的带token验证框架


## 目录设计
* app.js -------- 入口文件
* models -------- 数据库模型
* controllers --------- 完成逻辑处理的控制器
* middlewares --------- 自己封装的中间件
* routes --------- 路由
* utils --------- 工具函数
* configs -------- 配置文件
* package.json --------- 项目所需依赖
好的目录设计有利于后期的维护，有规有矩，自己看起来也清爽许多。路由部分必须和控制器分开，这样能做控制器只需关心实现该有的业务逻辑。

## start app
* node app

## 其他
* proxyServer 反向代理解决跨域问题（ctx.throw的请求不能被koa-cors）代理掉 开发下用这个反向代理下




