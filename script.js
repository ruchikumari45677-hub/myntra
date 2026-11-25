
// Get HTML elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const products = document.querySelectorAll(".product-card");
const categories = document.querySelectorAll(".category-card");

const bagCount = document.getElementById("bagCount");
const resultMessage = document.getElementById("resultMessage");

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Shopping cart array
let cart = [];

// Search products
function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();
    let found = 0;

    products.forEach(function(product) {

        const name = product.dataset.name.toLowerCase();
        const category = product.dataset.category.toLowerCase();

        if (
            name.includes(searchValue) ||
            category.includes(searchValue)
        ) {
            product.style.display = "block";
            found++;
        } else {
            product.style.display = "none";
        }

    });

    resultMessage.textContent = found + " products found";

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// Search button
searchBtn.addEventListener("click", searchProducts);

// Search using Enter
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchProducts();
    }

});

// Category filtering
categories.forEach(function(category) {

    category.addEventListener("click", function() {

        searchInput.value = category.dataset.category;

        searchProducts();

    });

});

// Add products to shopping bag
const bagButtons = document.querySelectorAll(".bag-btn");

bagButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(".product-card");

        const name = product.dataset.name;

        const price = Number(
            product.querySelector(".price").textContent
                .replace(/[₹,]/g, "")
        );

        // Check whether product already exists
        const existingProduct = cart.find(function(item) {
            return item.name === name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        renderCart();

        button.textContent = "ADDED!";

        setTimeout(function() {
            button.textContent = "ADD TO BAG";
        }, 1000);

    });

});

// Display shopping bag
function renderCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            "<p>Your shopping bag is empty.</p>";

    }

    let total = 0;
    let totalItems = 0;

    cart.forEach(function(item, index) {

        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <div class="quantity-controls">

                    <button data-action="decrease"
                            data-index="${index}">-</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                            data-index="${index}">+</button>

                </div>
            </div>

            <div>
                <h3>₹${item.price * item.quantity}</h3>

                <button class="remove-btn"
                        data-action="remove"
                        data-index="${index}">
                    Remove
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

    });

    cartTotal.textContent = total.toLocaleString("en-IN");

    bagCount.textContent = totalItems;

}

// Handle quantity and remove buttons
cartItemsContainer.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (action === "increase") {

        cart[index].quantity++;

    }

    else if (action === "decrease") {

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    }

    else if (action === "remove") {

        cart.splice(index, 1);

    }

    renderCart();

});

// Demo checkout
checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your shopping bag is empty!");

    } else {

        alert(
            "Your demo order total is ₹" +
            cart.reduce(function(sum, item) {
                return sum + item.price * item.quantity;
            }, 0).toLocaleString("en-IN") +
            ". Online checkout is not available yet."
        );

    }

});

// Initial display
renderCart();

resultMessage.textContent = products.length +
    " products available";
