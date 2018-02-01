const config = require('../configs'),
      Router = require('koa-router'),
      router = new Router({
          prefix: config.app.routerBaseApi
      }),
      U = require('../controllers/user.js'),
      QES = require("../controllers/question.js")
      CODE = require('../controllers/code.js'),
      checkToken = require('../middlewares/checkToken.js');
      


/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/
router
    .post('/login', U.login)                                          //用户登陆
    .post("/reg",U.reg)                                               //注册用户
    //.post('/logout', checkToken, U.logout)                        
    .post("/addQes",QES.addQuestion)                                  //添加问题
   .post("/startWork",CODE.startWork)                                 //开始答题
   .post("/startWork",CODE.addCode)                                   //提交代码
  //  .post("/startWork",code.startWork)                                 //开始答题
  //  .post("/startWork",code.startWork)                                 //开始答题


exports = module.exports = router;


