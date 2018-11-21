var chat_responses = ["Greetings,", "Hi,", "dududu", "lorem ipsum"];

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

var submit = function() {
    var messageContainer = $('.chat_input');
    var message = messageContainer.val();
    print_chat_message(message);
    messageContainer.val('');
}

var print_chat_message = function(message) {
    if (message.length > 0) {
        var br_index = getRandomInt(0, 5);
        var bot_response = chat_responses[br_index];
        var message_template = "<p class='chat_message'>" + message + "</p>"
        $(".message_container").append(message_template);
        if (br_index != 4) {

            var message_match_template = "<p class='chat_message_match'>" + bot_response + "</p>"
            $(".message_container").append(message_match_template);
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