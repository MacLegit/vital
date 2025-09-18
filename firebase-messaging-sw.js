const firebaseConfig = {
    apiKey: "AIzaSyCdvG19MnplrrKlfZdsx6VFIsdLkTHbP3o",
    authDomain: "vital-e22d5.firebaseapp.com",
    databaseURL: "https://vital-e22d5-default-rtdb.firebaseio.com",
    projectId: "vital-e22d5",
    storageBucket: "vital-e22d5.appspot.com",
    messagingSenderId: "76460889955",
    appId: "1:76460889955:web:8e82a93e29357d1a6ce556"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const messaging = firebase.messaging();

  const mensagensContainer = document.getElementById('mensagensContainer');
  const mensagemInput = document.getElementById('mensagemInput');
  const btnEnviar = document.getElementById('btnEnviar');

  // Notificações Push
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      messaging.getToken({
        vapidKey: "BE7fkACMxa1j4Zc9PoYq0Wz-sv01OkZZ3SHfjKbdWZYd2lUcoaFiKcOTnmGRN1wnqRPPbDsnRqiSlKZsoV50Pyk"
      }).then(currentToken => {
        console.log('Token de notificação:', currentToken);
      }).catch(err => console.error('Erro ao obter token:', err));
    }
  });

  messaging.onMessage(payload => {
    console.log('Mensagem recebida:', payload);
    const texto = payload.notification?.body || 'Nova mensagem!';
    mostrarMensagem(texto);
  });

  let filaOffline = [];

  function mostrarMensagem(texto){
    const div = document.createElement('div');
    div.className = 'mensagem';
    div.textContent = texto;
    mensagensContainer.appendChild(div);
    div.scrollIntoView({behavior: 'smooth'});

    if(Notification.permission === 'granted'){
      new Notification('Nova mensagem 💜', {body: texto});
    }
  }

  btnEnviar.addEventListener('click', () => {
    const texto = mensagemInput.value.trim();
    if(!texto) return;

    const msg = { texto, timestamp: Date.now() };

    if(navigator.onLine){
      db.ref('mensagens').push(msg);
    } else {
      filaOffline.push(msg);
      mostrarMensagem(texto);
    }
    mensagemInput.value = '';
  });

  window.addEventListener('online', () => {
    filaOffline.forEach(msg => db.ref('mensagens').push(msg));
    filaOffline = [];
  });

  db.ref('mensagens').on('child_added', snapshot => {
    const msg = snapshot.val();
    const agora = Date.now();
    if(msg.timestamp > agora){
      setTimeout(() => mostrarMensagem(msg.texto), msg.timestamp - agora);
    } else {
      mostrarMensagem(msg.texto);
    }
  });

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(reg => console.log('Service Worker registrado ✅'))
      .catch(err => console.error('Erro SW:', err));
  }

importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCdvG19MnplrrKlfZdsx6VFIsdLkTHbP3o",
  authDomain: "vital-e22d5.firebaseapp.com",
  databaseURL: "https://vital-e22d5-default-rtdb.firebaseio.com",
  projectId: "vital-e22d5",
  storageBucket: "vital-e22d5.appspot.com",
  messagingSenderId: "76460889955",
  appId: "1:76460889955:web:8e82a93e29357d1a6ce556"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("Mensagem em segundo plano:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png" // opcional, adicione um ícone no repo
  });
});
