/* =========================================
   TOY HAVEN - WISHLIST JAVASCRIPT
========================================= */


/* =========================================
   GET WISHLIST
========================================= */

function getWishlist() {
    return JSON.parse(
        localStorage.getItem("toyHavenWishlist")
    ) || [];
}


/* =========================================
   SAVE WISHLIST
========================================= */

function saveWishlist(wishlist) {
    localStorage.setItem(
        "toyHavenWishlist",
        JSON.stringify(wishlist)
    );
}


/* =========================================
   ADD TO WISHLIST
========================================= */

function addToWishlist(productId) {

    const wishlist = getWishlist();

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;


    /* Check if already added */

    const alreadyExists = wishlist.some(function (item) {
        return item.id === productId;
    });


    if (alreadyExists) {

        alert("This product is already in your wishlist.");

        return;
    }


    /* Add product with default status */

    wishlist.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        status: "Interested"
    });


    saveWishlist(wishlist);


    alert(`${product.name} has been added to your wishlist!`);


    displayWishlist();
}


/* =========================================
   DISPLAY WISHLIST
========================================= */

function displayWishlist() {

    const wishlistContainer =
        document.getElementById("wishlist-items");

    const emptyWishlist =
        document.getElementById("empty-wishlist");

    if (!wishlistContainer) return;


    const wishlist = getWishlist();

    wishlistContainer.innerHTML = "";


    /* EMPTY WISHLIST */

    if (wishlist.length === 0) {

        if (emptyWishlist) {
            emptyWishlist.style.display = "block";
        }

        return;
    }


    if (emptyWishlist) {
        emptyWishlist.style.display = "none";
    }


    /* DISPLAY ITEMS */

    wishlist.forEach(function (item) {

        const wishlistCard =
            document.createElement("article");

        wishlistCard.className =
            "wishlist-card";


        wishlistCard.innerHTML = `

            <div class="wishlist-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="wishlist-info">

                <span class="product-category">
                    ${item.category}
                </span>

                <h2>
                    ${item.name}
                </h2>

                <p class="wishlist-price">
                    Rs. ${item.price.toLocaleString()}
                </p>

                <p class="wishlist-description">
                    ${item.description}
                </p>


                <div class="wishlist-status">

                    <label for="status-${item.id}">
                        Status:
                    </label>

                    <select
                        id="status-${item.id}"
                        class="status-select"
                        data-id="${item.id}">

                        <option value="Interested"
                            ${item.status === "Interested" ? "selected" : ""}>
                            Interested
                        </option>

                        <option value="Owned"
                            ${item.status === "Owned" ? "selected" : ""}>
                            Owned
                        </option>

                        <option value="Not Interested"
                            ${item.status === "Not Interested" ? "selected" : ""}>
                            Not Interested
                        </option>

                    </select>

                </div>


                <div class="wishlist-buttons">

                    <button
                        class="btn btn-primary wishlist-cart"
                        data-id="${item.id}">

                        Add to Cart

                    </button>

                    <button
                        class="btn btn-secondary remove-wishlist"
                        data-id="${item.id}">

                        Remove

                    </button>

                </div>

            </div>
        `;


        wishlistContainer.appendChild(wishlistCard);

    });


    addWishlistEvents();
}


/* =========================================
   WISHLIST EVENTS
========================================= */

function addWishlistEvents() {


    /* STATUS CHANGE */

    const statusSelects =
        document.querySelectorAll(".status-select");


    statusSelects.forEach(function (select) {

        select.addEventListener("change", function () {

            const productId =
                Number(select.dataset.id);

            const wishlist = getWishlist();

            const item = wishlist.find(function (product) {
                return product.id === productId;
            });


            if (item) {

                item.status = select.value;

                saveWishlist(wishlist);

            }

        });

    });


    /* REMOVE */

    const removeButtons =
        document.querySelectorAll(".remove-wishlist");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);

            removeFromWishlist(productId);

        });

    });


    /* ADD TO CART */

    const cartButtons =
        document.querySelectorAll(".wishlist-cart");


    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);

            addWishlistItemToCart(productId);

        });

    });

}


/* =========================================
   REMOVE FROM WISHLIST
========================================= */

function removeFromWishlist(productId) {

    const wishlist = getWishlist();

    const updatedWishlist =
        wishlist.filter(function (item) {
            return item.id !== productId;
        });


    saveWishlist(updatedWishlist);

    displayWishlist();

}


/* =========================================
   ADD WISHLIST ITEM TO CART
========================================= */

function addWishlistItemToCart(productId) {

    const wishlist = getWishlist();

    const wishlistItem =
        wishlist.find(function (item) {
            return item.id === productId;
        });

    if (!wishlistItem) return;


    const cart =
        JSON.parse(
            localStorage.getItem("toyHavenCart")
        ) || [];


    const existingItem =
        cart.find(function (item) {
            return item.id === productId;
        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: wishlistItem.id,
            name: wishlistItem.name,
            category: wishlistItem.category,
            price: wishlistItem.price,
            image: wishlistItem.image,
            description: wishlistItem.description,
            quantity: 1

        });

    }


    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(`${wishlistItem.name} has been added to your cart!`);

}


/* =========================================
   CONNECT PRODUCT PAGE WISHLIST BUTTONS
========================================= */

const wishlistButtons =
    document.querySelectorAll(".add-to-wishlist");


wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productId =
            Number(button.dataset.id);

        addToWishlist(productId);

    });

});


/* =========================================
   INITIALIZE WISHLIST PAGE
========================================= */

displayWishlist();