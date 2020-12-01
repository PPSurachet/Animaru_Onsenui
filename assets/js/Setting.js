document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id === 'SettingPage') {
        SignOut();
    } else if (page.id === 'myShopPage') {

    } else if (page.id === 'profilePage') {

    }
});

const SignOut = () => {
    $("#signOut").click(function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "login.html"
        }).catch(function (error) {
            // An error happened.
        });
    })
}