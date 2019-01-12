$("#js-login-form").submit(function(e) {
    e.preventDefault();
//get form variables
    var username = $("#js-login-form #username").val();
    var password = $("#js-login-form #password").val();
    console.log(username.length + " Pass: " + password.length)
    
    // Check if input fields are not empty
    if(username.length == 0 && password.length == 0){
        alert("Gebruikersnaam en wachtwoord zijn verplichte velden");
    } else if(username.length == 0){
        alert("Gebruikersnaam is een verplicht veld");
    } else if(password.length == 0) {
        alert("Wachtwoord is een verplicht veld");
    } else if(username.length > 0 && password.length > 0) {
        // Send user input to database for verification
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
    }
});

// Alert user for wrong input
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