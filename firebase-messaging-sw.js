importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCdvG19MnplrrKlfZdsx6VFIsdLkTHbP3o",
  authDomain: "vital-e22d5.firebaseapp.com",
  projectId: "vital-e22d5",
  messagingSenderId: "76460889955",
  appId: "1:76460889955:web:8e82a93e29357d1a6ce556"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});
