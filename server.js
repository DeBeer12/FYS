// App dependencies
var fs = require("fs");
var express = require("express");
var mysql = require('mysql');

// Config files
var config = require("./appsettings.json")

// intitalize the app
var app = express();
var db = mysql.createConnection(config.databaseRemote);

// Request handler
app.get('/*', function (req, res) {
    var fullUrl = "public" + req.originalUrl;

    if (fullUrl === "public/") {
        fullUrl = "public/index.html";
    }

    fs.readFile(fullUrl, function (err, data) {
        if (err) {
            res.write("404");
            res.end();
        } else {
            if (req.originalUrl.includes(".html")) {res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});}
            else if (req.originalUrl.includes(".css")) {res.writeHead(200, {'Content-Type': 'text/css'});}
            else if (req.originalUrl.includes(".js")) {res.writeHead(200, {'Content-Type': 'text/javascript'});}
            res.write(data);
            res.end();
        }
    });

});

// Start the server 
var server = app.listen(8081, function (err) {
    if(err) throw err;
    var host = server.address().address;
    var port = server.address().port;
    console.log("Fys server running at http://%s:%s", host, port)
    
    db.connect(function (err, r) {
        if (err) throw err;
        console.log("Connected to %s as %s", config.databaseRemote.database, config.databaseRemote.user);
    });
});