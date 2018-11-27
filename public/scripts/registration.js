

$("#js-registration-form").submit(function(e)){
e.preventDefault();

var first_name = $("#js-registration-form #first_name").val();
var last_name = $("#js-registration-form #last_name").val();
var user_name = $("#js-registration-form #user_name").val();
var email = $("#js-registration-form #email").val();
var password = $("#js-registration-form #password").val();
var birthday = $("#js-registration-form #birthday").val();

alert(first_name + " " + last_name + " " + user_name + " " + email + " " + password + " " + password + " " + birthday);
}