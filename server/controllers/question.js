const qesSchema = require('../models/question.js');
const config = require('../configs');

//返回数据格式
//{ msg: '', success: boolean, data: {} }
//注意ctx.success在条件分支语句中需要加return,不然继续往下执行

class QesController {
  //添加问题
  static async addQuestion(ctx) {
    const { title, content, start_time, valid_time, end_time } = ctx.request.body;
    if (title && content && start_time && valid_time && end_time) {
      let result = await qesSchema
        .find({ title: title })
        .exec()
        .catch(err => {
          ctx.throw(500, '服务器内部错误-查询文章失败')
        })
      if (result.length === 0) {
        let que = new qesSchema({
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
          msg: "发布题目成功！",
          success: true
        })
      }else{
        return ctx.success({
          'msg': '题目已经存在',
          success: false
        })
      }
    } else {
      return ctx.success({
        'msg': '参数错误',
        success: false
      })
    }
  }

}

exports = module.exports = QesController;