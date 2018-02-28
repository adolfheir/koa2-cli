//koa
const Koa = require('koa');
const static = require('koa-static')
const compress = require('koa-compress')
const path = require("path")
const app = new Koa();

//配置文件
const config = require('./server/configs');

//response中间件
const response = require('./server/middlewares/response.js');

//log4j中间件
const log4j = require("./server/middlewares/log4j.js")

//initAdmin中间件
const initAdmin = require('./server/middlewares/initAdmin.js');

//引入路由
const router = require('./server/routes');

//mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUrl = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
mongoose.connect(mongoUrl, { config: { autoIndex: false } });
const db = mongoose.connection;
db.on('error', () => {
    console.log('数据库连接出错!');
});
db.once('open', () => {
    console.log('数据库连接成功！');
});

//使用log4j
app.use(log4j)

//使用gzip 中间件
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))


//bodyParser中间件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//使用response中间件(放在最前面)
app.use(response);


//使用initAdmin中间件 //初始化后台管理用户
// app.use(initAdmin);

// 静态资源目录对于相对入口文件server.js的路径
app.use(static(path.join(__dirname, './view')))

//使用路由中间件
app
    .use(router.routes())
    .use(router.allowedMethods());

//监听端口
app.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});