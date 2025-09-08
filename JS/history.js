const products = [
  { id: 1, name: "Laptop Gamer", price: 1500 },
  { id: 2, name: "Mouse Inalámbrico", price: 300 },
  { id: 3, name: "Teclado Mecánico", price: 500 },
  { id: 4, name: "Monitor 24''", price: 2000 }
];

// Control de sesión
function checkSession() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navUser = document.getElementById("navUser");
  if (!user) {
    alert("Debes iniciar sesión para ver tu historial");
    window.location.href = "../login.html";
  } else if (navUser) {
    navUser.textContent = `${user.email} (Salir)`;
    navUser.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
    };
  }
}

// Render historial
function renderOrders() {
  const container = document.getElementById("ordersContainer");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = orders.filter(o => o.user === user.email);

  if (!userOrders.length) {
    container.innerHTML = "<p>No tienes pedidos aún.</p>";
    return;
  }

  let html = `<table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>`;

  userOrders.forEach(order => {
    let productNames = order.products.map(pid => products.find(p => p.id === pid).name).join(", ");
    html += `<tr>
               <td>${order.id}</td>
               <td>${productNames}</td>
               <td>$${order.total}</td>
               <td>${order.status}</td>
               <td>`;
    if (order.status === "Pendiente") {
      html += `<button class="btn btn-danger btn-sm" onclick="cancelOrder(${order.id})">Cancelar</button>`;
    } else {
      html += "-";
    }
    html += `</td></tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// Cancelar pedido
function cancelOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let order = orders.find(o => o.id === orderId);
  if (order && order.status === "Pendiente") {
    order.status = "Cancelado";
    localStorage.setItem("orders", JSON.stringify(orders));
    alert(`Pedido ${orderId} cancelado`);
    renderOrders();
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  checkSession();
  renderOrders();
});
