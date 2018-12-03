$("#js-login-form").submit(function(e) {
    e.preventDefault();

    var username = $("#js-login-form #username").val();
    var password = $("#js-login-form #password").val();

    $.post("/login", { username: username, password: password }).done(function(result) {
        if (result.validation) {
            $user = {
                user_id: result.user_id
            };
            // if (result.firstLogin) {
                // window.location = '/profile.html?id=' + $user.user_id;
            // } else {
                window.location = '/index.html';
            // }
        } else {
            invalidLogin();
        }
    });
});

function invalidLogin() {
    alert("Username or password is incorrect");
}