function pageRedirect() {
    if ($user.rol == 1) {
        window.location.replace("localhost:8080/index.html");
    }
}

$(document).ready(function () {

   setTimeout("pageRedirect()", 100); // Werkt niet

    function getNavbar(callback) {
        var getNavbarQuery= "SELECT * FROM content JOIN page ON content.page_id = page.page_id WHERE page.page_name = 'nav_bar';";
        $.get("/db", {query: getNavbarQuery}).done(function (data) {
            callback(data);
        });
    }

    getNavbar(function (data) {
        $("#page span").text(data[0].page_name);

        var editSection = $('#edit-wrapper').html();
        $('#edit-temp').remove();
        $.each( data, function( key, value ) {
            newEditSection = (editSection).slice(1);
            newEditSection = newEditSection.replace("{{content_name}}", value.content_name + ",")
                .replace('{{content_text}}', value.content_text + ",");
            $('#edit-temp').attr('id', "edit-" + key);
            $("#edit-wrapper").append(newEditSection);
        });
    });

    $("#page-name-form").submit(function( event ) {
        event.preventDefault();
        var text = $(this).find('textarea').text();

        var array = text.split(',');
        console.log(array);

        var name = $(this).find('p').text();

        var array2 = name.split(',');
        console.log(array2);

        var array3 = {};
        for(var i=0; i < array.length; i++) {
            array3[array2[i]] = array[i];
        }
        console.log(array3);

        $.each(array3, function( index, value ) {
            console.log( index + " " + value );

            // var updateTextQuery = "UPDATE content SET content_text = "+ value +" WHERE content_name = "+ index ;
            // $.get("/db", {query: updateTextQuery}).done(function () {});
        });

        location.reload();
    });
});