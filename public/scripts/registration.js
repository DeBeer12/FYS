$("#js-registration-form").submit(function(e) {
    e.preventDefault();
//variables of input fields
    var first_name = $("#js-registration-form #first_name").val();
    var last_name = $("#js-registration-form #last_name").val();
    var user_name = $("#js-registration-form #user_name").val();
    var email = $("#js-registration-form #email").val();
    var password = $("#js-registration-form #password").val();
    var birthday = $("#js-registration-form #birthday").val();

//query for all usernames and put them in array
    var usernameQuery = "SELECT user_name FROM fys_is106_1.user"
    var usernameArray = []
    $.get("/db", {query : usernameQuery})
    for(var i = 0; i <usernameArray.length; i++){
    usernameArray.push(data[i].user_name)
    }
    console.log(usernameArray)

//query for all email adresses and put them in a array
    var emailQuery = "SELECT user_mail FROM fys_is106_1.user"
    var emailArray = []
    $.get("/db", {query : emailQuery})
        for(var i = 0; i <emailArray.length; i++){
        emailArray.push(data[i].user_mail)
        }

//check if the username and/or email already exists
    for(var i = 0; i< usernameQuery.length; i++){
    if(user_name == usernameArray[i] && email == emailArray[i]){
        alert("De door jouw gekozen gebruikersnaam en e-mail zijn al in gebruik");
    }
    else if (user_name == usernameArray[i]){
    alert("De door jouw gekozen gebruikersnaam is al in geburik");
    }
    else if(email == emailArray[i]){
    alert("De door gekozen e-mail is al in gebruik")
    }
}

//put the new account in the database
    var query = "INSERT INTO user(user_firstname, user_mail, user_password, user_birthday, user_lastname, user_name, user_last_login, role_role_id)" +
        "VALUES('" + first_name + "', '" + email + "', '" + password + "', '" + birthday + "', '" + last_name + "' , '" + user_name + "',now()," + 2 + ");";

    console.log(query);

    $.get("/db", { query: query }).done(function(data) {
        alert("Registered");
    });

});