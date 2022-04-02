"use strict"
let count = 0

function delay(ms) {
    //delay without setTimeout
    let start = Date.now()
    while (Date.now() - start < ms) {
        //do nothing
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function reAnimate() {
    //reset animation
    let elem = document.getElementById("inner")
    let style = elem.style.animation
    elem.style.animation = "none"
    elem.offsetHeight
    elem.style.animation = style
}

function reposition() {
    let element = document.getElementById("circle")
    console.log("reposition!")
    let translation = 35
    let top = 50
    let left = 50

    top += getRandomInt(-translation, translation)
    left += getRandomInt(-translation, translation)
    console.log(`reposition: ${top} ${left}`)
    element.style.top = `${top}%`
    element.style.left = `${left}%`
}

function click() {
    console.log("click!")
    count += 1
    reposition()
    reAnimate()
    document.getElementById("score").innerText = `${count}`

}


function events() {
    let animated = document.getElementById("inner")
    animated.addEventListener("animationiteration", () => {
        let element = document.getElementById("inner")
        animEnd()
        /*element.classList.remove("animated")
        setTimeout(function(){
            element.classList.add("animated");
        },1)
        element.classList.add("animated")*/
    })

    let circle = document.getElementById("circle")
    circle.addEventListener("click", () => {
        click()
    })


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    } else {
        console.log("ServiceWorker not supported")
    }
}

window.onload = events

function animEnd() {
    reposition()
    /*let element = document.getElementById("inner")
    element.classList.remove("animated")
    element.classList.add("animated")*/
}

