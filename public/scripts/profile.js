$(document).ready(function () {
    let user;

    /**
     * het ophalen van parameters uit de url
     * */
    function getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    function dateFormatter(date) {
        let splitBirthday = date.split("-");
        let newBirthdayDay = splitBirthday[2].split("T")[0];
        newBirthdayDay++;
        let newBirthdayMonth = splitBirthday[1];
        let newBirthdayYear = splitBirthday[0];
        return newBirthdayDay + "-" + newBirthdayMonth + "-" + newBirthdayYear;
    }

    /**
     * haalt alle informatie op van de user van welke pagina wordt bekeken
     * */
    function getUser(callback) {
        let getUsersQuery = "select * from user where user_id = " + getUrlVars()["id"];
        $.get("/db", {query: getUsersQuery}).done(function (data) {
            callback(data[0]);
        });
    }

    /**
     * haalt de intresses op die overeenkomen met de bekeken gebruiker en de ingelogde gebruiker
     * */
    function getUserSameInterest(callback) {
        let getUserInterestQuery = "select * from user_has_interest left join interest inte_2 on interest_interest_id = inte_2.interest_id "
            + "where user_user_id = " + getUrlVars()["id"]
            + " AND EXISTS ( 	select * from user_has_interest us1 "
            + "left join interest inte1 on us1.interest_interest_id = inte1.interest_id "
            + "where us1.user_user_id = @user_id AND inte1.interest_id = inte_2.interest_id) ";
        $.get("/db", {query: getUserInterestQuery}).done(function (interestSame_data) {
            callback(interestSame_data);
        });
    }

    /**
     * haalt de intresses op die niet overeenkomen met de bekeken gebruiker en de ingelogde gebruiker
     * */
    function getUserDiffInterest(callback) {
        let getUserDiffInterestQuery = "SELECT * from user_has_interest left join interest inte_2 on interest_interest_id = inte_2.interest_id "
            + "where user_user_id = " + getUrlVars()["id"]
            + " AND not EXISTS ( 	select * from user_has_interest us1 "
            + "left join interest inte1 on us1.interest_interest_id = inte1.interest_id "
            + "where us1.user_user_id = @user_id AND inte1.interest_id = inte_2.interest_id)";
        $.get("/db", {query: getUserDiffInterestQuery}).done(function (interestDiff_data) {
            callback(interestDiff_data);
        });
    }

    /**
     * haalt alle intresses op van de gebruiker die ingelogd is en die hij nog niet gebruikt
     * */
    function getNotUsedInterest(callback) {
        let getNotUsedInterestQuery = "SELECT interest_id, interest_name FROM interest where interest_id not in " +
            "(select interest_interest_id from user_has_interest where user_user_id = @user_id)";
        $.get("/db", {query: getNotUsedInterestQuery}).done(function (notUsed_data) {
            callback(notUsed_data);
        });
    }

    /**
     * Het ophalen van een user en op de pagina plaatsen
     */
    getUser(function (data) {
        user = data;

        //user data ophalen en op de website zetten
        let profile_div = $('div#profile');
        let profile = profile_div.html();
        profile = profile.replace("{{firstname}}", user["user_firstname"])
            .replace("{{lastname}}", user["user_lastname"])
            .replace("{{birthday}}", dateFormatter(user["user_birthday"]))
            .replace("{{about}}", user["user_about"]);
        profile_div.html(profile);
        document.getElementById("profile-image").src = "images/profile-images/profile-image-" + getUrlVars()["id"] + ".jpg";

        //de intresses van de gebruiker die overeenkomen met de andere gebruiker ophalen en aan de list toevoegen
        getUserSameInterest(function (interestSame_data) {
            let ul = document.getElementById("interest-list");

            for (let i = 0; i < interestSame_data.length; i++) {
                let li = document.createElement("li");
                li.className = "profile-checkbox-checked";
                li.setAttribute("interest", interestSame_data[i]["interest_id"]);
                li.appendChild(document.createTextNode(interestSame_data[i]["interest_name"]));
                ul.appendChild(li);
            }
        });

        //niet overeenkomende intresses ophalen en toevoegen aan de list
        getUserDiffInterest(function (interestDiff_data) {
            let ul = document.getElementById("interest-list");

            for (let i = 0; i < interestDiff_data.length; i++) {
                let li = document.createElement("li");
                li.className = "profile-checkbox";
                li.setAttribute("interest", interestDiff_data[i]["interest_id"]);
                li.appendChild(document.createTextNode(interestDiff_data[i]["interest_name"]));
                ul.appendChild(li);
            }
        });


        //checken of de profiel pagina van een andere gebruiker is of de profiel pagina van de gebruiker zelf
        if (getUrlVars()["id"] == $user.user_id) {
            document.getElementById("uploadForm").action = "/upload?id=" + $user.user_id;

            let save_button = document.getElementById("save-svg");
            let edit_button = document.getElementById("edit-svg");
            let choose_image = document.getElementById("choose-image")

            edit_button.style.display = "block";
            edit_button.onclick = function () {
                edit_button.style.display = "none";
                save_button.style.display = "block";
                let elements = [
                    document.getElementById("about"),
                    document.getElementById("firstname"),
                    document.getElementById("lastname"),
                    document.getElementById("birthday"),
                ];

                for (let i = 0; elements.length > i; i++) {
                    elements[i].contentEditable = true;
                    elements[i].style.border = "1px solid #0099ff";
                }
            };



            choose_image.onclick = function () {
                choose_image.innerHTML = "Kies een andere foto";
            };


            save_button.onclick = function () {
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

                for (let i = 0; elements.length > i; i++) {
                    elements[i].contentEditable = false;
                    elements[i].style.border = "none";
                    if (i + 1 === elements.length) {
                        query += "user_" + elements[i].getAttribute("id") + " = '" + birthday + "' ";
                    } else {
                        query += "user_" + elements[i].getAttribute("id") + " = '" + elements[i].innerHTML + "', ";
                    }
                }

                query += "where user_id = @user_id";
                console.log(query);
                $.get("/db", {query: query}).done(function (data) {
                    location.reload();
                });
            };

            //het ophalen van de intresses die nog niet geselecteerd
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

                //invoeren van de gekozen intresse in de db
                select.onchange = function () {
                    var query = "INSERT INTO user_has_interest (user_user_id, interest_interest_id) VALUES (@user_id, " + select.value + ");";

                    console.log(query);

                    $.get("/db", {query: query}).done(function (data) {
                        location.reload();
                    });
                }
            });

            if (document.getElementById("interest-list") == null) {
                document.getElementById("interest-list").innerHTML = "Geen intresses";
            }
        } else {
            document.getElementById("uploadForm").style.display = "none";
        }
    });


});