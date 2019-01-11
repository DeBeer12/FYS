var userId;
var likeAbleUsers;
var currentIndex = 0;
var amountOfLikableUsers = 0;



function checkUserInit() {
    if ($user != null) {
        userId = $user.user_id;
        likeAbleUsers = getAllUsers(userId);
    }
}

setTimeout(checkUserInit, 100);


/**
 * Dom manipulation to fix height for overflow
 */
function fixHeight(){
    $(".js-overflow").css("max-height" , ($(".match-swiper-wrapper.js-active:not(.js-example)").height() + 350) + "px");
    $(".js-overflow").css("min-height" , ($(".match-swiper-wrapper.js-active:not(.js-example)").height() + 350) + "px");
}

/**Function to trigger animation if liked or not
 * @param boolean - like if the user chose to like whether or not
 */
function nextPerson(like){
    let $newElement =  $(".match-swiper-wrapper:not(.js-active):not(.js-old):not(.js-example)").first();
    let $oldElement = $(".match-swiper-wrapper.js-active:not(.js-example)");

    let likedUserId = $oldElement.data("user-id");


    $newElement.addClass("js-active");
    $oldElement.addClass("js-old");
    $oldElement.removeClass("js-active");



    if (like === true){

        var query = "INSERT INTO liked (user_user_id_has_liked, user_user_id_liked, like_created_at) values("+userId+", "+likedUserId+", NOW());"

        $.get( "/db", {query:query}).done(function( data ) {

            $oldElement.css("background-color" , "rgba(0,150,0,0.5)");
            $oldElement.css("transform" , "scale(3) rotate(-90deg)");
        });
    }
    else{
        $oldElement.css("background-color" , "rgba(150,0,0,0.5)");
        $oldElement.css("transform" , "scale(0.01) rotate(-90deg)");
    }

    removeLastWrapper();
    addWraperFromIndex();


    fixHeight();
}

/**
 * Function that returns a bool if there's a match or not
 * @param likedId
 */
function isMatch(likedId) {

    var query = "SELECT EXISTS("+
        "SELECT * FROM liked "+
        "where user_user_id_liked = "+likedId+" and user_user_id_has_liked = " + userId +
        ") as `isMatch`";

    console.log(query);

    $.get( "/db", {query:query}).done(function( data ) {

        console.log("hiero!" + data);

    });



}

/**
 * Creates all needed click events for the dom
 */
function createClickEvents(){

    $( "*").unbind( "click" );

    /**
     * Click event for liking
     */
    $(".js-like").click(function () {
        nextPerson(true);
    });

    /**
     * Click event for disliking
     */
    $(".js-dislike").click(function () {
        nextPerson(false);
    });

    $(".js-more-info-toggle").click(function () {
        $(".js-more-info").slideToggle(300);
    });

    $(".match-message-wrapper .next-btn ").click(function () {
        $(".match-message-wrapper").addClass("--hidden");
    });
}

/**
 * Fills the JSON file with all the matches for the current user
 * @param currentUserId current user id
 */
function getAllUsers(currentUserId){

    var query = "SELECT * " +
        "FROM user " +
        "WHERE user_id NOT IN( " +
        "SELECT user_user_id_liked " +
        "FROM liked " +
        "WHERE user_user_id_has_liked = " + currentUserId +
        ") " +
        "AND NOT user_id = " + currentUserId;

    console.log(query);

    $.get( "/db", {query:query}).done(function( data ) {

        console.log(data);
        amountOfLikableUsers = Object.keys(data).length;
        likeAbleUsers = data;
        initWrappers();
        createClickEvents();
    });



}

/**
 * Adss the 4 first wrappers to start the "liking" process
 */
function initWrappers(){

    for (currentIndex; currentIndex < 4; currentIndex++){

        if (currentIndex === 0){
            addWrapper(
                likeAbleUsers[currentIndex]["user_id"],
                likeAbleUsers[currentIndex]["user_firstname"] + " " + likeAbleUsers[currentIndex]["user_lastname"],
                "U heeft 70% gedeelde intresses",
                likeAbleUsers[currentIndex]["user_about"],
                "js-active"
            );
        }
        else{
            addWraperFromIndex();
        }
    }
}

/**
 * Add the very next wrapper from the JSON
 */
function addWraperFromIndex() {
    addWrapper(
        likeAbleUsers[currentIndex]["user_id"],
        likeAbleUsers[currentIndex]["user_firstname"] + " " + likeAbleUsers[currentIndex]["user_lastname"],
        "U heeft 70% gedeelde intresses",
        likeAbleUsers[currentIndex]["user_about"]
    );
    currentIndex++;
    createClickEvents();
}

/**
 * Function that adds a match wrapper
 * @param name name of the person
 * @param subText subtext of the person
 * @param bigText more infromation of the person
 * @param extraClass able to add extra class(es) to the element (main purpose for active class)
 */
function addWrapper(id, name, subText, bigText, extraClass){
    $exampleWrapper = $(".js-example").first();
    $clone = $exampleWrapper.clone();
    $clone.removeClass("js-example");
    $clone.addClass(extraClass);
    $clone.attr("data-user-id" , id);
    $clone.css("display", "block");
    $clone.find(".js-name").html(name);

    let profileUrl = "https://randomuser.me/api/portraits/med/men/"+id+".jpg";
    $clone.find(".profile-picture").css("background-image", "url("+profileUrl+")");
    $clone.find(".js-sub-text").html(subText);
    if (bigText === "" || bigText === null){
        $clone.find(".js-big-text").html("Geen extra infromatie :(");
    }
    else{
        $clone.find(".js-big-text").html(bigText);
    }

    $clone.appendTo(".js-matches-wrapper");
}

/**
 * Function that removes the last match wrapper from the dom
 */
function removeLastWrapper(){
    $elementToDelete = $(".match-swiper-wrapper.js-old:not(.js-example)");
    if ($elementToDelete.length > 1){
        $elementToDelete[0].remove();
    }
}

/**
 * Function that shows match message
 *
 * @param name name of the person who has a macht with current userId
 * @param profileUrl url of the person who has a macht with current userId
 */
function showMatchMessage(name, profileUrl){

    let $wrapper = $(".match-message-wrapper");
    $wrapper.removeClass("--hidden");
    $wrapper.find(".first-message .name").html(name);
    $wrapper.find(".image").css("background-image" , "url('https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg'")

}


$( document ).ready(function () {
    fixHeight();
});