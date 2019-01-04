//Get usernames in a array
function getUsernames() {
    var usernames = [];
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT user_name FROM fys_is106_1.user"}).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                usernames.push(data[i].user_name)
            }
            resolve(usernames);
        });
    });
}

//get email adresses in a array
function getEmailAdresses(){
var emailAdresses = [];
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT user_mail FROM fys_is106_1.user"}).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                emailAdresses.push(data[i].user_mail)
            }
            resolve(emailAdresses);
        });
    });
}

$("#js-registration-form").submit(async function(e) {
    e.preventDefault();
//variables of input fields
    var first_name = $("#js-registration-form #first_name").val();
    var last_name = $("#js-registration-form #last_name").val();
    var user_name = $("#js-registration-form #user_name").val();
    var email = $("#js-registration-form #email").val();
    var password = $("#js-registration-form #password").val();
    var birthday = $("#js-registration-form #birthday").val();


    var   usernameArray = await getUsernames();
    var emailArray = await getEmailAdresses();

//check if the username and/or email already exists

    if(usernameArray.includes(user_name) && emailArray.includes(email)){
        alert("De door jouw gekozen gebruikersnaam en e-mail zijn al in gebruik");
    }
    else if (usernameArray.includes(user_name)){
    alert("De door jouw gekozen gebruikersnaam is al in geburik");
    }
    else if(emailArray.includes(email)){
    alert("De door gekozen e-mail is al in gebruik");
    }
    else{
        //put the new account in the database
        var query = "INSERT INTO user(user_firstname, user_mail, user_password, user_birthday, user_lastname, user_name, user_last_login, role_role_id, user_salt)" +
            "VALUES('" + first_name + "', '" + email + "', '" + password + "', '" + birthday + "', '" + last_name + "', '" + user_name + "',now(),'" + 2 + "', '" + "test_salt');";

        console.log(query);

        $.get("/db", { query: query }).done(function(data) {
        alert("Registered");
        });
    }
});