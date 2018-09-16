$(".ham").click(function () {
    $(this).toggleClass('active');
    $(this).parent(".nav-bar__links").toggleClass("active");
});
