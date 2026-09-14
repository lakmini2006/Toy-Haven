/* =========================================
   TOY HAVEN - SHOPPING CART JAVASCRIPT
========================================= */


/* =========================================
   1. GET CART FROM LOCAL STORAGE
========================================= */

function getCartItems() {

    return JSON.parse(
        localStorage.getItem("toyHavenCart")
    ) || [];

}


/* =========================================
   2. SAVE CART TO LOCAL STORAGE
========================================= */

function saveCartItems(cart) {

    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   3. CART ELEMENTS
========================================= */

const cartItemsContainer =
    document.getElementById("cart-items");

const emptyCart =
    document.getElementById("empty-cart");

const summaryItems =
    document.getElementById("summary-items");

const cartSubtotal =
    document.getElementById("cart-subtotal");

const cartTotal =
    document.getElementById("cart-total");

const clearCartButton =
    document.getElementById("clear-cart");


/* =========================================
   4. DISPLAY CART
========================================= */

function displayCart() {

    if (!cartItemsContainer) {
        return;
    }


    const cart = getCartItems();


    /* Clear previous content */

    cartItemsContainer.innerHTML = "";


    /* Calculate total quantity */

    let totalItems = 0;


    /* Calculate total price */

    let totalPrice = 0;


    /* Check whether cart is empty */

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        updateCartSummary(0, 0);

        return;

    }


    /* Hide empty cart message */

    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    /* Create each cart item */

    cart.forEach(function (item) {

        const itemSubtotal =
            item.price * item.quantity;


        totalItems += item.quantity;

        totalPrice += itemSubtotal;


        const cartItem =
            document.createElement("article");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>


            <div class="cart-item-details">

                <span class="product-category">
                    ${item.category}
                </span>

                <h2>
                    ${item.name}
                </h2>

                <p class="cart-item-price">
                    Rs. ${item.price.toLocaleString()}
                    each
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-btn decrease"
                    data-id="${item.id}"
                    aria-label="Decrease quantity">

                    −

                </button>


                <span class="quantity">
                    ${item.quantity}
                </span>


                <button
                    class="quantity-btn increase"
                    data-id="${item.id}"
                    aria-label="Increase quantity">

                    +

                </button>

            </div>


            <div class="cart-item-subtotal">

                <span>
                    Subtotal
                </span>

                <strong>
                    Rs. ${itemSubtotal.toLocaleString()}
                </strong>

            </div>


            <button
                class="remove-item"
                data-id="${item.id}"
                aria-label="Remove ${item.name}">

                Remove

            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    /* Update summary */

    updateCartSummary(
        totalItems,
        totalPrice
    );


    /* Add button events */

    addCartButtonEvents();

}


/* =========================================
   5. UPDATE CART SUMMARY
========================================= */

function updateCartSummary(
    totalItems,
    totalPrice
) {

    if (summaryItems) {

        summaryItems.textContent =
            totalItems;

    }


    if (cartSubtotal) {

        cartSubtotal.textContent =
            `Rs. ${totalPrice.toLocaleString()}`;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `Rs. ${totalPrice.toLocaleString()}`;

    }

}


/* =========================================
   6. ADD CART BUTTON EVENTS
========================================= */

function addCartButtonEvents() {


    /* Increase quantity */

    const increaseButtons =
        document.querySelectorAll(
            ".quantity-btn.increase"
        );


    increaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(button.dataset.id);

                    changeQuantity(
                        productId,
                        1
                    );

                }
            );

        }
    );


    /* Decrease quantity */

    const decreaseButtons =
        document.querySelectorAll(
            ".quantity-btn.decrease"
        );


    decreaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(button.dataset.id);

                    changeQuantity(
                        productId,
                        -1
                    );

                }
            );

        }
    );


    /* Remove item */

    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(button.dataset.id);

                    removeFromCart(
                        productId
                    );

                }
            );

        }
    );

}


/* =========================================
   7. CHANGE QUANTITY
========================================= */

function changeQuantity(
    productId,
    change
) {

    const cart = getCartItems();


    const item =
        cart.find(function (cartItem) {

            return cartItem.id === productId;

        });


    if (!item) {
        return;
    }


    /* Change quantity */

    item.quantity += change;


    /* Don't allow zero or negative quantity */

    if (item.quantity <= 0) {

        const updatedCart =
            cart.filter(function (cartItem) {

                return cartItem.id !== productId;

            });


        saveCartItems(updatedCart);

    }

    else {

        saveCartItems(cart);

    }


    /* Refresh cart */

    displayCart();


    /* Update navigation cart count */

    updateCartCount();

}


/* =========================================
   8. REMOVE PRODUCT
========================================= */

function removeFromCart(productId) {

    const cart = getCartItems();


    const updatedCart =
        cart.filter(function (item) {

            return item.id !== productId;

        });


    saveCartItems(updatedCart);


    displayCart();


    updateCartCount();

}


/* =========================================
   9. CLEAR ENTIRE CART
========================================= */

if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            const cart =
                getCartItems();


            /* Don't do anything if already empty */

            if (cart.length === 0) {

                alert("Your cart is already empty.");

                return;

            }


            /* Ask for confirmation */

            const confirmed =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (!confirmed) {
                return;
            }


            /* Empty cart */

            localStorage.removeItem(
                "toyHavenCart"
            );


            /* Refresh page content */

            displayCart();

            updateCartCount();


            alert(
                "Your cart has been cleared."
            );

        }
    );

}


/* =========================================
   10. DISPLAY CART WHEN PAGE LOADS
========================================= */

displayCart();
