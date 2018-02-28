const fs = require('fs');

let config = {
   admin: {     
       username: 'cldev2018',           
       password: 'cldev2018',           //初始管理界面密码          
   },
   jwt: {
       secret: 'secret',            
       exprisesIn: '86400s'          //以秒为单位//24小时
   },
   mongodb: {
       host: '127.0.0.1',
       database: 'competition',
       port: 27017,
       user: '',                    //非必填
       password: ''                 //非必填
   },
   app: {
       port: process.env.PORT || 3002,
       routerBaseApi: '/api'
   }
};


module.exports = config;