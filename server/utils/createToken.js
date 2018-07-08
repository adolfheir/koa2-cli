const config = require('../configs');
const jwt = require('jsonwebtoken');
//返回一个token
module.exports = (userInfo) => {
    let privateKey = config.jwt.secret;
    let expiresIn = config.jwt.exprisesIn;
    const token = jwt.sign({
        userInfo: userInfo
        }, privateKey, {
            expiresIn
        });
    return token;
};