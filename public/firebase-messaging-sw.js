// Scripts for firebase and firebase messaging
// Scripts for firebase and firebase messagin
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     }).catch(function(err) {
//       console.log('Service worker registration failed, error:', err);
//     });
//   }

firebase.initializeApp({
  apiKey: "AIzaSyAzb5R30dzhBQ2cZ8JuEFl8OJqwcfNpVKg",
  authDomain: "map-api-355915.firebaseapp.com",
  projectId: "map-api-355915",
  storageBucket: "map-api-355915.appspot.com",
  messagingSenderId: "647724256939",
  appId: "1:647724256939:web:60c3b8f0edd710f403b1ee",
  measurementId: "G-95HZBVNTMD",
});

const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
