// Importar solo lo necesario desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Configuración de Firebase (usa tus datos)
const firebaseConfig = {
  apiKey: "AIzaSyAGk3qkgrY1_YiUtKG6c6mP_hS2NJWi6qc",
  authDomain: "toxic-vape.firebaseapp.com",
  databaseURL: "https://toxic-vape-default-rtdb.firebaseio.com",
  projectId: "toxic-vape",
  storageBucket: "toxic-vape.appspot.com",
  messagingSenderId: "209917534437",
  appId: "1:209917534437:web:e59070c54f362661c3f40c",
  measurementId: "G-8MQGMN1QJS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencia a la rama "productos"
const productosRef = ref(db, "productos");

// Función para renderizar productos
function renderProductos(snapshot) {
  const productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = ""; // Limpiar contenido

  snapshot.forEach(childSnapshot => {
    const producto = childSnapshot.val();
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>Precio: €${producto.precio}</p>
      <p>Nicotina: ${producto.nicotina}%</p>
      <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
    `;
    productosDiv.appendChild(div);
  });
}

// Escuchar cambios en Firebase en tiempo real
onValue(productosRef, renderProductos);

snapshot.forEach(childSnapshot => {
  const producto = childSnapshot.val();
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <h2>${producto.nombre}</h2>
    <p>Precio: €${producto.precio}</p>
    <p>Nicotina: ${producto.nicotina}%</p>
    ${producto.entrega ? `<p class="entrega">${producto.entrega}</p>` : ""}
    <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
  `;
  productosDiv.appendChild(div);
});
