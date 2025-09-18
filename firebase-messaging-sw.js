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
