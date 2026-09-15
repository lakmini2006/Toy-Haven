/* Toy Haven - Shopping Cart JavaScript */

/* Cart Storage */

function getCartItems() {

    return JSON.parse(
        localStorage.getItem("toyHavenCart")
    ) || [];

}

function saveCartItems(cart) {

    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );

}


/* Cart Elements */

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


/* Display Cart */

function displayCart() {

    if (!cartItemsContainer) {
        return;
    }

    const cart = getCartItems();

    cartItemsContainer.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        updateCartSummary(0, 0);

        return;

    }

    if (emptyCart) {
        emptyCart.style.display = "none";
    }

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

    updateCartSummary(
        totalItems,
        totalPrice
    );

    addCartButtonEvents();

}


/* Cart Summary */

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


/* Cart Button Events */

function addCartButtonEvents() {

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


/* Change Quantity */

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

    item.quantity += change;

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

    displayCart();
    updateCartCount();

}


/* Remove Product */

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


/* Clear Cart */

if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            const cart =
                getCartItems();

            if (cart.length === 0) {

                alert("Your cart is already empty.");

                return;

            }

            const confirmed =
                confirm(
                    "Are you sure you want to clear your cart?"
                );

            if (!confirmed) {
                return;
            }

            localStorage.removeItem(
                "toyHavenCart"
            );

            displayCart();
            updateCartCount();

            alert(
                "Your cart has been cleared."
            );

        }
    );

}


/* Initialise Cart */

displayCart();