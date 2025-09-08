const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Registrar usuario
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.find(u => u.email === email)){
      return alert("Usuario ya registrado");
    }

    users.push({email, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso, ahora inicia sesión");
    registerForm.reset();
  });

  // Login
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if(user){
      localStorage.setItem("currentUser", email);
      alert("¡Bienvenido " + email + "!");
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });