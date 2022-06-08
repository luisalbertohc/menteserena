import config from '@config';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
    apiKey: "AIzaSyAXdSIVNX-ET-f7AIuNwXzkMOYNpMCdGdQ",
    authDomain: "menteserena-e4db7.firebaseapp.com",
    projectId: "menteserena-e4db7",
    storageBucket: "menteserena-e4db7.appspot.com",
    messagingSenderId: "607658988158",
    appId: "1:607658988158:web:0e362cde4a3e3b8cc83e2f",
    measurementId: "G-S918Q2BJP5",
    appName: "menteserena-e4db7"
}

export const tokenFirebase = {
    init: async function (user) {
        //initializing firebase app
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        try{
            //requesting notification permission from browser
            const status = await Notification.requestPermission();
            if (status && status === 'granted') {
                //getting token from FCM
                const fcm_token = await getToken( messaging,
                        { vapidKey: 'BKpGmGaE2RpLDNa1Mbo4WJkUTOrHxZumHqL1x9KgJ_wzz9Z0X4pj9TihYQpxR3moiR4zFVPemp6ug-tNWASKpaA' }
                    ).then((currentToken) =>{
                        if (currentToken) {
                            // Send the token to server and update it
                            let operationType = "subscribe";
                            dbToken(user, operationType, currentToken);
                            //console.log(userId);
                            //console.log(currentToken);
                            
                            } else {
                            // Show permission request UI
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    }).catch((err) =>{
                        console.log('An error occurred while retrieving token. ', err);
                    })
            }
        }catch(err){
            console.error(err);
            return null;
        }
    },
    listen: async function () {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        try {
            new Promise((resolve) => {
                onMessage(messaging, (payload) => {
                    const options = {
                        type: payload.data.type,
                        position: "top-right",
                        autoClose: payload.data.autoClose,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: payload.data.theme
                    }
                    const Msg = ({ closeToast }) => (
                        <div>
                         <h3> { payload.data.title }</h3>
                         <p> { payload.data.body } </p>
                         <a href={payload.data.linkUrl} > <b>{payload.data.linkName}</b> </a>
                        </div>
                    )
                    toast(<Msg />, options);
                    
                    console.log('Message received. ', payload);
                    resolve(payload);
                })
            })

            
            
        } catch (error) {
            console.log('Cant receive messages', error)
        }

    },
    delete: async function (){
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        return deleteToken(messaging).then(() => {
           
            //console.log(user);
            //let operationType = "unsubscribe";
            //dbToken(user.user, operationType, "for now this is a currentToken")
            console.log('unsubscribe Token deleted.');
            
          }).catch((err) => {
            console.log('Unable to delete token. ', err);
          });    
    }
}

//API

export async function dbToken(user, operationType, currentToken){
    let url = config.MENTE_SERENA_API_BASE_URL + "/api/push_notifications";
    const HEADERS = new Headers()
    HEADERS.append("Content-Type", "application/json")
    const DATA = JSON.stringify({
        "operation_type": operationType,
        "user_id": user.id,
        "email": user.email,
        "id_device": "id dispositivo",
        "token_device": currentToken,
        "ip_address": ""
    })
    const REQUEST = {
        method: 'POST',
        headers: HEADERS,
        body: DATA,
        redirect: 'follow'
    }
    const x = await fetch(url, REQUEST)
    .then(response => response.json())
    //.then(result => console.log(result))
    .catch(error => console.log('error', error))
}



