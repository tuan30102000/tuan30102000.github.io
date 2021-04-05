var MovedOn = function () {
    var imgElmSlide = Array.from($('.home-pag4__img-slide'))
    var activeImg = Array.from($('.home-pag4__img-slide.active'))
    var idexAtive = imgElmSlide.indexOf(...activeImg)
    console.log(idexAtive)

    if (idexAtive < (imgElmSlide.length - 1)) {
        $('.slide-btn--active').removeClass('slide-btn--active')
        document.querySelectorAll('.home-page4__btn-slide')[idexAtive+1].classList.add('slide-btn--active')

        $('.home-pag4__img-slide.active').removeClass('active')

        document.querySelectorAll('.home-pag4__img-slide')[idexAtive + 1].classList.add("active")
        
    } else {
        $('.slide-btn--active').removeClass('slide-btn--active')
        document.querySelectorAll('.home-page4__btn-slide')[0].classList.add('slide-btn--active')
        $('.home-pag4__img-slide.active').removeClass('active')
        document.querySelectorAll('.home-pag4__img-slide')[0].classList.add("active")
        
    }
}
function run(x) {
    setInterval(MovedOn, x)
}

run(3000)