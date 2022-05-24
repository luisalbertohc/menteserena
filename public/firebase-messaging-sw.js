// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAXdSIVNX-ET-f7AIuNwXzkMOYNpMCdGdQ",
  authDomain: "menteserena-e4db7.firebaseapp.com",
  projectId: "menteserena-e4db7",
  storageBucket: "menteserena-e4db7.appspot.com",
  messagingSenderId: "607658988158",
  appId: "1:607658988158:web:0e362cde4a3e3b8cc83e2f",
  measurementId: "G-S918Q2BJP5"
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: './images/mente_serena_single_logo.png'
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
