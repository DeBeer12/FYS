$(document).ready(function () {

    let query = "SELECT * FROM fys_is106_1.content";

    $.get( "/db", {query:query}).done(function( data ) {

        $("*").each(function () {
            if($(this).data("content")){

                let $currentElement = $(this);
                let contentName = $currentElement.data("content");

                console.log(contentName);
                console.log(data);
                for (let i = 0; i !== data.length; i++){
                    if (data[i]["content_name"] === contentName){
                        $currentElement.html(data[i]["content_text"]);
                    }
                }
            }
        });
    });
});