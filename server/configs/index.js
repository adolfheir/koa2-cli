const fs = require('fs');

let config = {
   admin: {     
       username: 'cldev2018',           
       password: 'cldev2018',           //初始管理界面密码          
   },
   jwt: {
       secret: 'secret',            
       exprisesIn: '7200s'          //以秒为单位
   },
   mongodb: {
       host: '127.0.0.1',
       database: 'spird',
       port: 27017,
       user: '',                    //非必填
       password: ''                 //非必填
   },
   app: {
       port: process.env.PORT || 3000,
       routerBaseApi: '/api'
   }
};

//可以新建一个private.js定义自己的私有配置
if(fs.existsSync(__dirname + '/private.js')){
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;