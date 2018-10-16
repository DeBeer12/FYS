String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var users = [
    {
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
    },{
        id: "5",
        name: "Piet Biet",
        description: "Biertje"
    },{
        id: "6",
        name: "Jap Pap",
        description: "Neeeeee"
    }];

console.log("Ayuu");

$(document).ready(function () {

    console.log("to");

    var carouselItemTemplate = $('div#carousel-item-template').html();

    for (var i = 0; i < 3; i++) {
        console.log(i);
        newCarouselItem = (' ' + carouselItemTemplate).slice(1);
        newCarouselItem.replaceAll("id='carousel-item-template'", "id='"+users[i].id+"'");
        newCarouselItem.replaceAll("{{name}}", users[i].name);
        newCarouselItem.replaceAll("{{description}}", users[i].description);
        $(".flex-wrapper").append(newCarouselItem);
        $(users[i].id)[0].removeClass("user-card-wrapper-display-none")

    }

});