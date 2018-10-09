$( document ).ready(function() {
    console.log("Ready set Go!!!");

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