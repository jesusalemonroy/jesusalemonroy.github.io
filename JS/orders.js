let currentUser = localStorage.getItem("currentUser");
if(!currentUser){
  alert("Debes iniciar sesión para ver tu historial");
  window.location.href = "login.html";
}

function renderOrders(){
  const ordersBody = document.getElementById("orders-body");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = orders.filter(o => o.user === currentUser);

  ordersBody.innerHTML = "";

  if(userOrders.length===0){
    ordersBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay pedidos</td></tr>`;
    return;
  }

  userOrders.forEach(order=>{
    const productsList = order.items.map(i=>`${i.name} x${i.quantity}`).join(", ");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.date}</td>
      <td>${productsList}</td>
      <td>$${order.total}</td>
      <td>${order.status}</td>
    `;
    ordersBody.appendChild(row);
  });
}

renderOrders();

function confirmOrder(){
  if(cart.length===0) return alert("Carrito vacío");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let newOrder = {
    user: currentUser,
    items: cart,
    total: cart.reduce((sum,i)=>sum+i.price*i.quantity,0),
    status: "pendiente",
    date: new Date().toLocaleString()
  };
  orders.push(newOrder);
  localStorage.setItem("orders",JSON.stringify(orders));

  localStorage.removeItem("cart");
  cart = [];
  renderCart();

  orderStatus.textContent="pendiente";
  alert("Compra confirmada. Estado: pendiente");

  setTimeout(()=>{
    let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    let lastOrder = savedOrders[savedOrders.length-1];
    if(lastOrder && lastOrder.status==="pendiente"){
      lastOrder.status="enviado";
      localStorage.setItem("orders",JSON.stringify(savedOrders));
      orderStatus.textContent="enviado";
    }
  },5*60*1000);
}

function cancelOrder(){
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let lastOrder = orders[orders.length-1];
  if(lastOrder && lastOrder.status==="pendiente"){
    lastOrder.status="cancelado";
    localStorage.setItem("orders",JSON.stringify(orders));
    orderStatus.textContent="cancelado";
    alert("Compra cancelada");
  } else {
    alert("No se puede cancelar. Pedido enviado o inexistente");
  }
}

document.getElementById("cancel-btn").addEventListener("click",cancelOrder);
