// Productos de ejemplo
const products = [
  { id: 1, name: "Laptop Gamer", price: 1500 },
  { id: 2, name: "Mouse Inalámbrico", price: 300 },
  { id: 3, name: "Teclado Mecánico", price: 500 },
  { id: 4, name: "Monitor 24''", price: 2000 }
];

// Render catálogo
function renderProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  products.forEach(p => {
    let card = document.createElement("div");
    card.className = "col-md-3 mb-3";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Precio: $${p.price}</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });
}

// Carrito en localStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = cart.length;
}

// Control de sesión
function checkSession() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navUser = document.getElementById("navUser");
  if (user && navUser) {
    navUser.textContent = `${user.email} (Salir)`;
    navUser.href = "#";
    navUser.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    };
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  checkSession();
});
