String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var users = [{
    id: "1",
    name: "User 1",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed."
}, {
    id: "2",
    name: "User 2",
    description: "Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend."
}, {
    id: "3",
    name: "User 3",
    description: "Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui, Cras ultricies mi eu turpis."
}, {
    id: "4",
    name: "User 4",
    description: "Pitcher voor weinig"
}, {
    id: "5",
    name: "User 5",
    description: "Heeft het niet"
}, {
    id: "6",
    name: "User 6",
    description: "Neeeeee"
}];


$(document).ready(function () {
    var carouselItemTemplate = $('div#carousel-item-template').parent().html();

    $('div#carousel-item-template').parent().empty();

    for (var i = 0; i <= 2; i++) {
        newCarouselItem = (' ' + carouselItemTemplate).slice(1);
        newCarouselItem = newCarouselItem.replace("{{name}}", users[i].name)
            .replace("{{description}}", users[i].description);
        $(".flex-wrapper").append(newCarouselItem);
        $("." + users[i].id).removeClass("user-card-wrapper-display-none");
        $('#carousel-item-template').attr('id', "template-id-" + users[i].id).removeClass("user-card-wrapper-display-none");

        $("#template-id-" + i + " .user-text-container .user-button #removeItem").on('click', function(){
            var answer = confirm("Wilt u gebruiker " + users[i].name + " negeren?");
            if (answer) {
                $("#template-id-" + i).remove();
            }
        });

        $("#template-id-" + i + " .user-text-container .user-button #matchItem").on('click', function(){

            var answer = confirm("Wilt u met " + users[i].name + " matchen?");
            if (answer) {
                $("#template-id-" + i).remove();
            }
        });
    }
});

// wanneer er op die knop wordt gedrukt, kijk je welk id als laatste word ingeladen met een if statement vervolgens .empty() je alles in de flex-wrapper
// en loop je door de array met een if statement die alleen door laat als het id hoger is dan de laatste id die je eerder al ophaald.