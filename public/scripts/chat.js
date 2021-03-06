// Variables
var socket = io.connect('http://localhost:8080');
var match = {};
var matchHistory = [];

// On page load
$(document).ready(function() {
    // Get username of match
    getUsername(function(username) {
        match = username;
        $("h2.title p.matchname")[0].innerHTML = cms.find(f => f.content_name == "chat_title").content_text + " " + match.user_firstname + " " + match.user_lastname;

        getMessageHistory(function(matchHistoryData) {
            matchHistory = matchHistoryData;
            matchHistory.forEach(function(message) {
                if (message.message_from == $user.user_id) {
                    printChatMessage(message.message_content, "user");
                } else if (message.message_from == match.user_id) {
                    printChatMessage(message.message_content, "match");
                    updateUnreadMessages(message);
                }
            });
        })
    });


    // add focus property to chat_input input
    $(".chat_input").focus(function() {
        $(this).data("hasfocus", true);
    });
    $(".chat_input").blur(function() {
        $(this).data("hasfocus", false);
    });

    // Filter matches on enter in name input
    $(document.body).keyup(function(ev) {
        // 13 is ENTER
        if (ev.which === 13 && $(".chat_input").data("hasfocus")) {
            submit();
        }
    });
});

// When message is received that is not your own print that message
socket.on('update messages', function(msg) {
    if ((msg.user_id != $user.user_id) && (msg.to == $user.user_id) && (msg.user_id == getUrlVars()["id"])) {
        printChatMessage(msg.message, "match");
    }
});

/*
 * Get variables from url
 * */
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/*
 * Get user name info of match from the database
 * */
function getUsername(callback) {
    var getUsersQuery = "select user_id, user_firstname, user_lastname, user_name from user where user_id = " + getUrlVars()["id"];
    $.get("/db", {
        query: getUsersQuery
    }).done(function(data) {
        callback(data[0]);
    });
}

/*
 * get message history
 * */
function getMessageHistory(callback) {
    var getMessageQuery = "SELECT message_id, message_content, message_to, message_from, message_read, message_date FROM message WHERE (message_from = " + match.user_id + " AND message_to = " + $user.user_id + ") OR (message_from = " + $user.user_id + " AND message_to = " + match.user_id + ") ORDER BY message_id ASC";
    $.get("/db", {
        query: getMessageQuery
    }).done(function(data) {
        callback(data);
    });
}

/*
 * Save message in the database for message history
 * */
function saveMessage(message) {
    var saveMessageQuery = "INSERT INTO message(message_content, message_from, message_to, message_date) VALUES('" + message.content + "', " + message.from + ", " + message.to + ", now())";
    $.get("/db", {
        query: saveMessageQuery
    }).done(function(data) {
        // callback(data);
    });
}

/**
 * set read bool to true of specific message
 * @param {String} message message object
 */
function updateUnreadMessages(message) {
    var getMessageQuery = "UPDATE message SET message_read=1 WHERE message_id =" + message.message_id + ";";
    $.get("/db", {
        query: getMessageQuery
    }).done(function(data) {
        // callback(data);
    });
}

/**
 * Function that sends the message to backend and prints it on frontend
 */
var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    if (message.length > 255) {
        alert("Bericht is te lang");
        return;
    };
    saveMessage({
        content: message,
        from: $user.user_id,
        to: match.user_id
    });
    socket.emit("send message", {
        user_id: $user.user_id,
        to: getUrlVars()["id"],
        message: message
    });
    printChatMessage(message, "user");
    messageContainer.val('');
}

/**
 * Print message in chat
 * @param {String} message Message from user or match
 * @param {String} position user or match | Where the message needs to be displayed
 */
var printChatMessage = function(message, position) {
    if (message.length > 0) {
        switch (position) {
            case "user":
                var message_template = "<p class='chat_message_name notranslate'>" + $user.user_name + "<p class='chat_message notranslate'>" + message + "</p>"
                $(".message_container").append(message_template);
                break;
            case "match":
                var message_match_template = "<p class='chat_message_match_name notranslate'>" + match.user_name + "</p><p class='chat_message_match notranslate'>" + message + "</p>"
                $(".message_container").append(message_match_template);
                break;
            default:
                break;
        }
        $(".message_container").scrollTop($(".message_container")[0].scrollHeight);
    } else {
        return;
    }
}