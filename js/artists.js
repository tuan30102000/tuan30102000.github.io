if ($(".artists-title__content").length == 1) {
    var typed_strings = $(".artists-title__content").text();
    var typed = new Typed(".artists-title__show", {
        smartBackspace:!1,
        strings: typed_strings.split(","),
        typeSpeed: 80,
        loop: true,
        backDelay: 2e3,
        backSpeed: 40,
    });
}
console.log(2e3)