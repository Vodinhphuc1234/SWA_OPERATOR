import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAzb5R30dzhBQ2cZ8JuEFl8OJqwcfNpVKg",
  authDomain: "map-api-355915.firebaseapp.com",
  projectId: "map-api-355915",
  storageBucket: "map-api-355915.appspot.com",
  messagingSenderId: "647724256939",
  appId: "1:647724256939:web:60c3b8f0edd710f403b1ee",
  measurementId: "G-95HZBVNTMD",
};

if (firebase?.apps?.length <= 0) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase Cloud Messaging and get a reference to the service


const getMessagingToken = async () => {
  const messaging = firebase.messaging();
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
  }

  try {
    let token = await messaging.getToken({ vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY });
    return token;
  } catch (error) {
    console.log(err);
  }
};

const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export { getMessagingToken, onMessageListener };
