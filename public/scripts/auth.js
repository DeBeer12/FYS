var $user;

$.get("/getCurrentUserInfo").done(function(data) {
    $user = data;
})

function myProfile() {
    if ($user) {
        window.location = "/profile.html?id=" + $user.user_id;
    } else {
        alert("Something went wrong, try to relog.")
    }
}

function logout() {
    $.get('/logout').done(function(data) {
        window.location = "/login.html";
    })
}