const config = require('../configs'),
      Router = require('koa-router'),
      router = new Router({
          prefix: config.app.routerBaseApi
      }),
      U = require('../controllers/user.js'),
      spild = require("../controllers/spild.js")
      checkToken = require('../middlewares/checkToken.js');


/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/
router
    .post('/login', U.login)                                        //用户登录
    //.post('/logout', checkToken, U.logout)                         用户登出（前台删除token即可）
    // .post('/modifyUser', checkToken, U.updateUserMes)            //更改用户信息
    // .post('/modifyPwd', checkToken, U.resetPwd)                  //更改用户密码

    .get('/getSpider', checkToken, spild.getSpild)                       //获取爬虫信息
    
exports = module.exports = router;


