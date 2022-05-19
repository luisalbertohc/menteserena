import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging"

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

// const firebaseApp = initializeApp(firebaseConfig)
// const messaging = getMessaging(firebaseApp)

// send data to backend
const sendToken = (currentToken, userId) => {
  const HEADERS = new Headers()
  HEADERS.append("Content-Type", "application/json")
  
  const DATA = JSON.stringify({
    "operation_type": "subscribe",
    "user_id": userId,
    "id_device": "id dispositivo",
    "token_device": currentToken,
    "ip_address": "localhost"
    // "ip_address": ipAddress
  })
  
  console.log(DATA)

  const REQUEST = {
    method: 'POST',
    headers: HEADERS,
    body: DATA,
    redirect: 'follow'
  }

  fetch("https://app-38572.on-aptible.com/api/push_notifications", REQUEST)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}

export const getTokenFirebase = (userId) => {
  // return getToken(messaging, { vapidKey: 'BJ-2HeXaEg_kZzBc52mXE0cMZEBTq8Zqb9_FxztyRe_eSzzWXUSF6_159JRcVYh7lkddXwF9pFPom-01iA-IHa0' }).then((currentToken) => {
  return getToken(messaging, { vapidKey: 'BKpGmGaE2RpLDNa1Mbo4WJkUTOrHxZumHqL1x9KgJ_wzz9Z0X4pj9TihYQpxR3moiR4zFVPemp6ug-tNWASKpaA' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken)
      // setTokenFound(true)
      sendToken(currentToken, userId)
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.')
      // setTokenFound(false)
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // catch error while creating client token
  })
}

export const deleteTokenFirebase = () => {
  return deleteToken(messaging).then((currentToken) => {
    if (currentToken) {
      console.log('Token deleted: ', currentToken)
      // setTokenFound(false)
    } else {
      console.log('The token could not be deleted')
      // setTokenFound(true)
    }
  }).catch((err) => {
    console.log('An error occurred while trying to remove the token. ', err)
  })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
})


