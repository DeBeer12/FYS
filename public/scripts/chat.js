var chatResponses = ["Greetings,", "Hi,", "dududu", "lorem ipsum"];
var socket = io.connect('http://localhost:8080');
var lastMessage = "";
$(document).ready(function() {
    $(".chat_input").focus(function() {
        $(this).data("hasfocus", true);
    });

    $(".chat_input").blur(function() {
        $(this).data("hasfocus", false);
    });

    $(document.body).keyup(function(ev) {
        // 13 is ENTER
        if (ev.which === 13 && $(".chat_input").data("hasfocus")) {
            submit();
        }
    });
});

socket.on('update messages', function(msg) {
    if ($user.user_id != msg.user_id) {
        printChatMessage(msg.message, "match");
    }
});

var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    printChatMessage(message, "user");
    lastMessage = message;
    socket.emit("send message", {
        user_id: $user.user_id,
        message:message
    });
    messageContainer.val('');
}

var printChatMessage = function(message, position) {
    if (message.length > 0) {
        switch (position) {
            case "user":
                var message_template = "<p class='chat_message'>" + message + "</p>"
                $(".message_container").append(message_template);
                break;
            case "match":
                var message_match_template = "<p class='chat_message_match'>" + message + "</p>"
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

var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}