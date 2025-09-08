let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentUser = localStorage.getItem("currentUser") || "invitado";

const cartBody = document.getElementById("cart-body");
const cartTotal = document.getElementById("cart-total");
const orderStatus = document.getElementById("order-status");

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let row = document.createElement("tr");

    let subtotal = item.price * item.quantity;
    total += subtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td>$${subtotal}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Eliminar</button></td>
    `;

    cartBody.appendChild(row);
  });

  cartTotal.textContent = `Total: $${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function confirmOrder() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let newOrder = {
    user: currentUser,
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    status: "pendiente",
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  cart = [];
  renderCart();

  orderStatus.textContent = "pendiente";
  alert("Compra confirmada. Estado: pendiente");

  setTimeout(() => {
    let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    let lastOrder = savedOrders[savedOrders.length - 1];
    if (lastOrder && lastOrder.status === "pendiente") {
      lastOrder.status = "enviado";
      localStorage.setItem("orders", JSON.stringify(savedOrders));
      orderStatus.textContent = "enviado";
    }
  }, 5 * 60 * 1000);
}

function cancelOrder() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let lastOrder = orders[orders.length - 1];
  if (lastOrder && lastOrder.status === "pendiente") {
    lastOrder.status = "cancelado";
    localStorage.setItem("orders", JSON.stringify(orders));
    orderStatus.textContent = "cancelado";
    alert("Compra cancelada.");
  } else {
    alert("No se puede cancelar. El pedido ya fue enviado o no existe.");
  }
}

document.getElementById("confirm-btn").addEventListener("click", confirmOrder);
document.getElementById("cancel-btn").addEventListener("click", cancelOrder);

// Render inicial
renderCart();
