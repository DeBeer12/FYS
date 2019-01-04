// Variables
var socket = io.connect('http://localhost:8080');
var match = {};
var matchHistory = [];

// On page load
$(document).ready(function() {
    // Get username of match
    getUsername(function(username) {
        match = username;
        $("h2.title")[0].innerHTML = "Chat met " + match.user_firstname + " " + match.user_lastname;

        getMessageHistory(function(matchHistoryData) {
            matchHistory = matchHistoryData;
            matchHistoryData.forEach(function(message) {
                if (message.message_from == $user.user_id) {
                    printChatMessage(message.message_content, "user")
                } else if (message.message_from == match.user_id) {
                    printChatMessage(message.message_content, "match")
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
    if ($user.user_id != msg.user_id) {
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
    var getMessageQuery = "SELECT message_content, message_to, message_from FROM message WHERE (message_from = " + match.user_id + " AND message_to = " + $user.user_id + ") OR (message_from = " + $user.user_id + " AND message_to = " + match.user_id + ")";
    $.get("/db", {
        query: getMessageQuery
    }).done(function(data) {
        callback(data);
    });
}

/*
 * Save message in the database for message history
 * */
function saveMessage(message, callback) {
    var saveMessageQuery = "INSERT INTO message(message_content, message_from, message_to, message_date) VALUES('" + message.content + "', " + message.from + ", " + message.to + ", now())";
    $.get("/db", {
        query: saveMessageQuery
    }).done(function(data) {
        callback(data);
    });
}

/**
 * Function that sends the message to backend and prints it on frontend
 */
var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    saveMessage({
        content: message,
        from: $user.user_id,
        to: match.user_id
    });
    socket.emit("send message", {
        user_id: $user.user_id,
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
                var message_template = "<p class='chat_message_name'>" + $user.user_name + "<p class='chat_message'>" + message + "</p>"
                $(".message_container").append(message_template);
                break;
            case "match":
                var message_match_template = "<p class='chat_message_match_name'>" + match.user_name + "</p><p class='chat_message_match'>" + message + "</p>"
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