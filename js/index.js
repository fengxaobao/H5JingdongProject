let myVar = null;
let clientX = 0.0;
let moveClientX = 0.0;
let distanceMove = 0.0;
let index = 0;
let offsetWidth;
let bannerInterval;
$(function () {
     offsetWidth = $(".jd_banner")[0].offsetWidth;

    setTitleAlpho();
    myVar = setInterval(function () {
        myTimer()
    }, 1000);
    bannerScroll();


    moveOnTouchBanner()

});

function moveOnTouchBanner() {
    let ul = $(".banner_ul:first-of-type");
    $(".jd_banner")[0].addEventListener("touchstart", function (ev) {
        myStopFunction();
        clientX = ev.targetTouches[0].clientX
    });
    $(".jd_banner")[0].addEventListener("touchmove", function (ev) {
        moveClientX = ev.targetTouches[0].clientX;
        distanceMove = moveClientX - clientX;
        $(".banner_ul")[0].style.left = (-index*offsetWidth )+distanceMove+ "px";

    });
    $(".jd_banner")[0].addEventListener("touchend", function (ev) {

        myVar = setInterval(function () {
            myTimer()
        }, 1000);
        ul[0].style.transition ="none";
        if (distanceMove > 100) {
            if(distanceMove>0){
                index ++;
            }else {
                index --;
            }
            ul[0].style.transition = "left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            ul[0].style.left = -index*offsetWidth+"px";

            $(".banner_ul")[0].style.left = -distanceMove + "px";
        } else {
            ul[0].style.transition = "left 0.5s ease-in-out";
            ul[0].style.left = -index*offsetWidth+"px";
        }

    });

    $(".jd_banner")[0].addEventListener("webkitTrannsitionEnd", function (ev) {

    });
}

function setTitleAlpho() {
// 在这里写你的代码...
    var banner = document.querySelector(".jd_banner");
    let bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    window.onscroll = function () {
        var offsetTop = $(document).scrollTop();
        var opacity = 0;
        opacity = offsetTop / bannerHeight;
        if (opacity > 1) {
            opacity = 1;
        }
        search.style.background = "rgba(233,35,34," + opacity + ")";
    };
}

//倒计时
function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    $(".item1_left_time")[0].innerText = t;
}

window.unload = function () {
    myStopFunction();
};

//清除倒计时
function myStopFunction() {
    if (myVar) {
        clearInterval(myVar);
    }
    if(bannerInterval){
        clearInterval(bannerInterval);
    }
}

//轮包图
function bannerScroll() {

    let ul = $(".banner_ul:first-of-type");
    let width = (offsetWidth * (ul.childElementCount)) + "px";
    ul[0].style.width = width;
    let leftIndex = 0;
    var lis = ul[0].querySelectorAll("li");
    for (let i = 0; i < lis.length; i++) {
        lis[i].style.width = offsetWidth + "px";
    }
   bannerInterval =  setInterval(function () {
        index++;
        leftIndex = index % 4;
        let leftValue = -(offsetWidth * leftIndex) + "px";
        ul[0].style.transition = "left 0.5s ease-in-out";
        /*5.3 设置偏移*/
        ul[0].style.left = leftValue;
        var indicator = $(".jd_bannerIndicator")[0].querySelectorAll("li");
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove("active");
        }
        indicator[leftIndex].classList.add("active");

    }, 2000)
    window.onresize = function () {
        var offsetWidth = $(".jd_banner")[0].offsetWidth;
        var lis = ul[0].querySelectorAll("li");
        let width = (offsetWidth * (ul[0].childElementCount)) + "px";
        ul[0].style.width = width;
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.width = offsetWidth + "px";
        }
        $(".banner_ul")[0].style.left = -($(".jd_banner")[0].offsetWidth * leftIndex) + "px";
    }

}