$(".ham").click(function () {
	$(this).toggleClass('active');
	$(this).parent(".nav-bar_links").toggleClass("active");
});