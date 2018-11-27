

$("#js-login-form").submit(function(e){

e.preventDefault();

var username = $("#js-login-form #username").val();
var password = $("#js-login-form #password").val();

alert(username + "   " + password);

});

var query = "SELECT * FROM fys_is106_1.user WITH user.user_name = username AND user.user_password = password;";
