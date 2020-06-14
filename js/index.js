$(".chevron-wrapper").hover(function() {
  $(".chevron").toggleClass("chevron-toggle");
})

$(".chevron-wrapper").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#content").offset().top
    }, 1000);
});
