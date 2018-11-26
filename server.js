var fs = require("fs");
var express = require("express");
var mysql = require('mysql');

var config = require("./appsettings.json")

var app = express();

app.get('/*', function (req, res) {

    var fullUrl = "public" + req.originalUrl;

    if(fullUrl === "public/"){
        fullUrl = "public/index.html";
    }

    fs.readFile(fullUrl ,function (err, data){
        if (err){
            res.write("404");
            res.end();
        }
        else {
            if(req.originalUrl.includes(".html"))
            {res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});}
            else if(req.originalUrl.includes(".css")){res.writeHead(200, {'Content-Type': 'text/css'});}
            else if(req.originalUrl.includes(".js")){res.writeHead(200, {'Content-Type': 'text/javascript'});}
            res.write(data);
            res.end();
        }
    });

});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Fys server runnng at http://%s:%s", host, port)
});

var con = mysql.createConnection(config.databaseRemote);
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM user", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result, null, 4));
    });
  });