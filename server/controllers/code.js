const codeSchema = require('../models/code.js');
const qesSchema = require('../models/question.js');
const config = require('../configs');

//返回数据格式
//{ msg: '', success: boolean, data: {} }
//注意ctx.success在条件分支语句中需要加return,不然继续往下执行

class CodeController {
  //提交代码
  static async addCode(ctx) {
    const { que_id, code, type } = ctx.request.body;
    if (!title && !content && !start_time && !valid_time && !end_time) {
      let result = await codeSchema
        .findOne({ title: title })
        .exec()
        .catch(err => {
          ctx.throw(500, '服务器内部错误-查询代码失败')
        })
      if (result.lenght === 0) {
        let que = new codeSchema({
          title,
          content,
          start_time,
          valid_time,
          end_time
        });
        await que
          .save()
          .catch(err => {
            ctx.throw(500, "服务器内部错误-创建文章失败")
          })
        ctx.success({
          msg: "提交代码成功！",
          success: true
        })
      }
    } else {
      return ctx.success({
        'msg': '提交失败',
        success: false
      })
    }
  }

  //开始答题 那试卷 写开始时间
  static async startWork(ctx) {
    const { user, que_id } = ctx.request.body;
    if (user && que_id) {
      let result = await qesSchema
        .find({
          _id: que_id,
        })
        .exec()
        .catch(err => {
          ctx.throw(500, "服务器内部错误")
        })
      if (result.length !== 0) {
        if (result[0].end_time.getTime() < new Date().getTime()) {
          let code = new codeSchema({
            que_id: que_id,
            user: user,
            start_time: new Date().getTime()
          })
          await code
            .save()
            .catch(err => {
              ctx.throw(500, "服务器内部错误")
            })
          ctx.success({
            msg: "开始答题",
            date: {
              title: result[0].title,
              valid_time: result[0].valid_time,
              content: result[0].content
            },
            success: true
          })
        } else {
          return ctx.success({
            msg: "答题截止时间结束",
            success: false
          })
        }
      } else {
        return ctx.success({
          msg: "文章不存在",
          success: false
        })
      }
    } else {
      return ctx.success({
        msg: "参数错误",
        success: false
      })
    }
  }

}

exports = module.exports = CodeController;