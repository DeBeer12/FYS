// Custom string replace function for all ocurances in string.prototype
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// Global variables
var globalUsers = [];
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
            filterMatches(globalUsers);
        }
    });

    $("#filter_submit").click(function() {
        filterMatches(globalUsers);
    });
    $("#filter_reset").click(function() {
        $("#match_container").empty();
        $.each(globalUsers, function(key, user){
            // Print matches
            printMatch(user);
        });
        $('#filter_name').val("");
        $('#filter_age').val("");
        $('.match_filter_interests input[type=checkbox]:checked').prop("checked", false);
    });

    // Get your matches from the database
    getUsers(async function(users) {
        $("#match_container").empty();
        // For every match get their interests from the database
        for (var i = 0; i < users.length; i++) {
            users[i]["interests"] = await getUserInterests(users[i]);
            users[i]["messageCount"] = await getUnreadPrivateMessagesCount(users[i].user_id);
            printMatch(users[i]);

        }
        // Add all matches to global variable
        globalUsers = users;
        // Generate matches on front-end
    });

    // Get all interests from the database for interest filter
    getinterests(function(interests) {
        //Print interest filter
        printinterestFilters(interests);
    });
});

/**
 * Removes duplicates in object arrays based on given property
 * @param {Object Array} Array Array with duplicates
 * @param {String} prop Property to check for duplicaties
 */
function removeDuplicates(Array, prop) {
    return Array.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

/**
 * Get users that are matched with logged in user 
 * @param {function} callback 
 */
function getUsers(callback) {
    $.get("/db", {
        query: "SELECT user_id, user_name, user_firstname, user_lastname, user_birthday, user_user_id_liked, user_user_id_has_liked, like_created_at, like_deleted FROM liked INNER JOIN user ON liked.user_user_id_has_liked = user.user_id WHERE user_user_id_liked = " + $user.user_id + " AND EXISTS (SELECT user_user_id_has_liked from liked where user_user_id_has_liked = " + $user.user_id + ") AND like_deleted = 0"
    }).done(function(data) {
        callback(data);
    });
}

/**
 * Get the users interests from the database
 * @param {Object} user 
 */
function getUserInterests(user) {
    var userInterests = [];
    return new Promise(resolve => {
        $.get("/db", { query: "SELECT interest_name FROM user_has_interest INNER JOIN interest ON interest_id = user_has_interest.interest_interest_id WHERE user_has_interest.user_user_id =  " + user.user_id }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                userInterests.push(data[i].interest_name)
            }
            resolve(userInterests);
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
        $.get("/db", { query: "UPDATE liked SET like_deleted = 1 WHERE user_user_id_liked = " + $user.user_id + " AND user_user_id_has_liked = " + elemId }).done(function(data) {
            $("#match_" + elemId).remove();
        });
        $.get("/db", { query: "UPDATE liked SET like_deleted = 1 WHERE user_user_id_liked = " + elemId + " AND user_user_id_has_liked = " + $user.user_id }).done(function(data) {
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
 * get all unread messages based on userid
 * @param {int} userId
 */
function getUnreadPrivateMessagesCount(userId, callback) {
    var unreadMessagesCountQuerry = "Select count(message_id) AS count FROM message WHERE message_to = " + $user.user_id + " AND message_from = " + userId + " AND message_read = false";
    return new Promise(resolve => {
        $.get("/db", { query: unreadMessagesCountQuerry }).done(function(data) {
            var messageCount = data[0].count;
            resolve(messageCount);
        });
    });
}

/**
 * Filter matches based on user inputs
 */
var filterMatches = function(users) {
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
        ((nameFilter != '') ? user.user_name.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
        // When no age is entered return true to skip this condition
        // else compare the users age to the entered age
        ((ageFilter != '') ? calculateAge(user.user_birthday) == ageFilter : true) &&
        // When checkedBoxValues array is empty return true to skip this condition 
        // else check if user interests contains filter input 
        ((checkedBoxValues.length > 0) ? checkinterests(user.interests, checkedBoxValues) : true)

    );
    $("#match_container").empty();
    $.each(filteredUsers, function(key, user){
        // Print filtered matches
        printMatch(user);
    })
}

/**
 * Print match based on user object data
 * @param {Object} user Object with user data
 */
async function printMatch(user) {
    var match_template = $('div#match_template').parent().html();

    // Replace template strings with match info
    // for (var i = 0; i < user.length; i++) {
        new_match_item = (' ' + match_template).slice(1);
        new_match_item = new_match_item.replace("{{name}}", user.user_firstname + " " + user.user_lastname)
            // .replace("src=\"images/img_avatar.png\"", "src=\"images/" + user.img + "\"")
            .replace("{{age}}", calculateAge(user.user_birthday) + " Jaar oud")
            .replace("{{connected_date}}", formatDate(user.like_created_at))
            .replace("{{interest1}}", user.interests.length > 0 ? user.interests[0] : "geen")
            .replace("{{interest2}}", user.interests.length > 1 ? user.interests[1] : "")
            .replace("id=\"match_template\"", "id=\"match_" + user.user_id + "\"")
            .replace("\"chat.html?id={{id}}\"", "\"chat.html?id=" + user.user_id + "\"")
            .replace("\"profile.html?id={{id}}\"", "\"profile.html?id=" + user.user_id + "\"")
            .replace("{{MESSAGE_COUNT_MATCH}}", user.messageCount ? user.messageCount : 0)
            .replaceAll("'{{id}}'", user.user_id);
        $('#match_container').append(new_match_item);
        $("div#match_" + user.user_id).removeClass("match_template");
    // }
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