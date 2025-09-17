// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title || 'Vital 💌';
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.imgur.com/7z1i4Hw.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
