// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  // apiKey: "AIzaSyBGJg-XD5EXTpPXtJriRTTmEckQrJjH47U",
  // authDomain: "test-notifications-e925a.firebaseapp.com",
  // projectId: "test-notifications-e925a",
  // storageBucket: "test-notifications-e925a.appspot.com",
  // messagingSenderId: "857970139179",
  // appId: "1:857970139179:web:ace6e93e5a2b18f2f88a6e"
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

// if ('serviceWorker' in navigator) {
//   console.log('in the service worker')
//   navigator.serviceWorker.register('../firebase-messaging-sw.js').then(function(registration) {
//     console.log('Registration successful, scope is:', registration.scope)
//   }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err)
//   })
// }

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions)
})