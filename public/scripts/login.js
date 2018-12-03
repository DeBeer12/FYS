$("#js-login-form").submit(function(e) {
    e.preventDefault();

    var username = $("#js-login-form #username").val();
    var password = $("#js-login-form #password").val();
    console.log(username + "   " + password);

    $.post("/login", { username: username, password: password }).done(function(result) {
        console.log(result)
        if (result.validation) {
            if (result.firstLogin) {
                window.location = '/profile.html?id=' + result.userId;
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