/* Toy Haven - Product Page JavaScript */


/* Product Data */

const products = [

    {
        id: 1,
        name: "Super Hero Figure",
        category: "Figurines",
        price: 4500,
        image: "images/webp/superhero.webp",
        description: "A colourful collectible superhero figure for fans and collectors."
    },

    {
        id: 2,
        name: "Cute Teddy Bear",
        category: "Toys",
        price: 3500,
        image: "images/webp/teddy-bear.webp",
        description: "A soft and adorable teddy bear that makes a perfect gift."
    },

    {
        id: 3,
        name: "Classic Chess Set",
        category: "Board Games",
        price: 5500,
        image: "images/webp/chess.webp",
        description: "A classic chess set for strategic games with friends and family."
    },

    {
        id: 4,
        name: "Classic Mustang",
        category: "Diecast Cars",
        price: 6800,
        image: "images/webp/mustang.webp",
        description: "A beautifully detailed miniature classic Mustang for collectors."
    },

    {
        id: 5,
        name: "Robot Action Figure",
        category: "Figurines",
        price: 4200,
        image: "images/webp/robot.webp",
        description: "A futuristic robot figure for imaginative play and collecting."
    },

    {
        id: 6,
        name: "Building Blocks Set",
        category: "Toys",
        price: 4800,
        image: "images/webp/building-blocks.webp",
        description: "A creative building block set for hours of construction fun."
    },

    {
        id: 7,
        name: "Monopoly Classic",
        category: "Board Games",
        price: 7500,
        image: "images/webp/monopoly.webp",
        description: "A classic property trading board game for family game nights."
    },

    {
        id: 8,
        name: "Red Sports Car",
        category: "Diecast Cars",
        price: 5200,
        image: "images/webp/sports-car.webp",
        description: "A stylish miniature sports car for diecast collectors."
    },

    {
        id: 9,
        name: "Fantasy Warrior",
        category: "Figurines",
        price: 6000,
        image: "images/webp/fantasy-warrior.webp",
        description: "A fantasy warrior collectible figure with detailed design."
    },

    {
        id: 10,
        name: "Toy Train Set",
        category: "Toys",
        price: 6200,
        image: "images/webp/toy-train.webp",
        description: "An exciting toy train set designed for creative play."
    },

    {
        id: 11,
        name: "Snakes and Ladders",
        category: "Board Games",
        price: 2800,
        image: "images/webp/snakes-ladders.webp",
        description: "A fun and simple board game suitable for family entertainment."
    },

    {
        id: 12,
        name: "Vintage Pickup Truck",
        category: "Diecast Cars",
        price: 5900,
        image: "images/webp/pickup-truck.webp",
        description: "A detailed vintage pickup truck miniature for collectors."
    }

];


/* Product Grid */

const productGrid =
    document.getElementById("product-grid");

const noResults =
    document.getElementById("no-results");


/* Display Products */

function displayProducts(productList) {

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        if (noResults) {
            noResults.style.display = "block";
        }

        return;
    }

    if (noResults) {
        noResults.style.display = "none";
    }

    productList.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className = "shop-product-card";

        card.innerHTML = `

            <div class="shop-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="shop-product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <p class="shop-product-price">
                    Rs. ${product.price.toLocaleString()}
                </p>

                <div class="product-card-buttons">

                    <button class="btn btn-primary add-to-cart"
                        data-id="${product.id}">
                        Add to Cart
                    </button>

                    <button class="btn btn-secondary add-to-wishlist"
                            data-id="${product.id}">
                        <img src="images/webp/why-icon-heart.webp" alt="">
                        Wishlist
                    </button>

                    <button class="btn btn-secondary view-details"
                        data-id="${product.id}">
                        View Details
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });

    addProductButtonEvents();

}


/* Product Button Events */

function addProductButtonEvents() {

    const addCartButtons =
        document.querySelectorAll(".add-to-cart");

    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);

            addToCart(productId);

        });

    });

    const viewButtons =
        document.querySelectorAll(".view-details");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productId =
                Number(button.dataset.id);

            openProductModal(productId);

        });

    });

}


/* Shopping Cart */

function getCart() {

    return JSON.parse(
        localStorage.getItem("toyHavenCart")
    ) || [];

}


function addToCart(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });

    if (!product) {
        return;
    }

    const cart = getCart();

    const existingItem =
        cart.find(function (item) {

            return item.id === productId;

        });

    if (existingItem) {

        existingItem.quantity += 1;

    }

    else {

        cart.push({

            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(`${product.name} has been added to your cart!`);

}


/* Search Products */

const searchInput =
    document.getElementById("product-search");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();

            const filteredProducts =
                products.filter(function (product) {

                    return product.name
                        .toLowerCase()
                        .includes(searchText);

                });

            displayProducts(filteredProducts);

        }
    );

}


/* Category Filter */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active-filter"
                    );

                }
            );

            button.classList.add(
                "active-filter"
            );

            const selectedCategory =
                button.dataset.category;

            if (selectedCategory === "All") {

                displayProducts(products);

                return;

            }

            const filteredProducts =
                products.filter(
                    function (product) {

                        return product.category ===
                            selectedCategory;

                    }
                );

            displayProducts(filteredProducts);

        }
    );

});


/* Product Modal */

const productModal =
    document.getElementById("product-modal");

const modalClose =
    document.getElementById("modal-close");

const modalImage =
    document.getElementById("modal-product-image");

const modalCategory =
    document.getElementById("modal-product-category");

const modalName =
    document.getElementById("modal-product-name");

const modalPrice =
    document.getElementById("modal-product-price");

const modalDescription =
    document.getElementById(
        "modal-product-description"
    );

const modalAddCart =
    document.getElementById("modal-add-cart");


let selectedModalProduct = null;


function openProductModal(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });

    if (!product || !productModal) {
        return;
    }

    selectedModalProduct = product;

    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCategory.textContent =
        product.category;

    modalName.textContent =
        product.name;

    modalPrice.textContent =
        `Rs. ${product.price.toLocaleString()}`;

    modalDescription.textContent =
        product.description;

    productModal.classList.add("modal-open");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeProductModal() {

    if (!productModal) {
        return;
    }

    productModal.classList.remove(
        "modal-open"
    );

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProductModal
    );

}


if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        function () {

            if (selectedModalProduct) {

                addToCart(
                    selectedModalProduct.id
                );

            }

        }
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        function (event) {

            if (event.target === productModal) {

                closeProductModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeProductModal();

        }

    }
);


/* Display Products on Page Load */

displayProducts(products);


/* Wishlist */

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("add-to-wishlist")) {

        const productId =
            Number(event.target.dataset.id);

        const product =
            products.find(function (item) {

                return item.id === productId;

            });

        if (!product) return;

        const wishlist =
            JSON.parse(
                localStorage.getItem("toyHavenWishlist")
            ) || [];

        const alreadyExists =
            wishlist.some(function (item) {

                return item.id === productId;

            });

        if (alreadyExists) {

            alert(
                "This product is already in your wishlist."
            );

            return;
        }

        wishlist.push({

            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description,
            status: "Interested"

        });

        localStorage.setItem(
            "toyHavenWishlist",
            JSON.stringify(wishlist)
        );

        alert(`${product.name} has been added to your wishlist!`);

    }

});