String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


$(document).ready(function () {

    $.get( "/db", {query:"SELECT * FROM fys_is106_1.user WHERE user.user_firstname = 'Florida';"}).done(function( data ) {
        console.log(data);
    });

    var carouselItemTemplate = $('div#carousel-item-template').parent().html();

    $('div#carousel-item-template').parent().empty();

    for (var i = 0; i <= 2; i++) {
        newCarouselItem = (' ' + carouselItemTemplate).slice(1);
        newCarouselItem = newCarouselItem.replace("{{name}}", users[i].name)
            .replace("{{description}}", users[i].description);
        $(".flex-wrapper").append(newCarouselItem);
        $("." + users[i].id).removeClass("user-card-wrapper-display-none");
        $('#carousel-item-template').attr('id', "template-id-" + users[i].id).removeClass("user-card-wrapper-display-none");

        $("#template-id-" + i + " .user-text-container .user-buttons #removeItem").on('click', function() {
            var templateId = $(this).parent().parent().parent().attr('id');
            var idArr = templateId.split('-');

            var answer = confirm("Wilt u gebruiker " + users[idArr[2] - 1].name + " negeren?");
            if (answer) {
                $("#template-id-" + idArr[2]).remove();
            }
        });

        $("#template-id-" + i + " .user-text-container .user-buttons #matchItem").on('click', function() {
            var templateId = $(this).parent().parent().parent().attr('id');
            var idArr = templateId.split('-');

            var answer = confirm("Wilt u met " + users[idArr[2] - 1].name + " matchen?");
            if (answer) {
                $("#template-id-" + idArr[2]).remove();
            }
        });
    }

});

$('#preface-edit').on('click', function() {
    $('#preface-title').replaceWith("<h2 id='preface-title-edit-1'>Titel:</h2> <input type='text' id='preface-title-edit-2'><br>");
    $('#preface-text-area').replaceWith("<p id='preface-text-area-edit-1'>Info:</p> <textarea rows='7' cols='65' id='preface-text-area-edit-2'></textarea><br>");
    $('#preface-save').append('<i class="far fa-save fa-2x pointer" id="preface-save-icon"></i>');

    $('#preface-edit').hide();
});

$('#preface-save').on('click', function() {
    $('#preface-title-edit-2').replaceWith("<h1 id='preface-title'>" + $('#preface-title-edit-2').val() + "</h1>");
    $('#preface-text-area-edit-2').replaceWith("<p id='preface-text-area'>" + $('#preface-text-area-edit-2').val() + "</p>");

    $('#preface-title-edit-1').remove();
    $('#preface-text-area-edit-1').remove();

    $('#preface-save-icon').remove();
    $('#preface-edit').show();

});