const log4js = require("log4js");
const fs = require("fs");
const log_config = require("../configs/log_config");
const config = require("../configs/index.js");

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
let confirmPath = function(pathStr) {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr);
    console.log("createPath: " + pathStr);
  }
};

/**
 * 初始化log相关目录
 */
let initLogPath = function() {
  //创建log的根目录'logs'
  if (log_config.baseLogPath) {
    confirmPath(log_config.baseLogPath);
    //根据不同的logType创建不同的文件目录
    for (const key in log_config.appenders) {
      if (log_config.appenders[key].path) {
        confirmPath(log_config.baseLogPath + log_config.appenders[key].path);
      }
    }
  }
};
initLogPath();

//加载配置文件
log4js.configure(log_config);

let logUtil = {};

//绑定控制台输出
let consolelogger = log4js.getLogger("default");
if (config.console === true) {
  console.log = consolelogger.info.bind(consolelogger);
}

let errorLogger = log4js.getLogger("errorLogger");
let resLogger = log4js.getLogger("resLogger");

//封装错误日志
logUtil.logError = function(ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

//封装响应日志
logUtil.logResponse = function(ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

//格式化响应日志
let formatRes = function(ctx, resTime) {
  let logText = new String();

  //响应日志开始
  logText += "\n" + "*************** response log start ***************" + "\n";

  //添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  //响应状态码
  logText += "response status: " + ctx.status + "\n";

  //响应内容
  logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

  //响应日志结束
  logText += "*************** response log end ***************" + "\n";

  return logText;
};

//格式化错误日志
let formatError = function(ctx, err, resTime) {
  let logText = new String();

  //错误信息开始
  logText += "\n" + "*************** error log start ***************" + "\n";

  //添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  //错误名称
  logText += "err name: " + err.name + "\n";
  //错误信息
  logText += "err message: " + err.message + "\n";
  //错误详情
  logText += "err stack: " + err.stack + "\n";

  //错误信息结束
  logText += "*************** error log end ***************" + "\n";

  return logText;
};

//格式化请求日志
let formatReqLog = function(req, resTime) {
  let logText = new String();

  let method = req.method;
  //访问方法
  logText += "request method: " + method + "\n";

  //请求原始地址
  logText += "request originalUrl:  " + req.originalUrl + "\n";

  //客户端ip
  logText += "request client ip:  " + req.ip + "\n";

  //开始时间
  let startTime;
  //请求参数
  if (method === "GET") {
    logText += "request query:  " + JSON.stringify(req.query) + "\n";
    // startTime = req.query.requestStartTime;
  } else {
    logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    // startTime = req.body.requestStartTime;
  }
  //服务器响应时间
  logText += "response time: " + resTime + "\n";

  return logText;
};

module.exports = logUtil;
