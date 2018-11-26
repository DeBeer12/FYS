// App dependencies
var fs = require("fs");
var express = require("express");
var mysql = require("mysql");

// Controllers
var dbc = require("./controllers/database_controller")

// Config files
var config = require("./appsettings.json")

// intitalize the app
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var db = mysql.createConnection(config.databaseRemote);

// Request handlers
app.post('/db', function (req, res) { 
    var queryResponse = dbc.query_handler(req.body.query, db);
    console.log({queryResponse: queryResponse})
    return queryResponse;
});

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
var server = app.listen(config.server.port, function (err) {
    if(err) throw err;
    var host = server.address().address;
    var port = server.address().port;
    console.log("Fys server runnig at http://%s:%s", host, port)
});

var con = mysql.createConnection(config.databaseRemote);
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM user", function (err, result) {
        if (err) throw err;
        console.log("Connected to %s as %s", config.databaseRemote.database, config.databaseRemote.user);
    });
});