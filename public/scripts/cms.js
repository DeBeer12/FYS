function pageRedirect() {
    if ($user.rol == 1) {
        window.location.replace("localhost:8080/index.html");
    }
}

$(document).ready(function () {

   setTimeout("pageRedirect()", 100);

    function getNavbar(callback) {
        var getNavbarQuery= "SELECT * FROM content JOIN page ON content.page_id = page.page_id WHERE page.page_name = 'nav_bar';";
        $.get("/db", {query: getNavbarQuery}).done(function (data) {
            callback(data);
        });
    }

    getNavbar(function (data) {
        console.log(data);

        $("#page span").text(data[0].page_name);

        var editSection = $('#edit-wrapper').html();
        $('#edit-temp').remove();
        $.each( data, function( key, value ) {
            newEditSection = (editSection).slice(1);
            newEditSection = newEditSection.replace("{{content_name}}", value.content_name)
                .replace('{{content_text}}', value.content_text);
            $('#edit-temp').attr('id', "edit-" + key);
            $("#edit-wrapper").append(newEditSection);
        });
    });

    $("#page-name-form").submit(function( event ) {
        alert( "Handler for .submit() called." );
        event.preventDefault();
        var text = $(this).find('textarea').text();
        var name = $(this).find('p').text();
        console.log("text: " + text, "name:"+ name);

        // var updateTextQuery = "UPDATE content SET content_text = "+ text +" WHERE content_name = "+ name +";";
        // $.get("/db", {query: updateTextQuery}).done(function () {});
    });
});