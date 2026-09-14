/* =========================================
   TOY HAVEN - MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        navLinks.classList.toggle("show");

    });

}


/* =========================================
   2. HERO SLIDER
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

const previousButton = document.getElementById("hero-prev");
const nextButton = document.getElementById("hero-next");

let currentSlide = 0;


/* Show a specific slide */

function showSlide(index) {

    if (heroSlides.length === 0) {
        return;
    }

    /* Make sure the index stays within the slide range */

    if (index >= heroSlides.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = heroSlides.length - 1;
    }

    else {
        currentSlide = index;
    }


    /* Remove active class from all slides */

    heroSlides.forEach(function (slide) {

        slide.classList.remove("active-slide");

    });


    /* Remove active class from all dots */

    heroDots.forEach(function (dot) {

        dot.classList.remove("active-dot");

    });


    /* Activate current slide */

    heroSlides[currentSlide].classList.add("active-slide");


    /* Activate current dot */

    if (heroDots[currentSlide]) {

        heroDots[currentSlide].classList.add("active-dot");

    }

}


/* Next slide */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* Previous slide */

function previousSlide() {

    showSlide(currentSlide - 1);

}


/* Next button */

if (nextButton) {

    nextButton.addEventListener("click", nextSlide);

}


/* Previous button */

if (previousButton) {

    previousButton.addEventListener("click", previousSlide);

}


/* Dot buttons */

heroDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showSlide(index);

    });

});


/* Automatically change slide every 5 seconds */

if (heroSlides.length > 0) {

    setInterval(function () {

        nextSlide();

    }, 5000);

}


/* =========================================
   3. FEATURED PRODUCT OF THE DAY
========================================= */

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


/* Select today's product */

function getProductOfTheDay() {

    const today = new Date();

    const dayNumber = today.getDate();

    const productIndex =
        dayNumber % featuredProducts.length;

    return featuredProducts[productIndex];

}


/* Display Product of the Day */

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


/* Run Product of the Day */

displayProductOfTheDay();


/* =========================================
   4. NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById("newsletter-form");

const newsletterEmail =
    document.getElementById("newsletter-email");

const newsletterMessage =
    document.getElementById("newsletter-message");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        /* Prevent page refresh */

        event.preventDefault();


        const email = newsletterEmail.value.trim();


        /* Check email */

        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            return;

        }


        /* Save email to localStorage */

        localStorage.setItem(
            "newsletterEmail",
            email
        );


        /* Show success message */

        newsletterMessage.textContent =
            "Thank you for subscribing to Toy Haven! 🎉";


        /* Clear input */

        newsletterEmail.value = "";

    });

}


/* =========================================
   5. CART COUNT
========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) {
        return;
    }


    /* Get cart from localStorage */

    const cart =
        JSON.parse(
            localStorage.getItem("toyHavenCart")
        ) || [];


    /* Calculate total quantity */

    let totalItems = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity || 1;

    });


    /* Display quantity */

    cartCount.textContent = totalItems;

}


/* Run cart counter */

updateCartCount();
/* =========================================
   SERVICE WORKER
========================================= */

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