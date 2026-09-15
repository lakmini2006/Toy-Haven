/* Toy Haven - Main JavaScript */

/* Mobile Navigation */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        navLinks.classList.toggle("show");

    });

}


/* Hero Slider */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

const previousButton = document.getElementById("hero-prev");
const nextButton = document.getElementById("hero-next");

let currentSlide = 0;


function showSlide(index) {

    if (heroSlides.length === 0) {
        return;
    }

    if (index >= heroSlides.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = heroSlides.length - 1;
    }

    else {
        currentSlide = index;
    }

    heroSlides.forEach(function (slide) {

        slide.classList.remove("active-slide");

    });

    heroDots.forEach(function (dot) {

        dot.classList.remove("active-dot");

    });

    heroSlides[currentSlide].classList.add("active-slide");

    if (heroDots[currentSlide]) {

        heroDots[currentSlide].classList.add("active-dot");

    }

}


function nextSlide() {

    showSlide(currentSlide + 1);

}


function previousSlide() {

    showSlide(currentSlide - 1);

}


if (nextButton) {

    nextButton.addEventListener("click", nextSlide);

}


if (previousButton) {

    previousButton.addEventListener("click", previousSlide);

}


heroDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showSlide(index);

    });

});


if (heroSlides.length > 0) {

    setInterval(function () {

        nextSlide();

    }, 5000);

}


/* Product of the Day */

const featuredProducts = [

    {
        name: "Super Hero Figure",
        category: "Figurines",
        price: 4500
    },

    {
        name: "Classic Mustang",
        category: "Diecast Cars",
        price: 6800
    },

    {
        name: "Classic Chess Set",
        category: "Board Games",
        price: 5500
    }

];


function getProductOfTheDay() {

    const today = new Date();

    const dayNumber = today.getDate();

    const productIndex =
        dayNumber % featuredProducts.length;

    return featuredProducts[productIndex];

}


function displayProductOfTheDay() {

    const description =
        document.getElementById(
            "featured-product-description"
        );

    if (!description) {
        return;
    }

    const product = getProductOfTheDay();

    description.textContent =
        `${product.name} — ${product.category} — Rs. ${product.price.toLocaleString()}`;

}


displayProductOfTheDay();


/* Newsletter */

const newsletterForm =
    document.getElementById("newsletter-form");

const newsletterEmail =
    document.getElementById("newsletter-email");

const newsletterMessage =
    document.getElementById("newsletter-message");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = newsletterEmail.value.trim();

        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            return;

        }

        localStorage.setItem(
            "newsletterEmail",
            email
        );

        newsletterMessage.textContent =
            "Thank you for subscribing to Toy Haven! 🎉";

        newsletterEmail.value = "";

    });

}


/* Cart Count */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const cart =
        JSON.parse(
            localStorage.getItem("toyHavenCart")
        ) || [];

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity || 1;

    });

    cartCount.textContent = totalItems;

}


updateCartCount();


/* Service Worker */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(function () {

                console.log(
                    "Toy Haven service worker registered."
                );

            })
            .catch(function (error) {

                console.log(
                    "Service worker registration failed:",
                    error
                );

            });

    });

}