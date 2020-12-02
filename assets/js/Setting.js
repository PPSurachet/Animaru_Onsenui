document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id === 'SettingPage') {
        myStore();
        SignOut();
        gotoEdit();
    } else if (page.id === 'myShopPage') {
        goBackSetting();
    } else if (page.id === 'profilePage') {
        const user = firebase.auth().currentUser;
        editProfile(user)
    }
    else if (page.id === 'addAnimalform') {
        confirmBtn();
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
    $(".showMyShop").empty();
    db.collection("Pets").where("Breeder", "==", Breeder).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result = `
            <ons-col class="col-6 p-1">
            <div class="containerH">
            <img src="${doc.data().photoURL}" width="100%">
                <div>Breed : ${doc.data().Breed}</div>
                <div>Breeder :  ${doc.data().Breeder}</div>
                <div>Bark : Yes</div>
                <ons-row class="mt-2 text-center">
                    <ons-col class="col-6 p-0">
                        <button class="btn btnEdit">Edit</button>
                    </ons-col>
                    <ons-col class="col-6 p-0">
                        <button class="btn btnDelete" onclick="deletePetsInShop('${doc.id}')">Delete</button>
                    </ons-col>
                </ons-row>
            </div>
        </ons-col>
            `
            $(".showMyShop").append(result);
        });
    });
}

const deletePetsInShop = (docID) => {
    db.collection("Pets").doc(docID).delete().then(function() {
        ons.notification.alert({
            title: "Animaru",
            message: "Delete Pets Success",
        }).then(function(){
            storePage();
        })
    }).catch(function(error) {
        ons.notification.alert({
            title: "Animaru",
            message: error,
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
//----------------------- add data ---------------------------------------
const addAnimaruForm = () => {
    const user = firebase.auth().currentUser;
    db.collection("Shops").where("Owner", "==", user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $("#Breeder").val(doc.data().Name);
        });
    });
    document.querySelector("#Navigator_Shop").pushPage("views/Setting/Addanimalform.html");

}

const backfromAdd = () => {
    document.querySelector("#Navigator_setting").popPage();
}

//----------------------- Edit profile ---------------------------------------
const gotoEdit = () => {
    $("#editProfilePage").click(function () {
        document.querySelector("#Navigator_setting").pushPage("views/Setting/profile.html");
    })
}

const editProfile = (user) => {
    const result = /*html*/
        `
        <div class="text-center">
            <img src="${user.photoURL}" class="editImg">
        </div>
        <div class="profileList">
            <div class="title-username">
                Name
            </div>
            <ons-row class="row align-items-center" style="padding-top: 0.5rem;padding-bottom: 0.3rem;">
                <div class="col-2"></div>
                <div class="col-9"><input type="text" class="form-control" id="username"
                        value="${user.displayName}">
                </div>
                <div class="right icon-pencil">
                    <ons-icon size="30px" icon="md-edit"></ons-icon>
                </div>
            </ons-row>
        </div>
        <div class="profileList">
            <div class="title-username">
                Email
            </div>
            <ons-row class="row align-items-center" style="padding-top: 0.5rem;padding-bottom: 0.3rem;">
                <div class="col-2"></div>
                <div class="col-9"><input type="text" class="form-control" id="emailID" disabled
                        value="${user.email}">
                </div>
            </ons-row>
        </div>
        <div class="profileList">
            <div class="title-username">
                Gender
            </div>
            <ons-row class="row align-items-center" style="padding-top: 0.5rem;padding-bottom: 0.3rem;">
                <div class="col-2"></div>
                <div class="col-9"><input type="text" class="form-control" id="genderID" value="Male">
                </div>
                <div class="right icon-pencil">
                    <ons-icon size="30px" icon="md-edit"></ons-icon>
                </div>
            </ons-row>
        </div>
        <div class="profileList">
            <div class="title-username">
                DOB
            </div>
            <ons-row class="row align-items-center" style="padding-top: 0.5rem;padding-bottom: 0.3rem;">
                <div class="col-2"></div>
                <div class="col-9"><input type="text" class="form-control" id="DOBID" value="30/02/1999">
                </div>
                <div class="right icon-pencil">
                    <ons-icon size="30px" icon="md-edit"></ons-icon>
                </div>
            </ons-row>
        </div>
        <div class="profileList">
            <div class="title-username">
                Location
            </div>
            <ons-row class="row align-items-center" style="padding-top: 0.5rem;padding-bottom: 0.3rem;">
                <div class="col-2"></div>
                <div class="col-9"><input type="text" class="form-control" id="LocationID"
                        value="ที่อยู่ : 0/23 ถนน.14 sector 3 เขตครึ่งเสี้ยวหลัง ดวงจันทร์">
                </div>
                <div class="right icon-pencil">
                    <ons-icon size="30px" icon="md-edit"></ons-icon>
                </div>
            </ons-row>
        </div>
        <div class="editbtnSelect">
            <input type="button" class="confirmEditBtn" value="Confirm">
        </div>
        </div>
    `
    $("#showProfileEdit").append(result)

    $("#confirmEditBtn").click(function () {
        console.log("eiei");
    })
}

const backfromProfile = () => {
    document.querySelector("#Navigator_setting").popPage();
}

const confirmBtn = () => {
    $("#AddPets").click(function () {
        const arraType = [
            {
                Dog: "https://firebasestorage.googleapis.com/v0/b/animaru-4aea5.appspot.com/o/Animal%2FPug.png?alt=media&token=97585b37-7bdf-455a-96f9-3597054c6f00",
                Cat: "https://firebasestorage.googleapis.com/v0/b/animaru-4aea5.appspot.com/o/Animal%2FMain%20Coon.png?alt=media&token=c77d42d4-82a2-4e6b-9195-32f9c73b07ed",
                Small: "https://firebasestorage.googleapis.com/v0/b/animaru-4aea5.appspot.com/o/Animal%2FGuinea%20Pig.png?alt=media&token=7ff0b0f1-c161-42e5-ad76-cb16a6fab046",
                Water: "https://firebasestorage.googleapis.com/v0/b/animaru-4aea5.appspot.com/o/Animal%2FBetta.png?alt=media&token=91d6b64f-5ce1-42cb-8f45-d8ee90fc6c71",
            }
        ]

        const Breed = $("#Breed").val();
        const Breeder = $("#Breeder").val();
        const Daddy = $("#Daddy").val();
        const Mommy = $("#Mommy").val();
        const Price = $("#Price").val();
        const Gender = $("input[name='gender']:checked").val();
        const Age = $("#Age").val();
        const Years = $("#Years").val();
        const Description = $("#Descriptions").val();
        const Type = $("#Type").val();
        const photoURL = arraType[0][`${Type}`];

        db.collection("Pets").add({
            Breed: Breed,
            Breeder: Breeder,
            Daddy: Daddy,
            Mommy: Mommy,
            Gender: Gender,
            Price: Price,
            Age: Age + " " + Years,
            Type:Type,
            Description: Description,
            photoURL: photoURL,
            Basket : [],
        }).then(function (docRef) {
            storePage();
            ons.notification.alert({
                title: "Animaru",
                message: "Add Pets Success",
            }).then(function(){
                document.querySelector("#Navigator_Shop").popPage();
            })
        }).catch(function (error) {
            ons.notification.alert({
                title: "Animaru",
                message: error,
            });
        });
    })
}

