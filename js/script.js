document.addEventListener("DOMContentLoaded", function () {

    addAnimateToElements();

    window.addEventListener("scroll", function () {
        addAnimateToElements();
    });
    // Hide the menu when clicking on dropdown items
    const navItemsParent = document.querySelector("#navbarNavDropdown")
    const navItems = navItemsParent.querySelectorAll(".navbar-nav .nav-item .dropdown-menu .dropdown-item");
    for (let navItem of navItems) {
        navItem.addEventListener("click", () => {
            if (navItemsParent.className.match("show")) {
                navItemsParent.classList.remove("show");
            }
        });
    }
});

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

