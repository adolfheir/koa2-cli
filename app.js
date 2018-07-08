//koa
const Koa = require("koa");
const static = require("koa-static");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const path = require("path");
const app = new Koa();

//配置文件
const config = require("./server/configs");

//response中间件
const response = require("./server/middlewares/response.js");

//log4j中间件
const log4j = require("./server/middlewares/log4j.js");

//引入路由
const router = require("./server/routes");

// 跨域
app.use(
  cors({
    origin: function(ctx) {
      return "*";
      // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "authorization", "Accept"]
  })
);

//使用response中间件(放在最前面)
app.use(response);

//使用log4j
app.use(log4j);

//使用gzip 中间件
app.use(
  compress({
    threshold: 2048,
    flush: require("zlib").Z_SYNC_FLUSH
  })
);

//bodyParser中间件
app.use(bodyParser());

// 静态资源目录对于相对入口文件server.js的路径
app.use(static(path.join(__dirname, "./view")));

//使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// https示例
// var key = fs.readFileSync('cl-ssl/csr/api.chuanglintech.cn.key');
// var cert = fs.readFileSync('cl-ssl/cer/ServerCertificate.cer');
// var ca = fs.readFileSync('cl-ssl/cer/CACertificate-1.cer');

// const options = {
//     key: key,
//     cert: cert,
//     ca: ca
// };
// https.createServer(options, app.callback()).listen(3001);
// console.log("3001")

//监听端口
app.listen(config.app.port, () => {
  console.log("The server is running at http://localhost:" + config.app.port);
});
