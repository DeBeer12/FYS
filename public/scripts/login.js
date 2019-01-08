$("#js-login-form").submit(function(e) {
    e.preventDefault();
//get form variables
    var username = $("#js-login-form #username").val();
    var password = $("#js-login-form #password").val();
//sent variables to backend for verifying
    $.post("/login", { username: username, password: password }).done(function(result) {
        if (result.validation) {
            if (result.firstLogin) {
                firstLogin(result.user_id);
                window.location = '/profile.html?id=' + result.user_id;
            } else {
                window.location = '/index.html';
            }
        } else {
            invalidLogin();
        }
    });
});
//alert wrong input
function invalidLogin() {
    alert("Username or password is incorrect");
}
//first login redirect
function firstLogin(id) {
    var query = "UPDATE user SET user_first_login = 1 WHERE user_id = " + id;
    $.get("/db", { query: query }).done(function(data) {
        alert("Registered");
    });
}