var fs = require("fs");
var express = require("express");
var mysql = require("mysql");
var http = require("http");
var app = express();

app.get('/*', function (req, res) {
    // res.send('Hello World');

    var fullUrl = "fase_2_mockup" + req.originalUrl + ".html";
    console.log(fullUrl);

    fs.readFile(fullUrl ,function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });

});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});