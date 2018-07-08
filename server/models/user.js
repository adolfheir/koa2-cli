const sequelize = require('./db')
const Sequelize = require('sequelize')
const md5 = require('md5');
const config = require("../configs/index.js")

const User = sequelize.define('user', {
    user_name: {
        type: Sequelize.STRING
    },
    user_pwd: {
        type: Sequelize.STRING
    },
    user_phone:{
        type: Sequelize.STRING
    },
    user_type:{
        type: Sequelize.INTEGER
    }
});
if(config.mysql.reInit){
    User.sync({ force: true }).then(function () {
        let pwd = md5(config.admin.password)
        User.create({
            user_name: config.admin.username,
            user_pwd: pwd,
            user_phone: "1234567890",
            user_type: 99,
        })
    
    });
}


module.exports = User;