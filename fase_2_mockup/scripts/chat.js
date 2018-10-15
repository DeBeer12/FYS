$(document).ready(function() {
    console.log("READY!!")
});

var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    chatStuff(message);
    messageContainer.val('');
}

var chatStuff = function(message) {
    if (message.length > 0) {
        console.log(message)
        var message_template = "<p class='chat_message'>" + message + "</p>"
        $(".message_container").append(message_template);
    } else {
        return;
    }
}