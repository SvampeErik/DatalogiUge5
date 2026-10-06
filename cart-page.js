let cart = [];

function renderProducts() {
  const grid = document.getElementById("product-grid");

  for (const product of products) {
    const card = document.createElement("div");
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
        `;

    const button = document.createElement("button");
    button.textContent = "Føj til kurv";
    button.addEventListener("click", () => addToCart(product));

    card.appendChild(button);
    grid.appendChild(card);
  }
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
}

function plusToCart(id){
  const existing = cart.find((item) => item.id === product.id);
  existing.quantity++;
  renderCart();
}

function minusFromCart(id) {
    const existing = cart.find(function (item) {
        return item.id === id;
    });

    if (existing) {
        existing.quantity--;

        if (existing.quantity <= 0) {
            cart = cart.filter(function (item) {
                return item.id !== id;
            });
        }
    }

    renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    list.innerHTML = "<li>Din kurv er tom</li>";
  }

  for (const item of cart) {
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.quantity} – ${item.price * item.quantity} kr`;
      //Fjern-knap
    const removeButton = document.createElement("button");
    removeButton.textContent = "Fjern";
    removeButton.addEventListener("click", () => removeFromCart(item.id));

   // Minus-knap
    const minusButton = document.createElement("button");
    minusButton.textContent = "−";

    minusButton.addEventListener("click", function () {
    minusFromCart(item.id);      });

        // Plus-knap
    const plusButton = document.createElement("button");
    plusButton.textContent = "+"; 
    plusButton.addEventListener("click", function () {
    addToCart(item);
    });


    li.appendChild(plusButton);
    li.appendChild(minusButton);
    li.appendChild(removeButton);
    list.appendChild(li);

    total += item.price * item.quantity;
    count += item.quantity;
  }

  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = count;
}

renderProducts();
renderCart();

document.getElementById("cart-button").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("hidden");
});
