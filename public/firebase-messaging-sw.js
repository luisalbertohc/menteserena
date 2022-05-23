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
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions)
})

self.addEventListener('notificationclick', (event) => {

  event.notification.close()  
  if (!event.notification.data.pathname) return
  const pathname = event.notification.data.pathname
  const url = new URL(pathname, self.location.origin).href
  
  event.waitUntil(self.clients
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then((clientsArr) => {
      const hadWindowToFocus = clientsArr.some((windowClient) => windowClient.url === url ? (windowClient.focus(), true) : false)
      if (!hadWindowToFocus)self.clients
        .openWindow(url)
        .then((windowClient) => windowClient ? windowClient.focus() : null)
    })
  )
})

// function handleClick (event) {
//   event.notification.close()
//   // Open the url you set on notification.data
//   clients.openWindow(event.notification.data.url)
//   console.log(event.notification)
//   console.log(event.notification.data)
// }

// self.addEventListener('notificationclick', handleClick)