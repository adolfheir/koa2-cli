const config = require('../configs');
const User = require('../models/user');
const md5 = require('md5');

//初始化管理员账号中间件(当然这些中间件只有用户访问改网址才会执行)
module.exports = async (ctx, next) => {
    const username = config.admin.username;
    const password = md5(config.admin.password);
    const email ="cldev@qq.com"
    let result = await User
        .find()
        .exec()
        .catch(err => {
            ctx.throw(500, '服务器内部错误-查找admin错误！');
        });
    if(result.length === 0){
        let user = new User({
            username,
            password,
            email,
            createTime: new Date()
        });
        await user
            .save()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-存储admin错误！');
            });
        console.log('初始化admin账号密码完成!');
    }
    await next();
}; 