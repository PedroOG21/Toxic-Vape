import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGk3qkgrY1_YiUtKG6c6P_hS2NJWi6qc",
  authDomain: "toxic-vape.firebaseapp.com",
  databaseURL: "https://toxic-vape-default-rtdb.firebaseio.com",
  projectId: "toxic-vape",
  storageBucket: "toxic-vape.appspot.com",
  messagingSenderId: "209917534437",
  appId: "1:209917534437:web:e59070c54f362661c3f40c",
  measurementId: "G-8MQGMN1QJS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const productosRef = ref(db, "productos");
const productosDiv = document.getElementById("productos");

// Estado admin
let isAdmin = false;

// Render productos
function renderProductos(snapshot) {
  productosDiv.innerHTML = "";
  snapshot.forEach(childSnapshot => {
    const producto = childSnapshot.val();
    const id = childSnapshot.key;

    const div = document.createElement("div");
    div.className = "producto";

    // Cantidad con color
    const cantidadHTML = producto.cantidad >= 1
      ? `<div class="cantidad verde">${producto.cantidad}</div>`
      : `<div class="cantidad rojo">Agotado</div>`;

    // Botones solo si es admin
    const adminControls = isAdmin ? `
      <div class="controls">
        <button onclick="updateCantidad('${id}', ${producto.cantidad}+1)">+1</button>
        <button onclick="updateCantidad('${id}', ${producto.cantidad}-1)">-1</button>
      </div>` : "";

    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Nicotina: ${producto.nicotina}%</p>
      <p>Precio: €${producto.precio}</p>
      ${cantidadHTML}
      ${adminControls}
    `;
    productosDiv.appendChild(div);
  });
}

onValue(productosRef, renderProductos);

// Función actualizar cantidad
window.updateCantidad = function (id, nuevaCantidad) {
  if (nuevaCantidad < 0) nuevaCantidad = 0;
  update(ref(db, 'productos/' + id), { cantidad: nuevaCantidad });
};

// Selector de columnas
document.getElementById('one-col').addEventListener('click', () => {
  productosDiv.style.gridTemplateColumns = '1fr';
});
document.getElementById('two-col').addEventListener('click', () => {
  productosDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => menu.classList.toggle('active'));
document.querySelectorAll('#menu a').forEach(link => link.addEventListener('click', () => menu.classList.remove('active')));

// --- LOGIN ---
const loginModal = document.getElementById('login-modal');
const adminLink = document.getElementById('admin-link');
const closeLogin = document.getElementById('close-login');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

const ADMIN_EMAIL = "admin@toxic.vap";
const ADMIN_PASSWORD = "123456789";

adminLink.addEventListener('click', () => loginModal.style.display = 'block');
closeLogin.addEventListener('click', () => loginModal.style.display = 'none');

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('admin-email').value;
  const pass = document.getElementById('admin-password').value;

  if(email === ADMIN_EMAIL && pass === ADMIN_PASSWORD){
    isAdmin = true;
    loginModal.style.display = 'none';
    // Render productos otra vez para mostrar botones
    onValue(productosRef, renderProductos);
  } else {
    loginError.textContent = "Correo o contraseña incorrectos";
  }
});
