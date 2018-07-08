const config = require('../configs'),
    Router = require('koa-router'),
    router = new Router({
        prefix: config.app.routerBaseApi
    }),
    U = require('../controllers/user.js'),
    checkToken = require('../middlewares/checkToken.js');



/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/
router
    .post('/user/login', U.login)                                          //用户登陆
    .post("/user/reg", U.reg)                                               //注册用户
    .get("/user/info",checkToken,U.info)

exports = module.exports = router;


