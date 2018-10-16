String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var users = [{
    id: "1",
    name: "Jhon Doe",
    description: "Groetjes"
}, {
    id: "2",
    name: "Loekie Yoekie",
    description: "Yo"
}, {
    id: "3",
    name: "Klaas Vaak",
    description: "Gaatie maat"
}, {
    id: "4",
    name: "Joost Proost",
    description: "Biertje"
}, {
    id: "5",
    name: "Piet Biet",
    description: "Biertje"
}, {
    id: "6",
    name: "Jap Pap",
    description: "Neeeeee"
}];


$(document).ready(function () {
    var carouselItemTemplate = $('div#carousel-item-template').parent().html();

    for (var i = 0; i < 3; i++) {
        newCarouselItem = (' ' + carouselItemTemplate).slice(1);
        newCarouselItem = newCarouselItem.replace("{{name}}", users[i].name)
            .replace("{{description}}", users[i].description);
        $(".flex-wrapper").append(newCarouselItem);
        $("." + users[i].id).removeClass("user-card-wrapper-display-none")
        console.log($("." + users[i].id));
        console.log($('div#carousel-item-template').prev());
    }

});