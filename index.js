function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

loco()

function sheryAnimation() {
    Shery.mouseFollower();
    Shery.makeMagnet("#nav h4,#nav #first");

    Shery.imageEffect(".images", {
        style: 4,
        // debug:true,
        gooey: true,
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.8524808524808525 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1.07, "range": [0.1, 5] }, "durationIn": { "value": 1.63, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.18, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.76, "range": [0, 10] }, "metaball": { "value": 0.49, "range": [0, 2], "_gsap": { "id": 22 } }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 12.21, "range": [0, 100] }, "uColor": { "value": true }, "uSpeed": { "value": 0.6, "range": [0.1, 1], "rangep": [1, 10] }, "uAmplitude": { "value": 1.5, "range": [0, 5] }, "uFrequency": { "value": 3.5, "range": [0, 10] }, "noiseDetail": { "value": 7.44, "range": [0, 100] }, "distortionAmount": { "value": 2.98, "range": [0, 10] }, "scale": { "value": 36.36, "range": [0, 100] }, "speed": { "value": 0.79, "range": [0, 1] } }
    })
}
sheryAnimation()


function loadingAnimation() {
    var tl = gsap.timeline();

    tl.from(".load h1,.load h2", {
        y: 120,
        duration: 0.5,
        delay: 0.2,
        stagger: 0.2
    })
    tl.to(".load", {
        opacity: 0,
        delay: 1.6,
        stagger: -0.2
    })
    tl.to("#loader", {
        top: "-100%",
        duration: 1,
        ease: "power4.out"
    })
    tl.from(".text h1", {
        y: 200,
        opacity: 0,
        stagger: {
            amount: 0.5
        }
    })
    tl.from("#nav", {
        opacity: 0
    }, "-=0.5")

    var timer = document.querySelector("#timer h4");
    var grow = 0;
    var int = setInterval(function () {
        if (grow < 100) {
            grow++;
            timer.innerHTML = grow;
        }
    }, 20)

    setTimeout(function () {
        clearInterval(int)
    }, 3000)
}
loadingAnimation();

function overlayAnimation() {
    var first = document.querySelector("#first");
    var flag = 0;
    var tl = gsap.timeline()

    first.addEventListener("click", function () {
        if (flag === 0) {
            tl.to("#overlay", {
                top: "0%"
            });
            tl.from(".overlay-text h1", {
                y: 250,
                duration: .7,
                stagger: {
                    amount: 0.3
                }
            });
            tl.from("#overlay-right", {
                opacity: 0,
                duration: 2
            })
            flag = 1;
        } else {
            tl.from(".overlay-text", {
                // opacity:0,             
                duration: .5,
                stagger: {
                    amount: -0.2
                }
            });
            tl.to("#overlay", {
                top: "-100%"
            });
            flag = 0;
        }
    });


    var overlayText = document.querySelectorAll(".overlay-text");


    overlayText.forEach(function (val) {
        val.addEventListener("mouseenter", function () {
            val.childNodes[1].style.opacity = 0
            val.childNodes[3].style.opacity = 1

        })
        val.addEventListener("mouseleave", function () {
            val.childNodes[1].style.opacity = 1
            val.childNodes[3].style.opacity = 0

        })
    })


}

overlayAnimation();
let specialtext = document.querySelector(".specialtext")
const flagImg = document.querySelector("#page1 img")

specialtext.addEventListener("mouseenter", function () {
    flagImg.style.opacity = "1"
})

specialtext.addEventListener("mouseleave", function () {
    flagImg.style.opacity = "0"
})

specialtext.addEventListener("mousemove", function (yo) {
    gsap.to("#page1 img", {
        left: yo.x,
        top: yo.y,
        transform: "translate(-50%, -50%)"
    })
})

