//Get usernames in a array
function getUsernames() {
    var usernames = [];
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT user_name FROM fys_is106_1.user" }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                usernames.push(data[i].user_name)
            }
            resolve(usernames);
        });
    });
}

//get email adresses in a array
function getEmailAdresses() {
    var emailAdresses = [];
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT user_mail FROM fys_is106_1.user" }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                emailAdresses.push(data[i].user_mail)
            }
            resolve(emailAdresses);
        });
    });
}


//get form variables
$("#js-registration-form").submit(async function(e) {
    var userData = {};
    e.preventDefault();
    //variables of input fields
    userData.first_name = $("#js-registration-form #first_name").val();
    userData.last_name = $("#js-registration-form #last_name").val();
    userData.user_name = $("#js-registration-form #user_name").val();
    userData.email = $("#js-registration-form #email").val();
    userData.password = $("#js-registration-form #password").val();
    userData.birthday = $("#js-registration-form #birthday").val();

    var usernameArray = await getUsernames();
    var emailArray = await getEmailAdresses();
console.log(userData)
    //check if the username and/or email already exists
if(userData.first_name == ""&& userData.last_name =="",userData.user_name=="",userData.email=="",userData.password=="",userData.birthday==""){alert("Vul alle velden in!!")}

    else if (usernameArray.includes(userData.user_name) && emailArray.includes(userData.email)) {
        alert("De door jouw gekozen gebruikersnaam en e-mail zijn al in gebruik");
    } else if (usernameArray.includes(userData.user_name)) {
        alert("De door jouw gekozen gebruikersnaam is al in geburik");
    } else if (emailArray.includes(userData.email)) {
        alert("De door jouw gekozen e-mail is al in gebruik");
    } else {
        $.post("/register", { user: userData }).done(function(data) {
            alert("Registered");
            //link to login
            window.location = "/login.html";
        });
    }
});