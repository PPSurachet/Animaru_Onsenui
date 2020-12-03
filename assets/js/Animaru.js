$(function () {
    checkUserSignIn();
})

const checkUserSignIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            profileUser(user);
            getBasketForUser(user);
            // user.updateProfile({
            //     location: "32/11 หมู่ 1 ถ.วิชิตสงคราม ต.กะทู้ อ.กะทู้ จ.ภูเก็ต"
            // }).then(function () {
            //     console.log("add Location");
            // }).catch(function (error) {
            //     // An error happened.
            // });
        } else {
            window.location.href = "Login.html"
        }
    });
}

const profileUser = (user) => {
    $("#showProfile").empty();
    const result =
        `                    
        <ons-row class="d-flex justify-content-start">
            <img src="${user.photoURL}" alt="" class="imgprofile">
            <div class="profileName">${user.displayName}</div>
        </ons-row>
        `
    $("#showProfile").append(result)
}