$(document).ready(function () {

    /*
    * haalt het id op van de ingelogde user
    * */
    function checkOwnProfilePage(callback){
        let getUsersQuery ="select user_id from user where user_id = @user_id;";
        $.get( "/db", {query:getUsersQuery}).done(function( data ) {
            callback(data[0].user_id);
        });
    }

    let user;

    /*
    * het ophalen van parameters uit de url
    * */
    function getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    /*
    * haalt alle informatie op van de user van welke pagina wordt bekeken
    * */
    function getUser(callback){
        let getUsersQuery ="select * from user where user_id = " + getUrlVars()["id"];
        $.get( "/db", {query:getUsersQuery}).done(function( data ) {
            callback(data[0]);
        });
    }

    /*
    * haalt de intresses op die overeenkomen met de bekeken gebruiker en de ingelogde gebruiker
    * */
    function getUserSameInterest(callback){
        let getUserInterestQuery = "select * from user_has_interest left join interest inte_2 on interest_interest_id = inte_2.interest_id "
            + "where user_user_id = "+ getUrlVars()["id"]
            + " AND EXISTS ( 	select * from user_has_interest us1 "
            + "left join interest inte1 on us1.interest_interest_id = inte1.interest_id "
            + "where us1.user_user_id = @user_id AND inte1.interest_id = inte_2.interest_id) ";
        $.get( "/db", {query:getUserInterestQuery}).done(function( interestSame_data ) {
            callback(interestSame_data);
        });
    }

    /*
    * haalt de intresses op die niet overeenkomen met de bekeken gebruiker en de ingelogde gebruiker
    * */
    function getUserDiffInterest(callback){
        let getUserDiffInterestQuery = "SELECT * from user_has_interest left join interest inte_2 on interest_interest_id = inte_2.interest_id "
        + "where user_user_id = " + getUrlVars()["id"]
        + " AND not EXISTS ( 	select * from user_has_interest us1 "
        + "left join interest inte1 on us1.interest_interest_id = inte1.interest_id "
        + "where us1.user_user_id = @user_id AND inte1.interest_id = inte_2.interest_id)";
        $.get( "/db", {query:getUserDiffInterestQuery}).done(function( interestDiff_data ) {
            callback(interestDiff_data);
        });
    }

    /*
    * haalt alle intresses op van de gebruiker die ingelogd is en die hij nog niet gebruikt
    * */
    function getNotUsedInterest(callback){
        let getNotUsedInterestQuery = "SELECT interest_id, interest_name FROM interest where interest_id not in " +
            "(select interest_interest_id from user_has_interest where user_user_id = @user_id)";
        $.get( "/db", {query:getNotUsedInterestQuery}).done(function( notUsed_data ) {
            callback(notUsed_data);
        });
    }


    getUser(function(data){
        user = data;
        let firstname_placeholder = document.getElementById("firstname");
        let lastname_placeholder = document.getElementById("lastname");
        let age_placeholder = document.getElementById("birthday");
        let about_placeholder = document.getElementById("about");
        let profile_image = document.getElementById("profile-image");

        console.log(user);
        let splitBirthday =  user["user_birthday"].split("-");
        let newBirthdayDay = splitBirthday[2].split("T")[0];
        newBirthdayDay++;
        let newBirthdayMonth = splitBirthday[1];
        let newBirthdayYear = splitBirthday[0];

        let newBirthday = newBirthdayDay + "-" + newBirthdayMonth + "-" + newBirthdayYear;

        firstname_placeholder.innerHTML = user["user_firstname"];
        lastname_placeholder.innerHTML = user["user_lastname"];
        age_placeholder.innerHTML =  newBirthday;
        about_placeholder.innerHTML = user["user_about"];
        profile_image.src = "images/profile-image-" + getUrlVars()["id"];

        getUserSameInterest(function (interestSame_data) {
            let ul = document.getElementById("interest-list");

            for (let i = 0; i < interestSame_data.length; i++){
                let li = document.createElement("li");
                li.className = "profile-checkbox-checked";
                li.setAttribute("interest", interestSame_data[i]["interest_id"]);
                li.appendChild(document.createTextNode(interestSame_data[i]["interest_name"]));
                ul.appendChild(li);
            }
        });


        //checken of de 
        checkOwnProfilePage(function (data) {
            if(getUrlVars()["id"] == data){
                document.getElementById("uploadForm").action = "/upload?id=" + $user.user_id;
                let save_button = document.getElementById("save-svg");
                let edit_button = document.getElementById("edit-svg");
                edit_button.style.display = "block";
                edit_button.onclick = function () {
                    edit_button.style.display = "none";
                    save_button.style.display = "block";
                    var elements = [
                        document.getElementById("about"),
                        document.getElementById("firstname"),
                        document.getElementById("lastname"),
                        document.getElementById("birthday"),
                    ];

                    for(let i = 0; elements.length > i; i++){
                        elements[i].contentEditable = true;
                        elements[i].style.border = "1px solid #0099ff";
                    }
                };

                save_button.onclick = function (){
                    save_button.style.display = "none";
                    edit_button.style.display = "block";
                    let formatBirthday = document.getElementById("birthday").innerHTML.split("-");
                    let birthday = formatBirthday[2] + "-" + formatBirthday[1] + "-" + formatBirthday[0];
                    var elements = [
                        document.getElementById("about"),
                        document.getElementById("firstname"),
                        document.getElementById("lastname"),
                        document.getElementById("birthday")
                    ];

                    var query = "update user set ";

                    for(let i = 0; elements.length > i; i++){
                        elements[i].contentEditable = false;
                        elements[i].style.border = "none";
                        if (i + 1 == elements.length) {
                            query += "user_" + elements[i].getAttribute("id") + " = '" + birthday + "' ";
                        }else {
                            query += "user_" + elements[i].getAttribute("id") + " = '" + elements[i].innerHTML + "', ";
                        }
                    }

                    query += "where user_id = @user_id";
                    console.log(query);
                    $.get("/db", { query: query }).done(function(data) {
                        location.reload();
                    });
                };


                getNotUsedInterest(function (notUsedData) {
                    let ul = document.getElementById("interest-list");
                    let select = document.createElement("SELECT");
                    select.className = "new_interest";
                    let defaultOption = document.createElement("option");
                    defaultOption.text = "Kies meer intresses";
                    select.appendChild(defaultOption);
                    for (let i = 0; notUsedData.length > i; i++) {
                        let option = document.createElement("option");
                        option.text = notUsedData[i]["interest_name"];
                        option.value = notUsedData[i]["interest_id"];

                        select.appendChild(option);
                    }
                    select.options[0].disabled = true;
                    ul.appendChild(select);
                    
                    select.onchange = function () {
                        var query = "INSERT INTO user_has_interest (user_user_id, interest_interest_id) VALUES (@user_id, " + select.value + ");";

                        console.log(query);

                        $.get("/db", { query: query }).done(function(data) {
                            location.reload();
                        });
                    }
                });

                if(document.getElementById("interest-list") == null){
                    document.getElementById("interest-list").innerHTML = "Geen intresses";
                }
            } else{
                document.getElementById("uploadForm").style.display = "none";
                if(document.getElementById("interest-list").innerHTML == ""){
                    document.getElementById("interest-list").innerHTML = "<p style='text-align: center'>Geen intresses</p>";
                }
            }
        })
    });


});