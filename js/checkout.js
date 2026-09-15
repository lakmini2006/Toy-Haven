/* =========================================
   TOY HAVEN - CHECKOUT JAVASCRIPT
========================================= */


/* =========================================
   GET CART
========================================= */

function getCheckoutCart() {
    return JSON.parse(localStorage.getItem("toyHavenCart")) || [];
}


/* =========================================
   CHECKOUT ELEMENTS
========================================= */

const checkoutForm = document.getElementById("checkout-form");

const checkoutItems = document.getElementById("checkout-items");

const checkoutItemCount =
    document.getElementById("checkout-item-count");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutTotal =
    document.getElementById("checkout-total");

const cardDetails =
    document.getElementById("card-details");

const successOverlay =
    document.getElementById("success-overlay");

const continueShopping =
    document.getElementById("continue-shopping");


/* =========================================
   DISPLAY ORDER SUMMARY
========================================= */

function displayCheckoutSummary() {

    if (!checkoutItems) return;

    const cart = getCheckoutCart();

    checkoutItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    /* EMPTY CART */

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;

        checkoutItemCount.textContent = "0";
        checkoutSubtotal.textContent = "Rs. 0";
        checkoutTotal.textContent = "Rs. 0";

        return;
    }


    /* DISPLAY EACH ITEM */

    cart.forEach(function (item) {

        const itemSubtotal =
            item.price * item.quantity;

        totalItems += item.quantity;
        totalPrice += itemSubtotal;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.category}
                </p>

                <span>
                    ${item.quantity} ×
                    Rs. ${item.price.toLocaleString()}
                </span>

            </div>

            <strong>
                Rs. ${itemSubtotal.toLocaleString()}
            </strong>

        `;


        checkoutItems.appendChild(checkoutItem);

    });


    /* UPDATE TOTALS */

    checkoutItemCount.textContent =
        totalItems;

    checkoutSubtotal.textContent =
        `Rs. ${totalPrice.toLocaleString()}`;

    checkoutTotal.textContent =
        `Rs. ${totalPrice.toLocaleString()}`;
}


/* =========================================
   PAYMENT METHOD
========================================= */

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );


paymentOptions.forEach(function (option) {

    option.addEventListener("change", function () {

        if (option.value === "card") {

            cardDetails.style.display = "block";

        } else {

            cardDetails.style.display = "none";

        }

    });

});


/* =========================================
   VALIDATION HELPERS
========================================= */

function showError(elementId, message) {

    const errorElement =
        document.getElementById(elementId);

    if (errorElement) {

        errorElement.textContent = message;

    }
}


function clearErrors() {

    showError("full-name-error", "");
    showError("email-error", "");
    showError("address-error", "");
    showError("payment-error", "");

}


/* =========================================
   CHECK EMAIL
========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================
   CHECKOUT FORM
========================================= */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearErrors();


            const fullName =
                document.getElementById("full-name")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const address =
                document.getElementById("address")
                    .value.trim();


            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            let isValid = true;


            /* FULL NAME */

            if (fullName === "") {

                showError(
                    "full-name-error",
                    "Please enter your full name."
                );

                isValid = false;

            } else if (fullName.length < 3) {

                showError(
                    "full-name-error",
                    "Name must be at least 3 characters."
                );

                isValid = false;
            }


            /* EMAIL */

            if (email === "") {

                showError(
                    "email-error",
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isValidEmail(email)) {

                showError(
                    "email-error",
                    "Please enter a valid email address."
                );

                isValid = false;
            }


            /* ADDRESS */

            if (address === "") {

                showError(
                    "address-error",
                    "Please enter your delivery address."
                );

                isValid = false;

            } else if (address.length < 10) {

                showError(
                    "address-error",
                    "Please enter a complete delivery address."
                );

                isValid = false;
            }


            /* PAYMENT */

            if (!selectedPayment) {

                showError(
                    "payment-error",
                    "Please select a payment method."
                );

                isValid = false;
            }


            /* CARD VALIDATION */

            if (
                selectedPayment &&
                selectedPayment.value === "card"
            ) {

                const cardNumber =
                    document.getElementById("card-number")
                        .value.trim();

                const expiry =
                    document.getElementById("expiry")
                        .value.trim();

                const cvv =
                    document.getElementById("cvv")
                        .value.trim();


                if (cardNumber === "") {

                    alert(
                        "Please enter your card number."
                    );

                    isValid = false;

                } else if (
                    cardNumber.replace(/\s/g, "").length !== 16
                ) {

                    alert(
                        "Card number must contain 16 digits."
                    );

                    isValid = false;
                }


                if (expiry === "") {
                    alert(
                    "Please enter the card expiry date."
                    );

                    isValid = false;
                } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
                    alert("Expiry date must be in MM/YY format.");

                    isValid = false;
                }


                if (cvv === "") {

                    alert(
                        "Please enter the CVV."
                    );

                    isValid = false;

                } else if (cvv.length !== 3) {

                    alert(
                        "CVV must contain 3 digits."
                    );

                    isValid = false;
                }

            }


            /* STOP IF INVALID */

            if (!isValid) {

                return;

            }


            /* CHECK CART */

            const cart =
                getCheckoutCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add products first."
                );

                return;

            }


            /* =====================================
               CALCULATE ORDER TOTAL
            ===================================== */

            let orderTotal = 0;

            cart.forEach(function (item) {

                orderTotal +=
                    item.price * item.quantity;

            });


            /* =====================================
               CREATE ORDER
            ===================================== */

            const order = {

                id:
                    "TH-" +
                    Date.now(),

                customer: {

                    fullName: fullName,

                    email: email,

                    address: address

                },

                paymentMethod:
                    selectedPayment.value,

                items: cart,

                total:
                    orderTotal,

                date:
                    new Date().toLocaleString()

            };


            /* =====================================
               SAVE ORDER HISTORY
            ===================================== */

            const orderHistory =
                JSON.parse(
                    localStorage.getItem(
                        "toyHavenOrderHistory"
                    )
                ) || [];


            orderHistory.push(order);


            localStorage.setItem(
                "toyHavenOrderHistory",
                JSON.stringify(orderHistory)
            );


            /* =====================================
               CLEAR CART
            ===================================== */

            localStorage.removeItem(
                "toyHavenCart"
            );


            /* UPDATE NAV CART COUNT */

            if (
                typeof updateCartCount ===
                "function"
            ) {

                updateCartCount();

            }


            /* =====================================
               SHOW SUCCESS MESSAGE
            ===================================== */

            successOverlay.classList.add(
                "show"
            );

        }
    );

}


/* =========================================
   CONTINUE SHOPPING
========================================= */

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        function () {

            window.location.href =
                "products.html";

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

displayCheckoutSummary();