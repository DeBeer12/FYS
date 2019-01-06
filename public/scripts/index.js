String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {
    function authUser(callback){
        var authUserQuery ="SELECT * FROM user WHERE user.user_id =" + $user.user_id + ";";
        $.get("/db", {query:authUserQuery}).done(function(data){
            callback(data[0]);
        });
    }

    function getUsers(callback){
        var getUsersQuery = "SELECT * FROM user WHERE user_id NOT IN(SELECT user_user_id_liked FROM liked WHERE user_user_id_has_liked ="+ $user.user_id + ") AND NOT user_id ="+ $user.user_id;
        $.get("/db", {query:getUsersQuery}).done(function (data) {
            callback(data);
        });
    }

    getUsers(function (data) {
       console.log(data);

        // Carousel template
        var carouselItemTemplate = $('div#carousel-item-template').parent().html();

        // Array for listed users
        var userInArray = [];

        // clear template from page
        $('div#carousel-item-template').parent().empty();

        for (var i = 0; i <= 2; i++) {
            // pass user id to array
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
            var templateId = $(this).parent().parent().parent().attr('id');
            var idArr = templateId.split('-'); // idArr[2] returns the id of selected user
            var answer = confirm("Wilt u gebruiker " + data[idArr[2] - 51].user_firstname + " " + data[idArr[2] - 51].user_lastname + " negeren?"); // Not finished yet ***

            if (answer) {
                // Get last element from array - 50 to return id usable for collecting new user from users array
                var lastEl = userInArray.slice(-1)[0] - 50;

                // Push the user id in userInArray
                userInArray.push(data[lastEl].user_id);

                // Remove user from page
                $("#template-id-" + idArr[2]).fadeOut("slow");

                // Add new carousel with data from users array
                newCarouselItem = (' ' + carouselItemTemplate).slice(1);
                newCarouselItem = newCarouselItem.replace("{{name}}", data[lastEl].user_firstname + " " + data[lastEl].user_lastname)
                    .replace("{{description}}", data[lastEl].user_about);
                $(".flex-wrapper").append(newCarouselItem);
                $("." + data[lastEl].user_id).removeClass("user-card-wrapper-display-none");
                $('#carousel-item-template').attr('id', "template-id-" + data[lastEl].user_id).removeClass("user-card-wrapper-display-none");
            }
        });

        // Match user
        $(document).on("click", ".user-buttons #matchItem", function(){
            var templateId = $(this).parent().parent().parent().attr('id');
            var idArr = templateId.split('-');
            var answer = confirm("Wilt u gebruiker " + data[idArr[2] - 51].user_firstname + " " + data[idArr[2] - 51].user_lastname + " matchen?"); // 51 is hardcoded to get first user fixing this later

            if (answer) {
                // Get last element from array - 50 to return id usable for collecting new user from users array
                var lastEl = userInArray.slice(-1)[0] - 50;
                // Push the user id in userInArray
                userInArray.push(data[lastEl].user_id);

                // Remove user from page
                $("#template-id-" + idArr[2]).fadeOut("slow");

                // Create match
                var createMatchQuery = "INSERT INTO liked (user_user_id_has_liked, user_user_id_liked, like_created_at) values(" + $user.user_id + ", " + idArr[2] + ", NOW());";
                $.get("/db", {query: createMatchQuery}).done(function () {});

                // Add new carousel with data from users array
                newCarouselItem = (' ' + carouselItemTemplate).slice(1);
                newCarouselItem = newCarouselItem.replace("{{name}}", data[lastEl].user_firstname + " " + data[lastEl].user_lastname)
                    .replace("{{description}}", data[lastEl].user_about);
                $(".flex-wrapper").append(newCarouselItem);
                $("." + data[lastEl].user_id).removeClass("user-card-wrapper-display-none");
                $('#carousel-item-template').attr('id', "template-id-" + data[lastEl].user_id).removeClass("user-card-wrapper-display-none");
            }
        });
    });

    authUser(function(data){
       if(data.role_role_id = 1){
           $('#preface-edit').show();
       }
    });
});

// $('#preface-edit').on('click', function () {
$(document).on("click", "#preface-edit", function () {
    $('#preface-title').replaceWith("<h2 id='preface-title-edit-1'>Titel:</h2> <input type='text' id='preface-title-edit-2'><br>");
    $('#preface-text-area').replaceWith("<p id='preface-text-area-edit-1'>Info:</p> <textarea rows='7' cols='65' id='preface-text-area-edit-2'></textarea><br>");
    $('#preface-save').append('<i class="far fa-save fa-2x pointer" id="preface-save-icon"></i>');

    $('#preface-edit').hide();
});

$('#preface-save').on('click', function () {
    $('#preface-title-edit-2').replaceWith("<h1 id='preface-title'>" + $('#preface-title-edit-2').val() + "</h1>");
    $('#preface-text-area-edit-2').replaceWith("<p id='preface-text-area'>" + $('#preface-text-area-edit-2').val() + "</p>");

    $('#preface-title-edit-1').remove();
    $('#preface-text-area-edit-1').remove();

    $('#preface-save-icon').remove();
    $('#preface-edit').show();
});