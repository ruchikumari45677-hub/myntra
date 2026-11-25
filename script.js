
let bagCount = 0;

// Add to Bag
function addToBag() {
    bagCount++;

    document.getElementById("count").innerText = bagCount;

    alert("Product successfully added to bag!");
}

// Shop Now
function shopNow() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// Wishlist
function toggleWishlist(button) {

    if (button.innerText === "♡") {
        button.innerText = "♥";
        button.style.color = "red";
        alert("Added to Wishlist!");
    } else {
        button.innerText = "♡";
        button.style.color = "#ff3f6c";
        alert("Removed from Wishlist!");
    }
}

// Product Search
document.getElementById("search").addEventListener("input", function() {

    let searchValue = this.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        let productName = card.innerText.toLowerCase();

        if (productName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
// Back to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}