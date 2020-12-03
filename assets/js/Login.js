$(function () {
    LoginByEmail();
    loginByGoogle();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "Animaru.html"
        }
    });
})

const loginByGoogle = () => {
    $("#signInGoogle").click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })
}

const LoginByEmail = () => {
    $("#signIn").click(function () {
        const email = $("#email").val();
        const password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            window.location.href = "Animaru.html";
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
}