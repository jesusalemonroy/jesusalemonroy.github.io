// Guardar usuario en localStorage
function saveUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    alert("El usuario ya existe");
    return false;
  }
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario registrado con éxito");
  return true;
}

// Login de usuario
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "index.html"; // volver al catálogo
  } else {
    alert("Credenciales inválidas");
  }
}

// Manejo de formularios
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm?.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    loginUser(email, pass);
  });

  registerForm?.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const pass = document.getElementById("registerPassword").value;
    if(saveUser(email, pass)) {
      // Opcional: iniciar sesión automáticamente después de registrarse
      localStorage.setItem("currentUser", JSON.stringify({email, password: pass}));
      window.location.href = "index.html";
    }
  });
});
