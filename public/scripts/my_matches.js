// String replace function for all ocurances in string.prototype
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var includedMatches = [];
var users;
var interests;

$(document).ready(function () {
    $("#filter_name").focus(function () {
        $(this).data("hasfocus", true);
    });

    $("#filter_name").blur(function () {
        $(this).data("hasfocus", false);
    });

    $(document.body).keyup(function (ev) {
        // 13 is ENTER
        if (ev.which === 13 && $("#filter_name").data("hasfocus")) {
            filterMatches();
        }
    });

    getUsers(function (data) {
        users = data;
        // interests = getinterests();
        
        console.log(users)
        // $.each(users, function (key, value) {
        //     includedMatches.push(value.id)
        // })
        
        // printMatches(users);
        // printinterestFilters(interests);
    });

});

function getUsers(callback) {
    $.get("/db", {query: "SELECT * FROM fys_is106_1.user"}).done(function (data) {
        callback(data);
    });
}

var getinterests = function () {
    var interests = [];

    $.each(users, function (k, v) {
        $.each(v.interests, function (k, v) {
            if (!interests.includes(v)) {
                interests.push(v);
            }
        })
    })
    return interests.sort();
}

var deleteMatch = function (elemId) {
    var answer = confirm("Wilt u Match " + elemId + " echt verwijderen?")
    if (answer) {
        $("#match_" + elemId).remove();
    } else {
        return;
    }
}

var formatDate = function (date) {
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
var checkinterests = function (userinterests, checkedBoxValues) {
    var check = false;
    $.each(checkedBoxValues, function (k, v) {
        if (userinterests.includes(v)) {
            check = true;
            return false;
        }
    });
    return check;
}

var filterMatches = function () {
    var nameFilterContainer = $('#filter_name');
    var nameFilter = nameFilterContainer.val();

    var ageFilterContainer = $('#filter_age');
    var ageFilter = ageFilterContainer.val();

    var checkedBoxes = $('.match_filter_interests input[type=checkbox]:checked');
    var checkedBoxValues = [];

    $.each(checkedBoxes, function (k, v) {
        checkedBoxValues.push($(v).val());
    });

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

var resetMatches = function () {
    printMatches(users);
}

/**
 * Print matches based on userArray
 * @param {Array} userArray array with users
 */
var printMatches = function (userArray) {
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

var printinterestFilters = function (interestArray) {
    var interest_template = $('input#interest_template').parent().parent().html();

    // Show insert match template 10 times in container
    for (var i = 0; i < interestArray.length; i++) {
        new_interest_item = (' ' + interest_template).slice(1);
        new_interest_item = new_interest_item.replaceAll("{{interest}}", interestArray[i])
            .replace("id=\"interest_template\"", "id=\"interest_" + interestArray[i] + "\"");
        $('.match_filter_interests ul').append(new_interest_item);
    }
};