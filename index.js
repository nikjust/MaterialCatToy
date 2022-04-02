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
    cssVariablesSet()
    reposition()
    reAnimate()

    document.getElementById("score").innerText = `${count}`


}


function events() {
    let animated = document.getElementById("inner")
    animated.addEventListener("animationiteration", () => {
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
    circle.addEventListener("click", pop)


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/MaterialCatToy/serviceWorker.js', {scope: "/MaterialCatToy/"})
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

function cssVariablesSet() {
    let container = document.getElementById("var-container")
    console.log(count)
    let speed = 1 + (count / 100)
    let transitionSpeed = 1 + (count / 25)
    let circleInner = document.getElementById("inner")
    console.log(`speed: ${5 / speed}s`)
    circleInner.offsetHeight
    circleInner.style.animationDuration = `${5 / speed}s`
    circleInner.offsetHeight
    let circle = document.getElementById("circle")
    circle.offsetHeight
    circle.style.transitionDuration = `${0.25 / transitionSpeed}s`
    circle.offsetHeight


}


//popping animation
function pop(e) {
    let amount = 30;
    console.log(`type: ${e.target.dataset.type}`)
    switch (e.target.dataset.type) {
        case 'shadow':
        case 'line':
            amount = 60;
            break;
    }
    if (e.clientX === 0 && e.clientY === 0) {
        const bbox = e.target.getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 30; i++) {
            createParticle(x, y, e.target.dataset.type);
        }
    } else {
        for (let i = 0; i < amount; i++) {
            createParticle(e.clientX, e.clientY, e.target.dataset.type);
        }
    }
}

function createParticle(x, y, type) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 500;
    let destinationY = (Math.random() - 0.5) * 500;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    switch (type) {
        case 'square':
            particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`; // Цвет квадратов
            particle.style.border = '1px solid white'; // Бордюр квадратов
            break;
        case 'symbol':
            particle.innerText = ['❤', "🐱", "🐈", "🐁"][Math.floor(Math.random() * 4)]; // Символы
            particle.style.color = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`; // Цвет символов
            particle.style.fontSize = `${Math.random() * 24 + 2}px`; // Размер символов
            width = height = 'auto';
            break;
        case 'shadow':
            var color = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`; // Цвет
            particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`; // Тень
            particle.style.background = color;
            particle.style.borderRadius = '50%'; // Радиус
            width = height = Math.random() * 5 + 4; // Размеры
            break;
    }
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 5000, // Продолжительность всех эффектов
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}

function removeParticle(e) {
    e.srcElement.effect.target.remove();
}

if (document.body.animate) {
    document.querySelectorAll('button').forEach(button => button.addEventListener('click', pop));
}
