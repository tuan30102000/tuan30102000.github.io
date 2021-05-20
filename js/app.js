window.onscroll = function () {
    if (document.documentElement.scrollTop > 0) {
        $('.header').addClass('scroll')
    } else {
        $('.header.scroll').removeClass('scroll')
    }
}
$('.header__btn-mobie').click(function () {
    if (!Boolean(document.querySelector('.header.open-menu'))) {
        $('.header').addClass('open-menu')
        gsap.from('.header__item', { duration: 1, opacity: 0, stagger: .5, })
    } else {
        $('.header').removeClass('open-menu')
    }
})
function animationHomePage1() {
    var timeline = gsap.timeline({
        default: {
            duration: 1,
        }
    })
    timeline
        .from('.header', { x: '100%', duration: 1, ease: 'ease', })
        .from('.header__item', { duration: 1, opacity: 0, stagger: .5, })
}


animationHomePage1()