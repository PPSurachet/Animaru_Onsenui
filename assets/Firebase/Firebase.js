var firebaseConfig = {
    apiKey: "AIzaSyCez0bnJ60odWOo8kbXGYJpQFcqbxDt3pI",
    authDomain: "animaru-4aea5.firebaseapp.com",
    databaseURL: "https://animaru-4aea5.firebaseio.com",
    projectId: "animaru-4aea5",
    storageBucket: "animaru-4aea5.appspot.com",
    messagingSenderId: "1066577428240",
    appId: "1:1066577428240:web:a636233b70aa19e06eaf95",
    measurementId: "G-JSGHXTEEW0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();