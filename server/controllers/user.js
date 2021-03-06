const User = require("../models/user.js");
const md5 = require("md5");
const config = require("../configs");
const createToken = require("../utils/createToken.js");

//返回数据格式
//{ msg: '', success: boolean, data: {} }
//注意ctx.success在条件分支语句中需要加return,不然继续往下执行

class UserController {
  //用户登录(创建token)
  static async login(ctx) {
    let { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.error({
        msg: "参数错误",
        success: false
      });
      return;
    }
    try {
      password = md5(password);
      let result = await User.find({
        where: {
          user_name: username,
          user_pwd: password
        }
      });
      if (result) {
        let res = JSON.parse(JSON.stringify(result));
        res.token = createToken(res);
        ctx.success({
          msg: "查询成功",
          data: res,
          success: true
        });
      } else {
        ctx.error({
          msg: "账号密码错误",
          success: false
        });
      }
    } catch (error) {
      // console.log(error)
      ctx.error({
        msg: "服务器内部错误-查询用户失败",
        success: false
      });
      throw error;
    }
  }
  //用户注册
  static async reg(ctx) {
    let { username, password, phone } = ctx.request.body;
    if (!username || !password || !phone) {
      ctx.error({
        msg: "参数错误",
        success: false
      });
      return;
    }
    try {
      let _person = await User.find({ where: { user_phone: phone } });
      if (_person) {
        ctx.error({
          msg: "用户已存在",
          success: false
        });
        return;
      }
      password = md5(password);
      await User.create({
        user_name: username,
        user_pwd: password,
        user_phone: phone
      });
      ctx.success({
        msg: "新增用户成功",
        success: true
      });
    } catch (error) {
      ctx.error({
        msg: "服务器错误",
        success: false
      });
      throw error;
    }
  }
  //用户退出(由前台控制即可)
  static async logout(ctx) {
    ctx.success({
      msg: "退出成功!",
      success: true
    });
  }
  //用户退出(由前台控制即可)
  static async info(ctx) {
      let roles =[]
      if(ctx.jwt.user_type === 99){
        roles.push("admin")
      }else{
        roles.push("test")
      }
    //   roles = ["test"]
      ctx.success({
        data: {
            roles: roles,
            name: ctx.jwt.user_name,
            avatar:
              "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          },
          success: true
      })
 
  }
}

exports = module.exports = UserController;
