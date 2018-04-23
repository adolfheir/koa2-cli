const sequelize = require('./db')
const Sequelize = require('sequelize')
const md5 = require('md5');

const User = sequelize.define('user', {
    user_name: {
        type: Sequelize.STRING
    },
    user_pwd: {
        type: Sequelize.STRING
    },
    user_phone:{
        type: Sequelize.STRING
    }
});
User.sync({ force: true }).then(function () {
    // 已创建数据表
    console.log("已经创建user表")
    // let pwd = md5("superAdmin")
    // User.create({
    //     user_name: "superAdmin",
    //     user_pwd: pwd,
    //     user_phone: "1234567890",
    //     user_type: 9999,
    //     user_time: "0"
    // })

});

module.exports = User;