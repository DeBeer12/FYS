String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {
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
                .replace("{{description}}", ((data[i].user_about != null) ? data[i].user_about : 'Gebruiker heeft geen beschrijving'))
                .replace("{{image}}", "<img id='theImg' onerror={this.src='images/img_avatar.png'} src='images/profile-images/profile-image-"+ $user.user_id +".png' style='width: 150px; height: 100%;'/>");
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
                    .replace("{{description}}", ((nextUserAbout != null) ? nextUserAbout : 'Gebruiker heeft geen beschrijving'))
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
                    .replace("{{description}}", ((nextUserAbout != null) ? nextUserAbout : 'Gebruiker heeft geen beschrijving'))
                    .replace("{{image}}", "<img id='theImg' src='images/img_avatar.png' style='width: 150px; height: 100%;'/>");
                $(".flex-wrapper").append(newCarouselItem);
                $("." + nextUserId).removeClass("user-card-wrapper-display-none");
                $('#carousel-item-template').attr('id', "template-id-" + nextUserId).removeClass("user-card-wrapper-display-none");
            }
        });
    });

    // Show CMS in navbar if user has admin role
    var ADMIN_ROLE = 1; // 1 is equal to admin role in DB
    if ($user.rol != ADMIN_ROLE){
        $('#cms_navbar').remove();
    }
});