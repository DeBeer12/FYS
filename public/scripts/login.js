$("#js-login-form").submit(function(e) {
    e.preventDefault();

    var username = $("#js-login-form #username").val();
    var password = $("#js-login-form #password").val();

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

function invalidLogin() {
    alert("Username or password is incorrect");
}

function firstLogin(id) {
    var query = "UPDATE user SET user_first_login = 1 WHERE user_id = " + id;
    $.get("/db", { query: query }).done(function(data) {
        alert("Registered");
    });
}