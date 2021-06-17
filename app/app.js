const playlist = document.querySelector('.playlist')
const dashboard = document.querySelector('.dashboard')
const cd = document.querySelector('.cd')
const cdWidthfirt = cd.offsetWidth
const playBtn = document.querySelector('.btn-toggle-play')
const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')
const repeatBtn = document.querySelector('.btn-repeat')
const randomBtn = document.querySelector('.btn-random')
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')




const app = {
    currentIndex: 0,
    audioStatus: false,
    randomStatus: false,
    loopStatus: false,
    listActive: [],
    addClassBtnState: function () {
        if (this.loopStatus) repeatBtn.classList.add('active')
        else repeatBtn.classList.remove('active')
        if (this.randomStatus) randomBtn.classList.add('active')
        else randomBtn.classList.remove('active')
    },
    song: [
        {
            name: "Thương thầm",
            singer: "Raftaar x Fortnite",
            path: "https://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/d42d5c024c44a51afc55/6291682388053408447?authen=exp=1624014345~acl=/d42d5c024c44a51afc55/*~hmac=4174e83ad31972fc79832bd609f8c1cd&fs=MTYyMzg0MTU0NTY0M3x3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "https://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/aedd8ce322a4cbfa92b5/3759150362270140282?authen=exp=1624014570~acl=/aedd8ce322a4cbfa92b5/*~hmac=8ebbe383a17ac363bbc9bdc80ddf40fd&fs=MTYyMzg0MTmUsIC3MDg3OHx3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path:
                "https://mp3-s1-zmp3.zadn.vn/28389c663a21d37f8a30/9165788465981946159?authen=exp=1624014612~acl=/28389c663a21d37f8a30/*~hmac=9a2e2c7ef008791f16db7857167ddda3&fs=MTYyMzg0MTgxMjkyNXx3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3-s1-zmp3.zadn.vn/6fc8b714a952400c1943/8016546831801082752?authen=exp=1624014678~acl=/6fc8b714a952400c1943/*~hmac=76766fa2ccdcdca77b3fb36bba4f0f75&fs=MTYyMzg0MTg3ODUxOXx3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3-s1-zmp3.zadn.vn/dc44576e3a28d3768a39/5451280796885077214?authen=exp=1624014708~acl=/dc44576e3a28d3768a39/*~hmac=4f176e97c3f7e8694dca84cf2549138c&fs=MTYyMzg0MTkwODg3Mnx3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3-s1-zmp3.zadn.vn/610a987ce83a0164582b/8878561538087086642?authen=exp=1624014730~acl=/610a987ce83a0164582b/*~hmac=ed726734e2096f36255f3e388b2f3859&fs=MTYyMzg0MTkzMDA0N3x3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image:
                "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "https://mp3-s1-zmp3.zadn.vn/b36802b4ccf325ad7ce2/1729810351076897325?authen=exp=1624014747~acl=/b36802b4ccf325ad7ce2/*~hmac=2b3178d85c8ab3fdab50232dc474715f&fs=MTYyMzg0MTk0NzExMHx3ZWJWNnwwfDEyMy4xNi4yMjYdUngOA",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    nextSong: function () { this.currentIndex = this.currentIndex + 1 < this.song.length ? this.currentIndex + 1 : 0 },
    prevSong: function () { this.currentIndex = this.currentIndex - 1 > 0 ? this.currentIndex - 1 : this.song.length - 1 },
    randomSong: function () {
        if (this.listActive.length === this.song.length - 1) this.listActive = []
        this.listActive.push(this.currentIndex)
        let i
        do {
            i = Math.floor(Math.random() * this.song.length)
        } while (this.listActive.includes(i))
        this.currentIndex = i
    }, realoadSong: function () {
        this.renderListSong()
        this.renderSongactive()
        audio.play()
    }
    ,
    repeatSong: function () { audio.currentTime = 0 },
    renderListSong: function () {
        let _this = this

        let songsPlayList = _this.song.map(function (item, index) {
            return `<div class="song ${index === _this.currentIndex ? "active" : ""
                }" data-index="${index}">
              <div class="thumb"
                  style="background-image: url('${item.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${item.name}</h3>
                  <p class="author">${item.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
      `

        })
        playlist.innerHTML = songsPlayList.join('')

    },
    renderSongactive: function () {
        let activeSong = this.song[this.currentIndex]
        dashboard.querySelector('h2').innerText = activeSong.name
        dashboard.querySelector('.cd-thumb').style.backgroundImage = `url(${activeSong.image})`
        dashboard.querySelector('audio').src = activeSong.path

    },
    handleEvent: function () {
        const _this = this
        const cdAnimation = cd.animate([{ transform: "rotate(360deg)", }], {
            duration: 10000,
            iterations: Infinity
        })
        cdAnimation.pause()
        window.onscroll = function () {
            let cdWidth = cdWidthfirt - document.documentElement.scrollTop > 0 ? cdWidthfirt - document.documentElement.scrollTop : 0
            cd.style.width = cdWidth + 'px'
            cd.style.opacity = cdWidth / cdWidthfirt
        }
        playBtn.onclick = function () {
            if (_this.audioStatus) audio.pause()
            if (!_this.audioStatus) audio.play()
        }
        audio.onplay = function () {
            _this.audioStatus = true
            playBtn.classList.add('played')
            cdAnimation.play()
        }
        audio.onpause = function () {
            _this.audioStatus = false
            playBtn.classList.remove('played')
            cdAnimation.pause()
        }
        audio.ontimeupdate = function () {
            if (_this.audioStatus) progress.value = Math.floor(audio.currentTime * 100 / audio.duration)
        }
        progress.onchange = function () {
            audio.currentTime = progress.value * audio.duration / 100
        }
        nextBtn.onclick = function () {
            if (_this.randomStatus) _this.randomSong()
            else if (_this.loopStatus) _this.repeatSong()
            else _this.nextSong()
            _this.realoadSong()
        }
        prevBtn.onclick = function () {
            if (_this.randomStatus) _this.randomSong()
            else if (_this.loopStatus) _this.repeatSong()
            else _this.prevSong()
            _this.realoadSong()

        }
        audio.onended = function () {
            nextBtn.click()
        }
        repeatBtn.onclick = function () {
            _this.loopStatus = !_this.loopStatus
            _this.randomStatus = false
            _this.addClassBtnState()
        }
        randomBtn.onclick = function () {
            /* if (_this.randomStatus){ _this.randomStatus = false}
           else if (!_this.randomStatus) { 
                _this.randomStatus = true
                _this.loopStatus=false
             } */
            _this.randomStatus = !_this.randomStatus
            _this.loopStatus = false
            _this.addClassBtnState()
        }
        $('.song').click(function (e) {
            if (!(_this.currentIndex === Number(e.currentTarget.dataset.index))) {
                $('.song.active').removeClass('active')
                e.currentTarget.classList.add('active')
                _this.currentIndex = Number(e.currentTarget.dataset.index)
                _this.renderSongactive()
                audio.play()
                document.documentElement.scrollTop=0
            }



        })

    }



    , star: function () {
        this.renderListSong()
        this.renderSongactive()
        this.handleEvent()
    },
}
app.star()
