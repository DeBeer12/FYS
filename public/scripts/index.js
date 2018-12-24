String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var users;
var title;
var text;
var userId;

function loggedInUserId() {

    if ($user != null) {
        userId = $user.user_id;
    }
}

setTimeout(loggedInUserId, 100);

$(document).ready(async function () {

    users = await resolveAfter2Seconds();


    // Carousel template
    var carouselItemTemplate = $('div#carousel-item-template').parent().html();

    // Users where the id already got used for display
    var userInArray = [];

    // clear template from page
    $('div#carousel-item-template').parent().empty();

    for (var i = 0; i <= 2; i++) {
        // pass user id to array
        userInArray.push(users[i].user_id);

        // Add new carousel wih data from users array
        newCarouselItem = (' ' + carouselItemTemplate).slice(1);
        newCarouselItem = newCarouselItem.replace("{{name}}", users[i].user_firstname + " " + users[i].user_lastname)
            .replace("{{description}}", users[i].user_about);
        $(".flex-wrapper").append(newCarouselItem);
        $("." + users[i].user_id).removeClass("user-card-wrapper-display-none");
        $('#carousel-item-template').attr('id', "template-id-" + users[i].user_id).removeClass("user-card-wrapper-display-none");
    }

    // Match user
    $(".user-buttons #matchItem").on('click', function () {
        var templateId = $(this).parent().parent().parent().attr('id');
        var idArr = templateId.split('-');
        var answer = confirm("Wilt u gebruiker " + users[idArr[2] - 51].user_firstname + " " + users[idArr[2] - 51].user_lastname + " matchen?"); // 51 is hardcoded to get first user fixing this later

        if (answer) {
            // Get last element from array - 50 to return id usable for collecting new user from users array
            var lastEl = userInArray.slice(-1)[0] - 50;
            // Push the user id in userInArray
            userInArray.push(users[lastEl].user_id);

            // Remove user from page
            $("#template-id-" + idArr[2]).fadeOut("slow");

            // Add new carousel with data from users array
            newCarouselItem = (' ' + carouselItemTemplate).slice(1);
            newCarouselItem = newCarouselItem.replace("{{name}}", users[lastEl].user_firstname + " " + users[lastEl].user_lastname)
                .replace("{{description}}", users[lastEl].user_about);
            $(".flex-wrapper").append(newCarouselItem);
            $("." + users[lastEl].user_id).removeClass("user-card-wrapper-display-none");
            $('#carousel-item-template').attr('id', "template-id-" + users[lastEl].user_id).removeClass("user-card-wrapper-display-none");

            // // Create match
            // var query = "INSERT INTO liked (user_user_id_has_liked, user_user_id_liked, like_created_at) values(" + userId + ", " + idArr[2] + ", NOW());"
            // $.get("/db", {query: query}).done(function (data) {
            //     alert("Matched");
            // });

        }
    });

    // Ignore user
    $(".user-buttons #removeItem").on('click', function () {
        var templateId = $(this).parent().parent().parent().attr('id');
        var idArr = templateId.split('-'); // idArr[2] returns the id of selected user
        var answer = confirm("Wilt u gebruiker " + users[idArr[2] - 51].user_firstname + " " + users[idArr[2] - 51].user_lastname + " negeren?"); // 51 is hardcoded to get first user fixing this later

        if (answer) {
            // Get last element from array - 50 to return id usable for collecting new user from users array
            var lastEl = userInArray.slice(-1)[0] - 50;
            // Push the user id in userInArray
            userInArray.push(users[lastEl].user_id);

            // Remove user from page
            $("#template-id-" + idArr[2]).fadeOut("slow");

            // Add new carousel with data from users array
            newCarouselItem = (' ' + carouselItemTemplate).slice(1);
            newCarouselItem = newCarouselItem.replace("{{name}}", users[lastEl].user_firstname + " " + users[lastEl].user_lastname)
                .replace("{{description}}", users[lastEl].user_about);
            $(".flex-wrapper").append(newCarouselItem);
            $("." + users[lastEl].user_id).removeClass("user-card-wrapper-display-none");
            $('#carousel-item-template').attr('id', "template-id-" + users[lastEl].user_id).removeClass("user-card-wrapper-display-none");
        }
    });

    // Title
    $("#preface-title").replace("{{title}}", title);

    // Text
    $("#preface-text-area").replace("{{content}}", text);

});

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        $.get("/db", {query: "SELECT * FROM fys_is106_1.user"}).done(function (data) {
            resolve(data);
        });
    });
}

function getIndexTextTitle() {
    return new Promise(resolve => {
        $.get("/db", {query: "SELECT * FROM fys_is106.content WHERE content_location = 'index_title'"}).done(function (data) {
            resolve(data);
        })
    });
}

function getIndexTextContent() {
    return new Promise(resolve => {
        $.get("/db", {query: "SELECT * FROM fys_is106.content WHERE content_location = 'index_text'"}).done(function (data) {
            resolve(data);
        })
    });
}

$('#preface-edit').on('click', function () {
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