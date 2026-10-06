// ARRAY TIL KURVEN
// Et tomt array, som gemmer de varer brugeren lægger i kurven
let cart = [];

function renderProducts(productsToShow) {
  const grid = document.getElementById("product-grid");
    // Tømmer grid'et, så vi kan vise nye/filtrerede produkter
  grid.innerHTML = "";

   // LOOP: Gennemgår produkterne i det array, der skal vises
  for (const product of productsToShow) {
    const card = document.createElement("div");
    // Her er klassen "product", så produktkortene kan styles med CSS
    card.classList.add("product");
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
        `;

    const button = document.createElement("button");
    button.textContent = "Føj til kurv";
     // EVENT: Når der klikkes på knappen, tilføjes produktet til kurven
    button.addEventListener("click", () => addToCart(product));

    card.appendChild(button);
    grid.appendChild(card);
  }
}

function addToCart(product) {
  // FIND: Undersøger om produktet allerede findes i cart-arrayet
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
   // Hvis varen allerede er i kurven, øges quantity med 1
    existing.quantity++;
  } else {
      // PUSH: Hvis varen ikke findes, tilføjes et nyt objekt til cart-arrayet
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

    // Opdaterer visningen af kurven
  renderCart();
}

// PLUS-FUNKTION
// Skal finde varen i cart-arrayet og øge quantity
function plusToCart(id){
  const existing = cart.find((item) => item.id === product.id);
  existing.quantity++;
  renderCart();
}

// MINUS-FUNKTION
// Bruges til at reducere antallet af en bestemt vare
function minusFromCart(id) {

  // FIND: Finder varen i cart-arrayet ud fra dens id
    const existing = cart.find(function (item) {
        return item.id === id;
    });

    // Tjekker om varen blev fundet
    if (existing) {
       // Trækker 1 fra quantity
        existing.quantity--;

        // Hvis quantity bliver 0 eller mindre, skal varen fjernes helt
        if (existing.quantity <= 0) {
           // FILTER: Laver et nyt array uden varen med dette id
            cart = cart.filter(function (item) {
                return item.id !== id;
            });
        }
    }
  // Opdaterer kurven efter ændringen
    renderCart();
}
// FJERN-FUNKTION
// Fjerner en vare helt fra kurven
function removeFromCart(id) {
    // FILTER: Beholder alle varer, som IKKE har det valgte id
  cart = cart.filter((item) => item.id !== id);
    // Opdaterer kurven
  renderCart();
}

function renderCart() {
  // DOM: Finder listen i HTML, hvor kurvens varer skal vises
  const list = document.getElementById("cart-items");
    // Tømmer den gamle visning af kurven
  list.innerHTML = "";
    // Variabel til kurvens samlede pris
  let total = 0;
    // Variabel til det samlede antal varer
  let count = 0;

   // Hvis cart-arrayet er tomt, vises denne tekst
  if (cart.length === 0) {
    list.innerHTML = "<li>Din kurv er tom</li>";
  }

    // LOOP: Gennemgår alle varer i cart-arrayet
  for (const item of cart) {

      // Opretter et listeelement til varen
    const li = document.createElement("li");

        // Viser varens navn, quantity og samlede pris
    li.textContent = `${item.name} × ${item.quantity} – ${item.price * item.quantity} kr`;
      //Fjern-knap
    const removeButton = document.createElement("button");
    removeButton.textContent = "Fjern";
    removeButton.addEventListener("click", () => removeFromCart(item.id));

   // Minus-knap
    const minusButton = document.createElement("button");
    minusButton.textContent = "−";

     // EVENT: Når der klikkes på minus,
    // kaldes minusFromCart med varens id
    minusButton.addEventListener("click", function () {
    minusFromCart(item.id);      });

        // Plus-knap
    const plusButton = document.createElement("button");
    plusButton.textContent = "+"; 

    // EVENT: addToCart finder varen i kurven
    // og øger quantity, fordi varen allerede eksisterer
    plusButton.addEventListener("click", function () {
    addToCart(item);
    });

   // Tilføjer knapperne til varens listeelement
    li.appendChild(plusButton);
    li.appendChild(minusButton);
    li.appendChild(removeButton);

      // Tilføjer varen til kurvens HTML-liste
    list.appendChild(li);

        // Beregner den samlede pris
    total += item.price * item.quantity;
    // Beregner det samlede antal varer
    count += item.quantity;
  }

   // DOM: Viser den samlede pris i HTML
  document.getElementById("cart-total").textContent = total;

   // DOM: Viser det samlede antal varer ved kurv-knappen
  document.getElementById("cart-count").textContent = count;
}

// Viser alle produkter, når siden indlæses
renderProducts(products);

// Viser kurven, når siden indlæses
renderCart();

// SØGEFUNKTION

// DOM: Finder søgefeltet i HTML via dets id
const searchInput = document.getElementById("searchInput");

// EVENT: Funktionen kører hver gang brugeren skriver i søgefeltet
searchInput.addEventListener("input", function () {

    // VALUE: Henter det brugeren har skrevet
  // toLowerCase gør teksten til små bogstaver
    const searchText = searchInput.value.toLowerCase();

     // FILTER:
  // Opretter et nyt array med de produkter,
  // der matcher brugerens søgning
    const filteredProducts = products.filter(function (product) {

          // Tjekker om produktets navn indeholder søgeteksten
        return product.name.toLowerCase().includes(searchText);
    });


      // Viser det nye filtrerede array i produkt-grid'et
    renderProducts(filteredProducts);
});

// ÅBN/LUK KURV

// EVENT: Kører når brugeren klikker på kurv-knappen
document.getElementById("cart-button").addEventListener("click", () => {

   // Skifter mellem at vise og skjule kurven
  document.getElementById("cart").classList.toggle("hidden");
});
