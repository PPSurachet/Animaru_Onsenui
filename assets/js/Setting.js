document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id === 'SettingPage') {
        myStore();
        SignOut();
    } else if (page.id === 'myShopPage') {
        goBackSetting();
    } else if (page.id === 'profilePage') {

    }
});

const myStore = () => {
    $("#myStorePage").click(function () {
        storePage();
        document.querySelector('#Navigator_setting').pushPage("views/Setting/MyShop.html")
    })
}

const storePage = () => {
    const user = firebase.auth().currentUser;
    $("#showMyShop").empty();
    db.collection("Shops").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().Owner == user.uid) {
                const result =
                    /*html*/
                    `
                <ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile">
                    <ons-col class="col-5">
                        <img src="${doc.data().PhotoURL}" class="pixprofile" style="border-radius: 100%;
                        border: 5px solid white;">
                    </ons-col>
                    <ons-col class="col-7 text">
                        <div>${doc.data().Name}</div>
                        <ons-row class="d-flex justify-content-start container1">
                        <ons-col class="col-4 editH">
                            ${doc.data().Type}
                        </ons-col>
                        </ons-row>
                        <div>คะแนนร้านค้า : ${doc.data().Rating}</div>
                    </ons-col>
                </ons-row>`
                showPetsMyShop(doc.data().Name)
                $("#showMyShop").append(result)
            }
        });
    });
}

const showPetsMyShop = (Breeder) => {
    db.collection("Pets").where("Breeder", "==", Breeder).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

        });
    });
}

const goBackSetting = () => {
    $("#backSetting").click(function () {
        document.querySelector("#Navigator_setting").popPage();
    })

}

const SignOut = () => {
    $("#signOut").click(function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "login.html"
        }).catch(function (error) {
            // An error happened.
        });
    })
}