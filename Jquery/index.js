// $("h1").toggleClass("title margi")
// $("button").html("<em>hahahaaa</em>")
// $(document).keypress(function(e) {
//     $("h1").text(e.key);
// });

// $("h1").prepend('<div class="my-div"></div>')

$(document).keypress(function(e) {
    $("h1").animate({opacity: 0.2});
});