// Custom string replace function for all ocurances in string.prototype
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// Global variables
var users = [];
var interests = [];

$(document).ready(async function() {
    // add focus property to filter_name input
    $("#filter_name").focus(function() {
        $(this).data("hasfocus", true);
    });
    $("#filter_name").blur(function() {
        $(this).data("hasfocus", false);
    });

    // Filter matches on enter in name input
    $(document.body).keyup(function(ev) {
        // 13 is ENTER
        if (ev.which === 13 && $("#filter_name").data("hasfocus")) {
            filterMatches();
        }
    });

    // Get your matches from the database
    getUsers(async function(users) {
        // For every match get their interests from the database
        for (var i = 0; i < users.length; i++) {
            users[i]["interests"] = await resolveAfter2Seconds(users[i]);
        }
        // Generate matches on front-end
        printMatches(users);
    });

    // Get all interests from the database for interest filter
    getinterests(function(interests) {
        console.log(interests)
            //Print interest filter
        printinterestFilters(interests);
    });
});

/**
 * Get users that are matched with logged in user 
 * @param {function} callback 
 */
function getUsers(callback) {
    $.get("/db", {
        query: "SELECT * FROM liked AS l LEFT JOIN user ON l.user_user_id_has_liked = user.user_id WHERE l.user_user_id_liked = " + $user.user_id + " AND l.like_deleted = 0"
    }).done(function(data) {
        callback(data);
    });
}

/**
 * Get the users interests from the database
 * @param {Object} user 
 */
function resolveAfter2Seconds(user) {
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT interest_name FROM user_has_interest INNER JOIN interest ON interest_id = user_has_interest.interest_interest_id WHERE user_has_interest.user_user_id =  " + user.user_id }).done(function(data) {
            // let newUser = user["interests"] = data;
            resolve(data);
        });
    });
}

/**
 * Get all interests from the database
 * @param {function} callback 
 */
var getinterests = function(callback) {
    var allInterests = [];
    var query = "SELECT interest_name FROM interest;"
    $.get("/db", {
        query: query
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            allInterests.push(data[i].interest_name)
        }
        callback(allInterests)
    });
}

/**
 * Remove match
 * @param {Integer} elemId 
 */
var deleteMatch = function(elemId) {
    var answer = confirm("Wilt u Match " + elemId + " echt verwijderen?")
    if (answer) {
        $.get("/db", { query: "UPDATE liked SET like_deleted = 1 WHERE user_user_id_has_liked = " + elemId }).done(function(data) {
            $("#match_" + elemId).remove();
        });
    } else {
        return;
    }
}

/**
 * Calculate when users where matched 
 * @param {Date} date 
 * @returns String based on how long ago users where matched
 */
var formatDate = function(date) {
    var newDate = new Date(date)
    var timeDiff = Math.abs(new Date().getTime() - newDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var diffWeeks = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 7);

    if (diffDays < 20) {
        return (diffDays) + " dagen geleden gematched";
    } else {
        return (diffWeeks) + " weken geleden gematched";
    }
}

/**
 * Calculates the age based on birthday
 * @param {String} birthday 
 */
function calculateAge(birthday) {
    birthdayDate = new Date(birthday);
    var ageDifMs = Date.now() - birthdayDate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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

/**
 * Filter matches based on user inputs
 */
var filterMatches = function() {
    var nameFilterContainer = $('#filter_name');
    var nameFilter = nameFilterContainer.val();

    var ageFilterContainer = $('#filter_age');
    var ageFilter = ageFilterContainer.val();

    var checkedBoxes = $('.match_filter_interests input[type=checkbox]:checked');
    var checkedBoxValues = [];

    // Put all values from checked checkboxes in an array
    $.each(checkedBoxes, function(k, v) {
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
    // Print filtered matches
    printMatches(filteredUsers);
}

// Reset filter
var resetMatches = function() {
    printMatches(users);
}

/**
 * Print matches based on userArray
 * @param {Array} userArray array with users
 */
async function printMatches(userArray) {
    var match_template = $('div#match_template').parent().html();
    $("#match_container").empty();

    // Replace template strings with match info
    for (var i = 0; i < userArray.length; i++) {
        new_match_item = (' ' + match_template).slice(1);
        new_match_item = new_match_item.replace("{{name}}", userArray[i].user_firstname + " " + userArray[i].user_lastname)
            // .replace("src=\"images/img_avatar.png\"", "src=\"images/" + userArray[i].img + "\"")
            .replace("{{age}}", calculateAge(userArray[i].user_birthday) + " Jaar oud")
            .replace("{{connected_date}}", formatDate(userArray[i].like_created_at))
            .replace("{{interest1}}", userArray[i].interests.length > 0 ? userArray[i].interests[0].interest_name : "geen")
            .replace("{{interest2}}", userArray[i].interests.length > 0 ? userArray[i].interests[1].interest_name : "")
            .replace("id=\"match_template\"", "id=\"match_" + userArray[i].user_id + "\"")
            .replaceAll("'{{id}}'", userArray[i].user_id);
        $('#match_container').append(new_match_item);
        $("div#match_" + userArray[i].user_id).removeClass("match_template");
    }
};

/**
 * Print interests based on given array
 * @param {Array} interestArray 
 */
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