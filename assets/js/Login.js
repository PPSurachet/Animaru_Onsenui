$(function () {
    LoginByEmail();
})

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