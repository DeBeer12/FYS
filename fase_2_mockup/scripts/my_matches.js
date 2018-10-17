// String replace function for all ocurances in string.prototype
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var users = [{
    id: "1",
    age: 18,
    name: "Gebruiker 1",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Malibu", "Oslo"],
}, {
    id: "2",
    age: 18,
    name: "Gebruiker 2",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Bath", "Parijs"],
}, {
    id: "3",
    age: 18,
    name: "Gebruiker 3",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Barcelona", "Dubrovnik"],
}, {
    id: "4",
    age: 18,
    name: "Gebruiker 4",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Cuzco", "Luxor"],
}, {
    id: "5",
    age: 18,
    name: "Gebruiker 5",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Rome", "Florence"],
}, {
    id: "6",
    age: 18,
    name: "Gebruiker 6",
    description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
    connected_date: new Date("6/6/2018"),
    vacations: ["Rome", "Florence"],
}, ];

// console.log(users, $('div#match_template').parent().html())
// Template for match
// var match_template = '<div id="match{{id}}" class="match"> ' +
//     '<div class="match_picture"> ' +
//     '<img src="images/img_avatar.png" alt="Match Picture"> </div>' +
//     '<div class="match_info"> ' +
//     '<p class="match_name">John Doe</p>' +
//     '<p class="match_age">21 Jaar</p>' +
//     '<p class="match_date">1 week geleden gematched</p>' +
//     '</div>' +
//     '<div class="match_tags_container"> ' +
//     '<ul class="match_tags"> Vakanties gepland: ' +
//     '<li class="match_tag">Lorem ipsum</li>' +
//     '<li class="match_tag">Lorem ipsum</li>' +
//     '</ul> ' +
//     '</div>' +
//     '<div class="match_icons"> ' +
//     '<a href="chat.html" title="Chat with match {{id}}">' +
//     '<i id="chat_with_match" class="fas fa-2x fa-comments">' +
//     '</i>' +
//     '</a> ' +
//     '<i id="delete_match" onclick="deleteMatch({{id}})" class="fas fa-2x fa-trash"></i> ' +
//     '</div></div>'

$(document).ready(function () {
    var match_template = $('div#match_template').parent().html();
    // Show insert match template 10 times in container
    for (var i = 0; i < users.length; i++) {
        // console.log(i)
        new_match_item = (' ' + match_template).slice(1);
        new_match_item = new_match_item.replace("{{name}}", users[i].name)
            .replace("{{age}}", users[i].age + " Jaar")
            .replace("{{connected_date}}", format_date(users[i].connected_date))
            .replace("{{vacation1}}", users[i].vacations[0])
            .replace("{{vacation2}}", users[i].vacations[1])
            .replace("id=\"match_template\"", "id=\"match_" + users[i].id + "\"")
            .replaceAll("'{{id}}'", users[i].id);
        // console.log(new_match_item);
        $('#match_container').append(new_match_item);

        $("div#match_" + users[i].id).removeClass("match_template");
        // $('#carousel-item-template')
        //     .attr('id', "template-id-" + users[i].id)
        //     .removeClass("user-card-wrapper-display-none");
    }
});

var deleteMatch = function (elemId) {
    var answer = confirm("Wilt u Match " + elemId + " echt verwijderen?")
    if (answer) {
        $("#match_" + elemId).remove();
    } else {
        return;
    }
}

var format_date = function (date) {
    var timeDiff = Math.abs(new Date().getTime() - date.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // console.log(diffDays)
    return (diffDays) + " Dagen geleden gematched";
}