function logout() {
    $.get('/logout', function(data) {
        window.location = "/login.html";
    })
}