// String replace function for all ocurances in string.prototype
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// Template for match
var match_template = '<div id="match{{id}}" class="match"> ' +
    '<div class="match_picture"> ' +
    '<img src="images/img_avatar.png" alt="Match Picture"> </div>' +
    '<div class="match_info"> ' +
    '<p class="match_name">John Doe</p>' +
    '<p class="match_age">21 Jaar</p>' +
    '<p class="match_date">1 week geleden gematched</p>' +
    '</div>' +
    '<div class="match_tags_container"> ' +
    '<ul class="match_tags"> Vakanties gepland: ' +
    '<li class="match_tag">Lorem ipsum</li>' +
    '<li class="match_tag">Lorem ipsum</li>' +
    '</ul> ' +
    '</div>' +
    '<div class="match_icons"> ' +
    '<a href="chat.html" title="Chat with match {{id}}">' +
    '<i id="chat_with_match" class="fas fa-2x fa-comments">' +
    '</i>' +
    '</a> ' +
    '<i id="delete_match" onclick="deleteMatch({{id}})" class="fas fa-2x fa-trash"></i> ' +
    '</div></div>'

$(document).ready(function() {
    // Show insert match template 10 times in container
    for (var i = 0; i < 10; i++) {
        $('.container').append(match_template.replaceAll("{{id}}", i));
    }
});

var deleteMatch = function(elemId) {
    var answer = confirm("Wilt u Match " + elemId + " echt verwijderen?")
    if (answer) {
        $("#match" + elemId).remove();
    } else {
        return;
    }
}

// var chatWithMatch = function() {
    // window.alert("Chat begonnen!")
// }