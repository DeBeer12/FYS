$("#js-registration-form").submit(function(e) {
    e.preventDefault();

    var first_name = $("#js-registration-form #first_name").val();
    var last_name = $("#js-registration-form #last_name").val();
    var user_name = $("#js-registration-form #user_name").val();
    var email = $("#js-registration-form #email").val();
    var password = $("#js-registration-form #password").val();
    var birthday = $("#js-registration-form #birthday").val();

    var query = "INSERT INTO user(user_firstname, user_mail, user_password, user_birthday, user_lastname, user_name, user_last_login, role_role_id)" +
        "VALUES('" + first_name + "', '" + email + "', '" + password + "', '" + birthday + "', '" + last_name + "' , '" + user_name + "',now()," + 2 + ");";

    console.log(query);

    $.get("/db", { query: query }).done(function(data) {
        alert("Registered");
    });

});