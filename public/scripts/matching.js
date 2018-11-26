$(".js-more-info-toggle").click(function () {

    $(".js-more-info").slideToggle(300);

});

function fixHeight(){

    $(".js-overflow").css("max-height" , ($(".match-swiper-wrapper.js-active").height() + 350) + "px");

}

function nextPerson(like){

    let $newElement =  $(".match-swiper-wrapper:not(.js-active):not(.js-old)").first();
    let $oldElement = $(".match-swiper-wrapper.js-active");


    $newElement.addClass("js-active");
    $oldElement.addClass("js-old");
    $oldElement.removeClass("js-active");

    if (like === true){
        $oldElement.css("background-color" , "rgba(0,150,0,0.5)");
        $oldElement.css("transform" , "scale(3) rotate(-90deg)");
    }
    else{
        $oldElement.css("background-color" , "rgba(150,0,0,0.5)");
        $oldElement.css("transform" , "scale(0.01) rotate(-90deg)");
    }

    fixHeight();
}

$(".js-like").click(function () {
    nextPerson(true);
});

$(".js-dislike").click(function () {
   nextPerson(false);
});

$( document ).ready(function () {
    fixHeight();
});