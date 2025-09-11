import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "toxic-vape.firebaseapp.com",
  projectId: "toxic-vape",
  storageBucket: "toxic-vape.appspot.com",
  messagingSenderId: "209917534437",
  appId: "1:209917534437:web:e59070c54f362661c3f40c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginBtn = document.getElementById("login-btn");
const loginMsg = document.getElementById("login-msg");
const vapersList = document.getElementById("vapers-list");
const loginForm = document.getElementById("login-form");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return loginMsg.textContent = "Completa todos los campos";

  // Verificar admin
  const q = query(collection(db, "admins"), where("email", "==", email), where("password", "==", password));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    loginMsg.textContent = "Correo o contraseña incorrectos";
    return;
  }

  loginForm.style.display = "none";
  vapersList.style.display = "grid";
  cargarVapers();
});

// Cargar vapers
async function cargarVapers() {
  vapersList.innerHTML = "Cargando vapers...";
  const querySnapshot = await getDocs(collection(db, "vapers"));
  vapersList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const vaper = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "vaper-card";

    card.innerHTML = `
  <h3>${vaper.nombre}</h3>
  <img src="${vaper.imagen}" alt="${vaper.nombre}">
  <p><strong>Nicotina:</strong> ${vaper.nicotina}</p>
  <p><strong>Precio:</strong> ${vaper.precio} €</p>
  <p><strong>Cantidad:</strong> <span id="cantidad-${id}">${vaper.cantidad}</span></p>
  <div class="controls">
    <button class="btn-increase" onclick="actualizarCantidad('${id}', ${vaper.cantidad} + 1)">
      <i class="fas fa-plus"></i>
    </button>
    <button class="btn-decrease" onclick="actualizarCantidad('${id}', ${vaper.cantidad} - 1)">
      <i class="fas fa-minus"></i>
    </button>
  </div>
`;
vapersList.appendChild(card);

  });
}

// Actualizar cantidad
window.actualizarCantidad = async function (id, nuevaCantidad) {
  if (nuevaCantidad < 0) nuevaCantidad = 0;

  const refDoc = doc(db, "vapers", id);
  await updateDoc(refDoc, { cantidad: nuevaCantidad });

  document.getElementById(`cantidad-${id}`).textContent = nuevaCantidad;
};
