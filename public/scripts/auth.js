var $user;

$.get("/getCurrentUserInfo").done(function(data) {
    $user = data;
})

function logout() {
    $.get('/logout').done(function(data) {
        window.location = "/login.html";
    })
}