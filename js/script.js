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

