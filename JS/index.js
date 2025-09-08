  const products = [
    { id: 1, name: "Mouse Gamer", price: 350 },
    { id: 2, name: "Teclado Mecánico", price: 1200 },
    { id: 3, name: "Auriculares", price: 800 },
    { id: 4, name: "Laptop Thinkpad", price: 1500},
    { id: 5, name: "Tablet lenovo M11", price: 800},
    { id: 6, name: "Gabinete de PC", price: 750}
  ];

  let currentUser = localStorage.getItem("currentUser");

  // Mostrar productos por medio de una funcion que tiene un for each que itera sobre cada objeto creado, y los muestra como elementos HTML usando DOM
  function renderProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    products.forEach(product => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      col.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Precio: $${product.price}</p>
            <img src="https://img.freepik.com/foto-gratis/arreglo-coleccion-estacionaria-moderna_23-2149309643.jpg"/>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
          </div>
        </div>
      `;
      list.appendChild(col);
    });
  }


  
  function addToCart(id){
    if(!currentUser){ // Alerta que avisa al usuario que no puede realizar esa acción porque no sea registrado o iniciado sesion como usuario.
      alert("Debes iniciar sesión para agregar productos al carrito");
      window.location.href = "login.html";
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if(existing) existing.quantity += 1;
    else cart.push({...product, quantity:1});

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} agregado al carrito`);
  }

  function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum,item)=>sum+item.quantity,0);
    document.getElementById("cart-count").textContent = total;
  }

  const userDisplay = document.getElementById("user-display");
  const logoutBtn = document.getElementById("logout-btn");

  if(currentUser){
    userDisplay.textContent = currentUser;
    logoutBtn.style.display = "inline-block";
  } else {
    userDisplay.textContent = "";
    logoutBtn.style.display = "none";
  }

  logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("currentUser");
    alert("Sesión cerrada");
    window.location.reload();
  });

  renderProducts();
  updateCartCount();