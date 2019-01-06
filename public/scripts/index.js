String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {

    /**
     * Get users logged in user
     * @param {function} callback
     */
    function authUser(callback){
        var authUserQuery ="SELECT * FROM user WHERE user.user_id =" + $user.user_id + ";";
        $.get("/db", {query:authUserQuery}).done(function(data){
            callback(data[0]);
        });
    }

    /**
     * Get users that are not matched with logged in user
     * @param {function} callback
     */
    function getUsers(callback){
        var getUsersQuery = "SELECT * FROM user WHERE user_id NOT IN(SELECT user_user_id_liked FROM liked WHERE user_user_id_has_liked ="+ $user.user_id + ") AND NOT user_id ="+ $user.user_id;
        $.get("/db", {query:getUsersQuery}).done(function (data) {
            callback(data);
        });
    }

    /**
     * Print users based on array of users
     * Ignore users
     * Match users
     * @param {array} users as data
     */
    getUsers(function (data) {
        // Carousel template
        var carouselItemTemplate = $('div#carousel-item-template').parent().html();

        // Define array for listed users
        var userInArray = [];

        // Clear template from page
        $('div#carousel-item-template').parent().empty();

        // Loop for first 3 users in array
        for (var i = 0; i <= 2; i++) {
            // pass user_id to array
            userInArray.push(data[i].user_id);

            // Add new carousel wih data from users array
            newCarouselItem = (' ' + carouselItemTemplate).slice(1);
            newCarouselItem = newCarouselItem.replace("{{name}}", data[i].user_firstname + " " + data[i].user_lastname)
                .replace("{{description}}", data[i].user_about)
                .replace("{{image}}", "<img id='theImg' src='images/img_avatar.png' style='width: 150px; height: 100%;'/>");
            $(".flex-wrapper").append(newCarouselItem);
            $("." + data[i].user_id).removeClass("user-card-wrapper-display-none");
            $('#carousel-item-template').attr('id', "template-id-" + data[i].user_id).removeClass("user-card-wrapper-display-none");
        }

        // Ignore user
        $(document).on("click", ".user-buttons #removeItem", function(){
            // Get the assigned template id of the clicked button
            var templateId = $(this).parent().parent().parent().attr('id');
            // Seperate the collected value
            var idArr = templateId.split('-'); // idArr[2] returns the id of selected user

            // Get the user credentials based on selected user
            var selectedUserFirstname, selectedUserLastname, selectedUserId;
            $.each( data, function( key, value ) {
                if (value.user_id == idArr[2]){
                    selectedUserFirstname = value.user_firstname;
                    selectedUserLastname = value.user_lastname;
                    selectedUserId = value.user_id;
                }
            });

            // Confirm if user wants to ignore the current selected user
            var answer = confirm("Wilt u gebruiker " + selectedUserFirstname + " " + selectedUserLastname + " negeren?");
            if (answer) {
                // Get last element from userInArray and + 1 for next user
                userInArray.sort();
                var lastEl = userInArray.slice(-1)[0] + 1;

                // Remove user from page
                $("#template-id-" + idArr[2]).fadeOut("slow");

                // Each through all users, if user_id is equal to lastEl assign values
                var nextUserFirstname = "Geen", nextUserLastname = "Gebruiker", nextUserAbout = "U heeft geen mogelijke matches meer", nextUserId = 0;
                $.each( data, function( key, value ) {
                    if (value.user_id == lastEl){
                        // Define all values for next user
                        nextUserFirstname = value.user_firstname;
                        nextUserLastname = value.user_lastname;
                        nextUserAbout = value.user_about;
                        nextUserId = value.user_id;

                        // Push user_id in array
                        userInArray.push(nextUserId);
                    }
                });

                // Add new carousel with data from users array
                newCarouselItem = (' ' + carouselItemTemplate).slice(1);
                newCarouselItem = newCarouselItem.replace("{{name}}", nextUserFirstname + " " + nextUserLastname)
                    .replace("{{description}}", nextUserAbout)
                    .replace("{{image}}", "<img id='theImg' src='images/img_avatar.png' style='width: 150px; height: 100%;'/>");
                $(".flex-wrapper").append(newCarouselItem);
                $("." + nextUserId).removeClass("user-card-wrapper-display-none");
                $('#carousel-item-template').attr('id', "template-id-" + nextUserId).removeClass("user-card-wrapper-display-none");
            }
        });

        // Match user
        $(document).on("click", ".user-buttons #matchItem", function(){
            // Get the assigned template id of the clicked button
            var templateId = $(this).parent().parent().parent().attr('id');
            // Seperate the collected value
            var idArr = templateId.split('-');

            // Get the user credentials based on selected user
            var selectedUserFirstname;
            var selectedUserLastname;
            $.each( data, function( key, value ) {
                if (value.user_id == idArr[2]){
                    selectedUserFirstname = value.user_firstname;
                    selectedUserLastname = value.user_lastname;
                }
            });

            // Confirm if user wants to match the current selected user
            var answer = confirm("Wilt u gebruiker " + selectedUserFirstname + " " + selectedUserLastname + " matchen?");
            if (answer) {
                // Get last element from userInArray and + 1 for next user
                userInArray.sort();
                var lastEl = userInArray.slice(-1)[0] + 1;

                // Remove user from page
                $("#template-id-" + idArr[2]).fadeOut("slow");

                // Each through all users, if user_id is equal to lastEl assign values
                var nextUserFirstname = "Geen", nextUserLastname = "Gebruiker", nextUserAbout = "U heeft geen mogelijke matches meer", nextUserId = 0;
                $.each( data, function( key, value ) {
                    if (value.user_id == lastEl){
                        // Define all values for next user
                        nextUserFirstname = value.user_firstname;
                        nextUserLastname = value.user_lastname;
                        nextUserAbout = value.user_about;
                        nextUserId = value.user_id;

                        // Push user_id in array
                        userInArray.push(nextUserId);
                    }
                });

                // Create a match based on Auth user and current selected user
                var createMatchQuery = "INSERT INTO liked (user_user_id_has_liked, user_user_id_liked, like_created_at) values(" + $user.user_id + ", " + idArr[2] + ", NOW());";
                $.get("/db", {query: createMatchQuery}).done(function () {});

                // Add new carousel with data from users array
                newCarouselItem = (' ' + carouselItemTemplate).slice(1);
                newCarouselItem = newCarouselItem.replace("{{name}}", nextUserFirstname + " " +nextUserLastname)
                    .replace("{{description}}", nextUserAbout)
                    .replace("{{image}}", "<img id='theImg' src='images/img_avatar.png' style='width: 150px; height: 100%;'/>");
                $(".flex-wrapper").append(newCarouselItem);
                $("." + nextUserId).removeClass("user-card-wrapper-display-none");
                $('#carousel-item-template').attr('id', "template-id-" + nextUserId).removeClass("user-card-wrapper-display-none");
            }
        });
    });

    /**
     * Show editable button based on role
     * @param {object} user as data
     */
    authUser(function(data){
        var ADMIN_ROLE = 1;
        if(data.role_role_id = ADMIN_ROLE){
           $('#preface-edit').show();
        }
    });
});

// Replace titel and text with editable fields
$(document).on("click", "#preface-edit", function () {
    $('#preface-title').replaceWith("<h2 id='preface-title-edit-1'>Titel:</h2> <input type='text' id='preface-title-edit-2'><br>");
    $('#preface-text-area').replaceWith("<p id='preface-text-area-edit-1'>Info:</p> <textarea rows='7' cols='65' id='preface-text-area-edit-2'></textarea><br>");
    $('#preface-save').append('<i class="far fa-save fa-2x pointer" id="preface-save-icon"></i>');

    $('#preface-edit').hide();
});

// Replace editable fields with filled in titel and text
$(document).on("click", "#preface-save", function () {
    $('#preface-title-edit-2').replaceWith("<h1 id='preface-title'>" + $('#preface-title-edit-2').val() + "</h1>");
    $('#preface-text-area-edit-2').replaceWith("<p id='preface-text-area'>" + $('#preface-text-area-edit-2').val() + "</p>");

    $('#preface-title-edit-1').remove();
    $('#preface-text-area-edit-1').remove();

    $('#preface-save-icon').remove();
    $('#preface-edit').show();
});