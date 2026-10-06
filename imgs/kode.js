// Finder HTML-elementet med id="cart-button" og gemmer det i variablen cartButton.
const cartButton = document.getElementById("cart-button");

// Finder HTML-elementet med id="cart" og gemmer det i variablen cart.
const cart = document.getElementById("cart");

// addEventListener holder øje med, om der bliver klikket på cartButton.
// Når der bliver klikket, kører funktionen.
cartButton.addEventListener("click", function() {

     // classList bruges til at ændre classes på et HTML-element.
    // toggle betyder, at classen "hidden" enten tilføjes eller fjernes.
    // Hvis "hidden" er der, fjernes den → kurven bliver synlig.
    // Hvis "hidden" ikke er der, tilføjes den → kurven bliver skjult.
    cart.classList.toggle("hidden");
});

