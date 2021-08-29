document.addEventListener("DOMContentLoaded", function () {

    addAnimateToElements();
    enableCountAnimation();

    window.addEventListener("scroll", function () {
        addAnimateToElements();
        enableCountAnimation();
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

function enableCountAnimation() {
    const countableElements = document.querySelectorAll("[data-bs-count]");
    countableElements.forEach(element => {
        if (isElementInViewport(element)) {
            countAnimation(element);
        }
    });
}

function addAnimation(el) {
    el.classList.add(el.getAttribute("data-bs-animation"));
    el.removeAttribute("data-bs-animation");
}
function isElementInViewport(el) {
    let e = el.getBoundingClientRect();
    return e.top <= 0 && e.bottom >= 0 || e.bottom >= (window.innerHeight || document.documentElement.clientHeight) && e.top <= (window.innerHeight || document.documentElement.clientHeight) || e.top >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}
function convertLatinToPersianNumbers(num) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    if (num.length === 1) {
        return persianNumbers[num];
    } else {
        num = num.toString();
        let nums = num.split("");
        return nums.map(num => {
            return persianNumbers[num];
        }).join("");
    }
}
function convertPersianToLatinNumbers(num) {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    let latinNumber = "";
    let nums = num.toString().split("");
    nums.forEach(num => {
        latinNumber += persianNumbers.indexOf(num);
    });
    return latinNumber;
}
function countAnimation(el) {
    let start = +convertPersianToLatinNumbers(el.innerText) || 0;
    const end = el.getAttribute("data-bs-count") * 1;
    if (start === end) return;
    let range = end - start;
    const duration = 1000;

    const stepTime = Math.abs(Math.floor(duration / range));

    let timer = setInterval(() => {
        start += 1;
        el.innerText = convertLatinToPersianNumbers(start);
        if (start === end) {
            clearInterval(timer);
            el.removeAttribute("data-bs-count");
        }
    }, stepTime);
}
