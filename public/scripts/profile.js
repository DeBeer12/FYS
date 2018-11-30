$(document).ready(function () {
    let user;

    function getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    function getUser(callback){
        $.get( "/db", {query:"select * from user where user_id = " + getUrlVars()["id"]}).done(function( data ) {
            callback(data[0]);
        });
    }

    function getUserInterest(callback){
        $.get( "/db", {query:"select * from user_has_interest left join interest on interest_interest_id = interest_id where user_user_id = " + getUrlVars()["id"]}).done(function( interest_data ) {
            callback(interest_data);
        });
    }

    getUser(function(data){
        user = data;
        let firstname_placeholder = document.getElementById("firstname");
        let lastname_placeholder = document.getElementById("lastname");
        let age_placeholder = document.getElementById("age");
        let about_placeholder = document.getElementById("about");



        firstname_placeholder.innerHTML = user["user_firstname"];
        lastname_placeholder.innerHTML = user["user_lastname"];

        //moet nog uitgerekend worden voor later
        age_placeholder.innerHTML =  user[""];
        about_placeholder.innerHTML = user["user_about"];


        getUserInterest(function (interest_data) {
            console.log(interest_data);
            var ul_tag = "<ul>";
            for (let i = 0; i < interest_data.length; i++){
                ul_tag += '<li class="profile-checkbox" data-interests="'+ interest_data[i]["interest_id"] +'">' + interest_data[i]["interest_name"] + '</li>';
            }
            ul_tag += "</ul>";
            document.getElementById('profile-interest').innerHTML =  ul_tag;
        });
    });


});