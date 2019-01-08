//System variables
var SYSTEM_VARIABLES = require("./SYSTEM_VARIABLES.js")

// App dependencies
var fs = require("fs");
var express = require("express");
var mysql = require("mysql");
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var nodemailer = require('nodemailer');

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
app.post('/register', function(req, res) {
    //variable for email adress
    var email = req.body.email;

    dbc.query_handler(req.body.query, db, function(queryResponse) {
     nodemailer.createTestAccount((err, account)=> {
          //details of sending email adress and port
          let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false, // upgrade later with STARTTLS
              auth: {
                  user: 'corendon.is106.2@gmail.com',
                  pass: 'Codacity106'
              }
          });
          //body of the email
          let mailOptions = {from: '"Corenedon"<EMAIL>',
          to: email,
          subject: 'Registratie Corendon',
          html: '<img src="cid:logo@cid.nl"/><h1>U bent geregistreerd<h1><a href="http://localhost:8080/login.html"><p>Log nu in om uw vakantie partner te ontmoeten.</p></a>',
                         attachments:[{filename: 'app_logo_192.png',
                                   path: 'public/images/app_logo_192.jpg',
                                   cid: 'logo@cid.nl'
                                   }]
          };
          transporter.sendMail(mailOptions, (error, info) => {
          if(error){return console.log(error)
          }
          console.log("Message send: %s", info.messageId);
          });
     });
          res.send(queryResponse);
          res.end();
    })
});



app.post('/login', function(req, res) {
    // bcrypt.genSalt(10, function(err, salt) {
    //     if (err) throw err;
    //     console.log(salt)
    // });

    var query = "SELECT * FROM user WHERE user_name = '" + req.body.username + "' && user_password = '" + req.body.password + "';";
    dbc.query_handler(query, db, function(queryResponse) {
        var sendObject = {
            validation: queryResponse.length > 0
        };
        if (queryResponse.length > 0) {
            req.session.user = {
                user_id: queryResponse[0].user_id,
                user_name: req.body.username,
            }
            sendObject["firstLogin"] = !queryResponse[0].user_first_login;
            sendObject["user_id"] = queryResponse[0].user_id;
        }
        res.send(sendObject);
        res.end();
    })
});

app.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.end();
});

app.get('/getCurrentUserInfo', function(req, res) {
    if (req.session.user) {
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