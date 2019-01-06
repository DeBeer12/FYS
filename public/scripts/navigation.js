$(document).ready(function() {
    $(".ham").click(function() {
        $(this).toggleClass('active');
        $(this).parent(".nav-bar_links").toggleClass("active");
    });
    getUnreadMessagesCount(function(count) {
        $("#unread_messages")[0].innerHTML = " " + count;
    })
});

/**
 * get all unread messages based on userid
 * @param {int} userId
 */
function getUnreadMessagesCount(callback) {
    var unreadMessagesCountQuerry = "Select count(message_id) AS count FROM message WHERE message_to = " + $user.user_id + " AND message_read = false";
    $.get("/db", { query: unreadMessagesCountQuerry }).done(function(data) {
        var messageCount = data[0].count;
        callback(messageCount);
    });
}