// String replace function for all ocurances in string.prototype
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var includedMatches = [];

$(document).ready(function() {
    $("#filter_name").focus(function() {
        $(this).data("hasfocus", true);
    });

    $("#filter_name").blur(function() {
        $(this).data("hasfocus", false);
    });

    $(document.body).keyup(function(ev) {
        // 13 is ENTER
        if (ev.which === 13 && $("#filter_name").data("hasfocus")) {
            filterMatches();
        }
    });
    var interests = getinterests();
    var users = getUsers();
    $.each(users, function(key, value) {
        includedMatches.push(value.id)
    })

    printMatches(users);
    printinterestFilters(interests);
});

function getUsers() {
    return users = [{
        id: 1,
        age: 18,
        name: "Raguel Romberg",
        img: "insteek.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("10/10/2018"),
        interests: ["Malibu", "Oslo"],
    }, {
        id: 2,
        age: 21,
        name: "Esteban Enderle",
        img: "temp_slider_1.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Bath", "Parijs"],
    }, {
        id: 3,
        age: 31,
        name: "Le Leiser",
        img: "airplaine.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Barcelona", "Dubrovnik"],
    }, {
        id: 4,
        age: 24,
        name: "Dominic Decamp",
        img: "temp_slider_2.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Cuzco", "Luxor"],
    }, {
        id: 5,
        age: 21,
        name: "Connie Coats",
        img: "temp_slider_3.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Rome", "Florence"],
    }, {
        id: 6,
        age: 66,
        name: "Glory Gingras",
        img: "img_avatar.png",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Rome", "Florence"],
    }, {
        id: 7,
        age: 18,
        name: "Mary Monroe",
        img: "insteek.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("10/10/2018"),
        interests: ["Malibu", "Oslo"],
    }, {
        id: 8,
        age: 21,
        name: "Kimberly Bullock",
        img: "temp_slider_1.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Bath", "Parijs"],
    }, {
        id: 9,
        age: 31,
        name: "Elizabeth Traynor",
        img: "airplaine.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Barcelona", "Dubrovnik"],
    }, {
        id: 10,
        age: 24,
        name: "Patricia Chamberlain",
        img: "temp_slider_2.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Cuzco", "Luxor"],
    }, {
        id: 11,
        age: 21,
        name: "Joseph Garcia",
        img: "temp_slider_3.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Rome", "Florence"],
    }, {
        id: 12,
        age: 44,
        name: "Jack Williams",
        img: "insteek.jpg",
        description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed.",
        connected_date: new Date("6/6/2018"),
        interests: ["Rome", "Florence"],
    }];
}

var getinterests = function() {
    var users = getUsers();
    var interests = [];

    $.each(users, function(k, v) {
        $.each(v.interests, function(k, v) {
            if (!interests.includes(v)) {
                interests.push(v);
            }
        })
    })
    return interests.sort();
}

var deleteMatch = function(elemId) {
    var answer = confirm("Wilt u Match " + elemId + " echt verwijderen?")
    if (answer) {
        $("#match_" + elemId).remove();
    } else {
        return;
    }
}

var formatDate = function(date) {
    var timeDiff = Math.abs(new Date().getTime() - date.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var diffWeeks = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 7);

    if (diffDays < 20) {
        return (diffDays) + " dagen geleden gematched";
    } else {
        return (diffWeeks) + " weken geleden gematched";
    }
}

/**
 * check if userinterests array contains any values in checkedBoxValues array
 * @param {Array} userinterests
 * @param {Array} checkedBoxValues
 */
var checkinterests = function(userinterests, checkedBoxValues) {
    var check = false;
    $.each(checkedBoxValues, function(k, v) {
        if (userinterests.includes(v)) {
            check = true;
            return false;
        }
    });
    return check;
}

var filterMatches = function() {
    var nameFilterContainer = $('#filter_name');
    var nameFilter = nameFilterContainer.val();

    var ageFilterContainer = $('#filter_age');
    var ageFilter = ageFilterContainer.val();

    var checkedBoxes = $('.match_filter_interests input[type=checkbox]:checked');
    var checkedBoxValues = [];

    $.each(checkedBoxes, function(k, v) {
        checkedBoxValues.push($(v).val());
    });

    var users = getUsers();
    var filteredUsers = users.filter(
        user =>
        // When no name is entered return true to skip this condition   
        // else compare the users name to the entered name
        ((nameFilter != '') ? user.name.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
        // When no age is entered return true to skip this condition
        // else compare the users age to the entered age
        ((ageFilter != '') ? user.age == ageFilter : true) &&
        // When checkedBoxValues array is empty return true to skip this condition 
        // else check if user interests contains filter input 
        ((checkedBoxValues.length > 0) ? checkinterests(user.interests, checkedBoxValues) : true)

    );

    printMatches(filteredUsers);
}

var resetMatches = function() {
    var users = getUsers();
    printMatches(users);
}

/**
 * Print matches based on userArray
 * @param {Array} userArray array with users
 */
var printMatches = function(userArray) {
    var match_template = $('div#match_template').parent().html();
    $("#match_container").empty();

    for (var i = 0; i < userArray.length; i++) {
        new_match_item = (' ' + match_template).slice(1);
        new_match_item = new_match_item.replace("{{name}}", userArray[i].name)
            .replace("src=\"images/img_avatar.png\"", "src=\"images/" + userArray[i].img + "\"")
            .replace("{{age}}", userArray[i].age + " Jaar")
            .replace("{{connected_date}}", formatDate(userArray[i].connected_date))
            .replace("{{interest1}}", userArray[i].interests[0])
            .replace("{{interest2}}", userArray[i].interests[1])
            .replace("id=\"match_template\"", "id=\"match_" + userArray[i].id + "\"")
            .replaceAll("'{{id}}'", userArray[i].id);
        $('#match_container').append(new_match_item);
        $("div#match_" + userArray[i].id).removeClass("match_template");
    }
};

var printinterestFilters = function(interestArray) {
    var interest_template = $('input#interest_template').parent().parent().html();

    // Show insert match template 10 times in container
    for (var i = 0; i < interestArray.length; i++) {
        new_interest_item = (' ' + interest_template).slice(1);
        new_interest_item = new_interest_item.replaceAll("{{interest}}", interestArray[i])
            .replace("id=\"interest_template\"", "id=\"interest_" + interestArray[i] + "\"");
        $('.match_filter_interests ul').append(new_interest_item);
    }
};