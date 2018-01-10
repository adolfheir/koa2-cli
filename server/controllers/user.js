const User = require('../models/user.js');
const md5 = require('md5');
const config = require('../configs');
const createToken = require('../utils/createToken.js');

//返回数据格式
//{ msg: '', success: boolean, data: {} }
//注意ctx.success在条件分支语句中需要加return,不然继续往下执行

class UserController{
    //用户登录(创建token)
    static async login(ctx){
        const { username, password } = ctx.request.body;
        if(!username){
            ctx.throw(400, '用户名不能为空!');
        }
        if(!password){
            ctx.throw(400, '用户名不能为空!');
        }
        let result = await User
            .findOne({
                username
            })
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-findUser错误！');
            });
        if(result){
            if(result.password === md5(password)){
                let token = createToken(result._id);
                return ctx.success({
                    msg: '登录成功!',
                    data: {
                        uid: result._id,
                        username: result.username,
                        createTime: result.createTime,
                        token
                    },
                    success: true
                });
            }else{
                return ctx.success({
                    msg: '密码错误!',
                    success: false
                })
            }
        }else{
            return ctx.success({
                msg: '用户名不存在!',
                success: false
            })
        }
    }
    //用户退出(由前台控制即可)
    static async logout(ctx){
        ctx.success({
                msg: '退出成功!',
                success: true
        });
    }
    //更新用户资料(到时再看看需要记录什么资料信息)
    static async updateUserMes(ctx){
        ctx.success({
            msg: '通过!'
        });
    }
    //重置密码
    static async resetPwd(ctx){
        const uid = ctx.request.body.id;
        const password = md5(ctx.request.body.password);
        await User
            .findByIdAndUpdate(uid, {
                password
            })
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-modifyPwd错误！');
            });
        ctx.success({
            msg: '更改管理员密码成功!',
            success: true
        });
    }
}

exports = module.exports = UserController;