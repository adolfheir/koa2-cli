const config = require('../configs');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
    const authorization = ctx.get('authorization');
    if(authorization){
        let token = authorization;
        try{
            let decoded = jwt.verify(token, config.jwt.secret);
            // console.log(decoded);返回如下
            // { id: '5934afe7adb12d30f0679b41',
            // iat: 1496629988,
            // exp: 1496633588 } 解析后的exp=创建token的时间+之前设置的过期时间
            // let deadline = new Date()/1000;
            // if(decoded.exp <= deadline){
            //     console.log('expired token');
            //     ctx.throw(401, 'expired token');
            // }else{
            //     console.log('鉴权成功!');
            //      await next();
            // }
        }catch(err){
            ctx.throw(401, 'expired token');      //token验证失败
        }
    }else{
        ctx.throw(401, 'no token detected in http header Authorization');         //缺少token
    }
    await next();
};