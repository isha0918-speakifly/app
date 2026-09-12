// 1. Go to https://console.firebase.google.com -> Create a project (free).
// 2. Project settings -> General -> "Your apps" -> Add a Web app.
// 3. Copy the config object Firebase gives you and paste the values below.
// 4. In the Firebase console, enable:
//      Authentication -> Sign-in method -> Email/Password
//      Firestore Database -> Create database (start in test mode for now)

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
