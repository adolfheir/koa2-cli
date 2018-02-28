let path = require('path');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
let errorPath = "/error";
//错误日志文件名
let errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// let errorLogPath = path.resolve(__dirname, "../logs/error/error");


//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// let responseLogPath = path.resolve(__dirname, "../logs/response/response");


//控制台日志目录
let conslePath = "/console";
//控制台日志文件名
let consoleFileName = "console";
//控制台日志输出完整路径
let consoleLogPath = baseLogPath + conslePath + "/" + consoleFileName;

module.exports = {
    "baseLogPath": baseLogPath                  //logs根目录
}
module.exports = {
    appenders: {
        console: {
            type: 'dateFile',
            filename: consoleLogPath,
            pattern: 'yyyy-MM-dd ',
            compress: true,
            path: conslePath,
            alwaysIncludePattern: true,
        },
        resLogger: {
            type: 'dateFile',
            filename: responseLogPath,
            pattern: 'yyyy-MM-dd ',
            compress: true,
            path: responsePath,
            alwaysIncludePattern: true,
        },
        errorLogger: {
            type: 'dateFile',
            alwaysIncludePattern: true,
            filename: errorLogPath,
            pattern: 'yyyy-MM-dd',
            compress: true,
            path: errorPath
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        resLogger:{appenders: ['resLogger'], level: 'info'},
        errorLogger: { appenders: ['errorLogger'], level: 'error' }
    },
    'baseLogPath': baseLogPath
}


