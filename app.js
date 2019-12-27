//koa
const Koa = require("koa");
const static = require("koa-static");
const path = require("path");
const app = new Koa();


// 静态资源目录对于相对入口文件server.js的路径
app.use(static(path.join(__dirname, "./view")));


//监听端口
app.listen(3002, () => {
  console.log("The server is running at http://localhost:" + 3002);
});
