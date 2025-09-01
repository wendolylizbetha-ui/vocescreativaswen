import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getDatabase, ref, set, onChildAdded } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "voces-creativas.firebaseapp.com",
    databaseURL: "https://voces-creativas-default-rtdb.firebaseio.com/",
    projectId: "voces-creativas",
    storageBucket: "voces-creativas.appspot.com",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Guardar mensaje
const form = document.getElementById('messageForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if(name && message){
        const mensajeId = Date.now();
        set(ref(database, 'mensajes/' + mensajeId), {
            nombre: name,
            mensaje: message,
            fecha: new Date().toISOString()
        });

        form.reset();
    }
});

// Mostrar mensajes en tiempo real
const messagesList = document.getElementById('messages');
onChildAdded(ref(database, 'mensajes'), (data) => {
    const mensaje = data.val();
    const li = document.createElement('li');
    li.className = 'message-card';
    li.innerHTML = `
        <div class="message-name">${mensaje.nombre}</div>
        <div class="message-text">${mensaje.mensaje}</div>
    `;
    messagesList.prepend(li);
});

