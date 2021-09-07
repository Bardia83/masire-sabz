document.addEventListener("DOMContentLoaded", function () {

    addAnimateToElements();
    startCarousel();

    window.addEventListener("scroll", function () {
        addAnimateToElements();
        startCarousel();
    });

});

function startCarousel() {
    const carousel = document.querySelector("#carouselTwo");
    if (isElementInViewport(carousel)) {
        carousel.setAttribute("data-bs-ride", "carousel");
    }
}

function addAnimateToElements() {
    const elements = document.querySelectorAll("[data-bs-animation]");
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            addAnimation(element);
        }
    });
}
function addAnimation(el) {
    el.classList.add(el.getAttribute("data-bs-animation"));
    el.removeAttribute("data-bs-animation");
}
function isElementInViewport(el) {
    let e = el.getBoundingClientRect();
    return (
        e.top <= 0 &&
        e.bottom >= 0 || e.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        e.top <= (window.innerHeight || document.documentElement.clientHeight) || e.top >= 0 &&
        e.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function addCountAnimation() {
    const elements = document.querySelectorAll("[data-bs-animation]");
    elements.forEach(function () {
        countAnimation(element, element.innerHTML * 1, element.getAttribute("data-bs-count") * 1, 1000, 200);
    });
}
function countAnimation(el, start, end, duration, delay) {
    if (isElementInViewport(el)) {
        setTimeout(function () {
            if (start === end) return;
            const range = end - start;
            const stepTime = Math.abs(Math.floor(duration / range));
            let timer = setInterval(function() {
                start++;
                el.innerHTML = start;
                if (start === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }, delay);
    }
}