function page2Animation() {
    var videoC = document.querySelector("#video-container");
    videoC.addEventListener("mouseenter", function () {
        gsap.to(".mousefollower", {
            opacity: 0,
        })
    })
    videoC.addEventListener("mouseleave", function () {
        gsap.to(".mousefollower", {
            opacity: 1,
        })
        gsap.to("#play-btn", {
            left: "70%",
            top: "-15%"
        })
    })

    var videoImage = document.querySelector("#video-container img");
    var videoVideo = document.querySelector("#video-container video");

    var flag = 0;

    videoC.addEventListener("click", function () {
        if (flag == 0) {
            gsap.to(videoVideo, {
                opacity: 1
            })
            gsap.to("#play-btn", {
                scale: 0.8
            })
            document.querySelector("#play-btn").innerHTML = '<i class="ri-pause-line"></i>'
            videoVideo.play();
            flag = 1;
        } else {
            gsap.to(videoVideo, {
                opacity: 0
            })

            gsap.to("#play-btn", {
                scale: 1
            })
            document.querySelector("#play-btn").innerHTML = '<i class="ri-play-fill"></i>'
            videoVideo.pause();
            flag = 0;
        }
    })

    videoC.addEventListener("mousemove", function (dets) {
        gsap.to("#play-btn", {
            left: dets.x - 420,
            top: dets.y - 145
        })
    })
}

page2Animation();

function page3Animation() {
    gsap.from("#page3 .underline", {
        width: "0%",
        scrollTrigger: {
            trigger: "#page3",
            scroller: "#main",
            start: "top 40%",
            end: "top -100%"
        }
    })

    gsap.from(".page3-undeline", {
        width: 0,
        scrollTrigger: {
            trigger: ".page3-container",
            scroller: "#main",
            start: "top 0",
            end: "top -100%"
        }
    })
    // gsap.from("#img3 .page3-undeline",{
    //     width:0,
    //     scrollTrigger:{
    //         trigger:"#img3",
    //         scroller:"#main",
    //         markers:true,
    //         start:"top 40%",
    //         end:"top -100%"
    //     }
    // })
}
page3Animation();

function page5Animation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            start: "top 40%",
            end: "top -100%"
        }
    })
    tl.from("#page5 .underline", {
        width: "0%",
    }, "a")
    tl.from(".elems h1", {
        y: 150,
        duration: 1,
        stagger: {
            amount: .2
        }
    }, "a")
    gsap.to("#container .underline", {
        width: "75%",
        scrollTrigger: {
            trigger: "#container",
            scroller: "#main",
            start: "top 40%",
            end: "top -100%",
        }
    })
}
page5Animation();

function page6Animation(){
var tl = gsap.timeline({scrollTrigger:{
    trigger:"#page6",
    scroller:"#main",
    start:"top 110%",
    end:"top -100%",
    scrub:true
}})
tl.to("#page6 .move",{
    x:-600
},"a")
tl.from("#page6 .moveing",{
    x:-600
},"a")
}
page6Animation();

function page7Animation(){
    var page7 = document.querySelectorAll("#page7 .last-text");

    page7.forEach(function(val){
        var text = val.textContent;
        var splitted = text.split("");
        var clutter = "";
        splitted.forEach(function(elem){
            clutter += `<span>${elem}</span>`;
        }) 
        val.innerHTML = clutter;
    })
    var page7Text = document.querySelector(".page7-text");
    page7Text.addEventListener("mouseenter", function() {
        gsap.to("#page7 h1 span", {
            opacity: 0,
            stagger: 0.1,
            duration: 0.5
        });
        gsap.to("#page7 h2 span", {
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.4
        });
    });

    page7Text.addEventListener("mouseleave", function() {
        gsap.to("#page7 h2 span", {
            opacity: 0,
            stagger: 0.04,
            duration: 0.5
        });
        gsap.to("#page7 h1 span", {
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.4
        });
    });
    gsap.to("#page7 .underline3",{
        width:"93%",
        scrollTrigger:{
            trigger:"#page7",
            scroller:"#main",
            start:"top 30%",
            end:"top -100%",            
        }
    })
}
page7Animation();

