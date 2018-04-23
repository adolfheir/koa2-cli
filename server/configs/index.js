const fs = require('fs');

let config = {
    admin: {
        username: 'adolfheir',
        password: 'adolfheir',           //初始管理界面密码          
    },
    jwt: {
        secret: 'adolfheir',
        exprisesIn: '86400s'          //以秒为单位//24小时
    },
    mysql: {
        port: 3306,
        host: "127.0.0.1",
        username: 'root',
        password: 'admin',
        database: 'test'
    },
    app: {
        port: process.env.PORT || 3001,
        routerBaseApi: '/api'
    }
};


module.exports = config;