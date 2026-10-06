const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("cart");

cartButton.addEventListener("click", function() {
    cart.classList.toggle("hidden");
});
