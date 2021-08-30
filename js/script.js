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

function test(el) {
    let e = el.getBoundingClientRect();
    return (
        e.top >= 0 &&
        e.left >= 0 &&
        e.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        e.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function enableCountAnimation() {
    const countableElements = document.querySelectorAll("[data-bs-count]");

    if (screen.width < 1200) {
        countableElements.forEach(element => {
           element.innerHTML = convertLatinToPersianNumbers(element.getAttribute("data-bs-count"));
           element.removeAttribute("data-bs-count");
        });
    } else {
        countableElements.forEach(element => {
            if (test(element)) {
                console.log(element);
                countAnimation(
                    element,
                    element.innerText * 1 || 0,
                    element.getAttribute("data-bs-count") * 1);
            }
        });
    }
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
function countAnimation(el, start, end) {
    let range = end - start;
    const duration = 1000;

    const stepTime = Math.abs(Math.floor(duration / range));

    let timer = setInterval(() => {
        start += 1;

        el.innerHTML = convertLatinToPersianNumbers(start);
        if (start === end) {
            clearInterval(timer);
            console.log(stepTime)
            el.removeAttribute("data-bs-count");
            el.innerHTML = convertLatinToPersianNumbers(start);
        }
    }, stepTime);
}
