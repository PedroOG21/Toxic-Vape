import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Configuración Firebase
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

function renderProductos(snapshot) {
  productosDiv.innerHTML = "";
  snapshot.forEach(childSnapshot => {
    const producto = childSnapshot.val();
    const div = document.createElement("div");
    div.className = "producto";

    // Cantidad con color según stock
    const cantidadHTML = producto.cantidad >= 1
      ? `<div class="cantidad verde">${producto.cantidad}</div>`
      : `<div class="cantidad rojo">Agotado</div>`;

    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Nicotina: ${producto.nicotina}%</p>
      <p>Precio: €${producto.precio}</p>
      ${cantidadHTML}
    `;
    productosDiv.appendChild(div);
  });
}

onValue(productosRef, renderProductos);

// Selector de columnas
document.getElementById('one-col').addEventListener('click', () => {
  productosDiv.style.gridTemplateColumns = '1fr';
});
document.getElementById('two-col').addEventListener('click', () => {
  productosDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';
});

// Menú hamburguesa funcional
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Ocultar menú al hacer click en un enlace
const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});
