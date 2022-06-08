// Scripts for firebase and firebase messaging

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyAXdSIVNX-ET-f7AIuNwXzkMOYNpMCdGdQ",
  authDomain: "menteserena-e4db7.firebaseapp.com",
  projectId: "menteserena-e4db7",
  storageBucket: "menteserena-e4db7.appspot.com",
  messagingSenderId: "607658988158",
  appId: "1:607658988158:web:0e362cde4a3e3b8cc83e2f",
  measurementId: "G-S918Q2BJP5",
  appName: "menteserena-e4db7"

});

console.log(firebaseApp);
const messaging = firebase.messaging(firebaseApp);
/*
firebase.onBackgroundMessage(messaging, (payload) => {
  console.log('Received background message ', payload)
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: 'Background Message body.',
    icon: './images/mente_serena_single_logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
*/