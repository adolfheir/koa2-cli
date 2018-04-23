//配置文件
const config = require('../configs');
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql', // 数据库
    port: config.mysql.port,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: false
})



sequelize
    .authenticate()
    .then(() => {
        console.log('mysql connect successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the sql:', err);
    });

module.exports = sequelize
