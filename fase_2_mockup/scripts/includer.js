/**
 * All urls of the styles that needs to be included
 * @type {string[]} the url to the .css file
 */
let stylesToInclude = [

    "styles/base/base.css",
    "styles/base/keyframes.css",
    "styles/base/margin-presets.css",
    "styles/base/typography.css",

    "styles/blocks/content-wrapper.css",
    "styles/blocks/header.css",
    "styles/blocks/nav-bar.css",

    "styles/pages/testpage.css",

];

/**
 * Anonymous function that includes all the stylesheets to the header
 *
 * TO MAKE - includer for all scripts
 */
$( document ).ready(function () {

    console.log("document is ready!");

    $.each( stylesToInclude, function( index, value ){
        console.log(value + " has been included");
        $('head').append('<link rel="stylesheet" type="text/css" href="'+value+'">');
    });

    includeHTML();

    setTimeout(function (){

        $("html").css("display", "block");

    }, 200);

});

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("data-includer");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("data-includer");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}