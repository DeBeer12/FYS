// App dependencies
var fs = require("fs");
var express = require("express");
var mysql = require("mysql");
var bcrypt = require('bcrypt');
var session = require('express-session');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Controllers
var dbc = require("./controllers/database_controller")

// Config files
var config = require("./appsettings.json")

// intitalize the app
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(session({
    key: 'user',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 900000
    }
}));

var db = mysql.createConnection(config.databaseRemote);

// Request handlers
app.get('/db', function(req, res) {
    let userIdPlaceholder = "@user_id";
    var query = req.query.query;

    if (query.match(userIdPlaceholder)) {
        query = query.replace(userIdPlaceholder, req.session.user["user_id"]);
    }

    dbc.query_handler(query, db, function(queryResponse) {
        res.send(queryResponse);
    })
});

app.post('/login', function(req, res) {
    var query = "SELECT * FROM user WHERE user_name = '" + req.body.username + "' && user_password = '" + req.body.password + "';";
    var firstLogin;

    dbc.query_handler(query, db, function(queryResponse) {
        if (queryResponse.length > 0) {
            req.session.user = {
                user_id: queryResponse[0].user_id,
                username: req.body.username,
            }
            firstLogin = !!+queryResponse[0].user_first_login;
        }

        res.send({
            validation: queryResponse.length > 0,
            firstLogin: firstLogin,
        });
        res.end();

    })
});

app.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.end();
});

app.get('/getCurrentUserInfo', function(req, res) {
    if(req.session.user) {
        res.send(req.session.user)
        res.end();
    }
});

app.get('/*', function(req, res) {
    var fullUrl = "public" + req.originalUrl;

    if (!req.session.user && req.originalUrl != "/login.html" && req.originalUrl != "/registration.html" && req.originalUrl.includes(".html")) {
        fullUrl = "public/redirect.html";
    }

    fullUrl = fullUrl.split("?")[0];
    fs.readFile(fullUrl, function(err, data) {
        if (err) {
            res.write("404");
            res.end();
        } else {
            if (req.originalUrl.includes(".html")) {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Content-Length': data.length
                });
            } else if (req.originalUrl.includes(".css")) {
                res.writeHead(200, {
                    'Content-Type': 'text/css'
                });
            } else if (req.originalUrl.includes(".js")) {
                res.writeHead(200, {
                    'Content-Type': 'text/javascript'
                });
            }
            res.write(data);
            res.end();
        }
    });
});

// Start the server 
server.listen(config.server.port, function(err) {
    if (err) throw err;
    var host = server.address().address;
    var port = server.address().port;
    console.log("Fys server running at http://%s:%s", host, port)
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected to %s as %s", config.databaseRemote.database, config.databaseRemote.user);
    });
});

io.on("connection", function(socket) {
    socket.on("send message", function(msg) {
        io.sockets.emit("update messages", msg);
    });
});