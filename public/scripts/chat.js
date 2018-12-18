// Global variables
var socket = io.connect('http://localhost:8080');
var match = {};

// On page load
$(document).ready(function() {
    // Get username of match
    getUsername(function(data) {
            match = data;
            $("h2.title")[0].innerHTML = "Chat met " + match.user_firstname + " " + match.user_lastname;
        })
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
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/*
 * Get user name info of match from the database
 * */
function getUsername(callback) {
    let getUsersQuery = "select user_firstname, user_lastname, user_name from user where user_id = " + getUrlVars()["id"];
    $.get("/db", { query: getUsersQuery }).done(function(data) {
        callback(data[0]);
    });
}

/**
 * Function that sends the message to backend and prints it on frontend
 */
var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    printChatMessage(message, "user");
    socket.emit("send message", {
        user_id: $user.user_id,
        message: message
    });
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