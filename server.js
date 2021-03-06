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
var fileUpload = require('express-fileupload');

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
app.use(fileUpload());


// Connect to the database
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
    var user = req.body.user;
    var email = user.email;
    var emailLoginLink = req.protocol + '://' + req.get('host') + "/login.html";
    bcrypt.genSalt(10, function(err, salt) {
        if (err) throw err;

        bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
            if (err) throw err;

            var query = "INSERT INTO user(user_firstname, user_mail, user_password, user_birthday, user_lastname, user_name, user_last_login, role_role_id, user_salt)" +
                "VALUES('" + user.first_name + "', '" + user.email + "', '" + hash + "', '" + user.birthday + "', '" + user.last_name + "', '" + user.user_name + "',now(),'" + 2 + "', '" + salt + "');";

            dbc.query_handler(query, db, function(queryResponse) {
                nodemailer.createTestAccount(function(err, account) {
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
                    let mailOptions = {
                        from: '"Corenedon"<EMAIL>',
                        to: email,
                        subject: 'Registratie Corendon',
                        html: '<img src="cid:logo@cid.nl"/><h1>U bent geregistreerd</h1><a href="' + emailLoginLink + '"><p> Log nu in om uw vakantie partner te ontmoeten. </p></a>',
                        attachments: [{
                            filename: 'app_logo_192.png',
                            path: 'public/images/app_logo_192.jpg',
                            cid: 'logo@cid.nl'
                        }]
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error)
                        }
                        console.log("Message send: %s", info.messageId);
                    });
                });

                res.send(queryResponse);
                res.end();

            })
        })
    });
});

/**
 * Handles login requests
 */
app.post('/login', function(req, res) {
    var sendObject = {};
    var saltQuery = "SELECT user_salt FROM user WHERE user_name = '" + req.body.username + "';"
    dbc.query_handler(saltQuery, db, function(salt) {
        var user_salt = salt.length > 0 ? salt[0].user_salt : undefined;
        if (user_salt == undefined || user_salt == '') {
            sendObject.validation = false;
            res.send(sendObject);
            res.end();
        } else {
            bcrypt.hash(req.body.password, user_salt, function() {}, function(err, hash) {
                if (err) throw err;
                // Select user from user input and see if it exists
                var query = "SELECT * FROM user WHERE user_name = '" + req.body.username + "' && user_password = '" + hash + "';";

                dbc.query_handler(query, db, function(queryResponse) {
                    // Object to be send back to the frontend
                    sendObject.validation = queryResponse.length > 0;

                    // If the user exists create a session with that user's info
                    if (queryResponse.length > 0) {
                        req.session.user = {
                            user_id: queryResponse[0].user_id,
                            rol: queryResponse[0].role_role_id,
                            user_name: req.body.username,
                        }

                        // Get firstlogin info from user 
                        sendObject.firstLogin = !queryResponse[0].user_first_login;
                        sendObject.user_id = queryResponse[0].user_id;
                    }
                    res.send(sendObject);
                    res.end();
                });
            });
        };
    });
});

/**
 *  Delete/End users session 
 */
app.get('/logout', function(req, res) {
    res.clearCookie('user');
    res.end();
});

/**
 * send session info to the frontend
 */
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

    if (req.originalUrl == "/") {
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



app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    sampleFile = req.files.sampleFile;

    uploadPath = __dirname + '/public/images/profile-images/profile-image-' + req.session.user.user_id + ".jpg";

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/profile.html?id=" + req.session.user.user_id);
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

/**
 * When a message is send through the websocket "send message" send it back to the other user through "update message"
 */
io.on("connection", function(socket) {
    socket.on("send message", function(msg) {
        io.sockets.emit("update messages", msg);
    });
});

// DEPRECATED FUNCTION DONT USE, FOR DEMO PURPOSES ONLY.
// Gets all users and hashes their password
// function passwordMigration() {
//     var query = "SELECT * FROM user;";
//     dbc.query_handler(query, db, function(users) {
//         users.forEach(function(user, key) {
//             console.log(user.user_password)
//             bcrypt.genSalt(10, function(err, salt) {
//                 if (err) throw err;

//                 bcrypt.hash(user.user_password, salt, function() {}, function(err, hash) {
//                     if (err) throw err;

//                     var updateQuery = "UPDATE user SET user_salt='" + salt + "', user_password='" + hash + "' WHERE user_id = " + user.user_id;
//                     console.log(updateQuery);
//                     dbc.query_handler(updateQuery, db, function(status) {
//                         console.log(status)
//                     })
//                 });
//             });
//         });

//     });
// };