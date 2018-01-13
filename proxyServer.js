var PORT = 28080;

var http = require('http');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({
    // target: 'http://192.168.2.16:28080',   //接口地址
    // 下面的设置用于https
    // ssl: {
    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),
    //     cert: fs.readFileSync('server.crt', 'utf8')
    // },
    // secure: false
});
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log(err);
    res.end('Something went wrong. And we are reporting a custom error message.');
});

var server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    proxy.web(req, res, { target: 'http://127.0.0.1:3000/' });

});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");


