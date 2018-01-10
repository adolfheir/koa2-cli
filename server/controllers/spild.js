var request = require('request');

class SpildController {
  static async getSpild(ctx) {
    let res = await new Promise((resolve, reject) => {
      request("http://192.168.2.103:8081/getAll", function (err, res, body) {
        if (err) {
          resolve(null)
        } else {
          resolve(body)
        }
      })
    })
    if (res !== null) {
      return ctx.success({
        msg: '数据获取成功',
        data: res,
        success: true
      });
    } else {
      return ctx.success({
        msg: '数据获取失败!',
        success: false
      })
    }

  }
}
exports = module.exports = SpildController;