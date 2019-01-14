//Gets all the pages and adds them to the dom
function getAllPages(){
    var query = "SELECT * FROM fys_is106_1.page;";

    $.get( "/db", {query:query}).done(function( data ) {
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];

            addCMSHeader(obj.page_id, obj.page_name);
        }
        //after all
        initHeaderHopping();
        $(".js-cms-header li").first().addClass("--active");
    });
}

//Adds an CMS header item
function addCMSHeader(id, name){
    $(".js-cms-header").append("<li data-page-id=\""+id+"\" class=\"cms-header__item\">"+name+"</li>");
}

//Gets all the pages and adds them to the dom
function getAllContent(){
    var query = "SELECT * FROM fys_is106_1.content;";

    $.get( "/db", {query:query}).done(function( data ) {
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];

            addField(obj.page_id, obj.content_id, obj.content_name, obj.content_text)
        }
        createSaveClickEvents();
    });
}

//Adds an field
function addField(parentId, contentId, name, value){

    console.log(parentId + " " + name + " " + value)

    let elementToAdd = "<li data-header-parent-id=\""+parentId+"\" class=\"cms-field js-cms-field\">\n" +
        "<form class=\"js-save-form\" action=\"post\">\n" +
        "<input style=\"display: none;\" type=\"text\" name=\"content-id\" value=\""+contentId+"\">\n" +
        "<input class=\"field-name\" name=\"field-name\" type=\"text\" value=\""+name+"\">\n" +
        "<textarea class=\"field-value\" name=\"field-value\" id=\"\" cols=\"30\" rows=\"10\">"+value+"</textarea>\n" +
        "<input class=\"field-submit\" type=\"submit\" value=\"Opslaan\">\n" +
        "<input class=\"field-delete\" type=\"submit\" value=\"Verwijder\">" +
        "</form>\n" +
        "</li>";

    $(".cms-fields-wrapper").append(elementToAdd);
}

function createSaveClickEvents() {
    $(".js-save-form").submit(function (e) {
       e.preventDefault();

        let eventSender = $(this).find("input[type=submit]:focus" );
        let formData = $(this).serializeArray();

        let id = formData[0]["value"];
        let name = formData[1]["value"];
        let value = formData[2]["value"];

       if (eventSender.hasClass("field-delete")){
           let query = "DELETE FROM content WHERE content_id = "+id+";";

           $.get( "/db", {query:query}).done(function( data ) {
               location.reload();
           });
       }
       else{
           var query = "update content " +
               "set content_text = '"+value+"', " +
               "content_name = '"+name+"'" +
               "where content_id = "+id+"; ";

           $.get( "/db", {query:query}).done(function( data ) {
               alert("Opslaan geslaagd!");
           });
       }
    });
}

//Inits clickable cms header so page hopping is possible
function initHeaderHopping(){
    $(".cms-header__item").each(function () {
        $(this).click(function () {
            disableAllActivePages();
            $(this).addClass("--active");
            showPageFromId();
        });
    });
}

//Hides all pages and removes active classes from cms header
function disableAllActivePages(){
    $(".js-cms-field").each(function () {
       $(this).addClass("--hidden")
    });

    $(".cms-header__item").each(function () {
        $(this).removeClass("--active");
    });
}

//returns id of what page is currently active
function getActivePageId(){
    return $(".cms-header__item.--active").data("page-id");
}

//Shows forum page wich share the same parent Id
function showPageFromId(id){
    $(".js-cms-field").each(function(){
       let currentId = $(this).data("header-parent-id");

       if (currentId === getActivePageId()){
           $(this).removeClass("--hidden");
       }
    });
}

//Creates click event for add form button
function createAddFormEvent(){
    $(".cms-add-field").click(function () {

        let query = "INSERT INTO content (content_name, content_text, page_id, language_language_id) " +
            "VALUES ('new_name', 'new_text!', "+getActivePageId()+", 1);";

        console.log(query);

        $.get( "/db", {query:query}).done(function( data ) {
            location.reload();
        });

    });
}



$(document).ready(function () {
    getAllPages();
    getAllContent();
    createAddFormEvent();
});