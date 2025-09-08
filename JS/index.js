// Productos de ejemplo
const products = [
  { id: 1, name: "Mouse Gamer", price: 350 },
  { id: 2, name: "Teclado Mecánico", price: 1200 },
  { id: 3, name: "Auriculares", price: 800 }
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(product => {
    let col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Precio: $${product.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
    list.appendChild(col);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find(p => p.id === id);

  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Inicializar
renderProducts();
updateCartCount();
