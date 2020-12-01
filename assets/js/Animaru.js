$(function () {
    checkUserSignIn();
})

const checkUserSignIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
            // var providerData = user.providerData;
            // console.log("displayname => " + displayName);
            // console.log("email => " + email);
            // console.log("emailVerified => " + emailVerified);
            // console.log("photoURL => " + photoURL);
            // console.log("isAnonymous => " + isAnonymous);
            // console.log("uid => " + uid);
            // console.log("proviederData => " + providerData);
        } else {
            window.location.href = "Login.html"
        }
    });
}