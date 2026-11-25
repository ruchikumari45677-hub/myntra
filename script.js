
// Store the initial bag count
let bagCount = 0;

// Add product to bag
function addToBag() {
    bagCount++;

    // Update bag count on screen
    document.getElementById("count").innerText = bagCount;

    alert("Product added to bag!");
}

// Shop Now button function
function shopNow() {
    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}

// Search products by name
document.getElementById("search").addEventListener("input", function() {

    // Get the search value
    let value = this.value.toLowerCase();

    // Select all product cards
    let cards = document.querySelectorAll(".card");

    // Check every product name
    cards.forEach(function(card) {

        let name = card.querySelector("h3").innerText.toLowerCase();

        // Show matching products
        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
