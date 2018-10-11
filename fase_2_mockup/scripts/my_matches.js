var match_template = '<div class="match"> <div class="match_picture"> <img src="images/img_avatar.png" alt="Match Picture"> </div><div class="match_info"> <p class="match_name">John Doe</p><p class="match_age">21 Jaar</p><p class="match_date">1 week geleden gematched</p></div><div class="match_tags_container"> <ul class="match_tags"> Vakanties gepland: <li class="match_tag">Lorem ipsum</li><li class="match_tag">Lorem ipsum</li></ul> </div><div class="match_icons"> <i id="chat_with_match" class="fas fa-2x fa-comments"></i> <i id="delete_match" class="fas fa-2x fa-trash"></i> </div></div>'

$( document ).ready(function() {
    for(var i = 0; i < 10;i++){
        $('.container').append(match_template);
    }
    $('#delete_match').click(function(elem){
        deleteMatch();
    });

    $('#chat_with_match').click(function(){
        chatWithMatch()
    });
});

var deleteMatch = function () {
    window.alert("Match verwijderd!")
}

var chatWithMatch = function () {
    window.alert("Chat begonnen!")
}