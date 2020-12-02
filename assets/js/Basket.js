document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'BasketPage') {

    } else if (page.id === 'OrderPage') {
        backBasket();
    }

});

const getBasketForUser = (user) => {
    $("#showBasket").empty();
    var countItem = 0;
    db.collection("Pets").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().Basket.includes(user.uid)) {
                const result = /*html*/
                    `
                <div class="borderItem">
                    <ons-row class="d-flex justify-content-center align-items-center mt-2">
                    <img class="BasketPets" src="${doc.data().photoURL}" id="${doc.data().Breed}" width="170" height="140">
                    <div class="ml-2">
                        <div class="title-basket">Breed : ${doc.data().Breed}</div>
                        <div class="title-basket">Breeder : ${doc.data().Breeder}</div>
                        <ons-row class="d-flex justify-content-between" style="color: rgb(255, 0, 0);">
                            <div class="title-basket">ราคา :</div>
                            <div class="title-basket">${doc.data().Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                        </ons-row>
                        <div class="justify-content-between mt-2">
                            <button class="btn button_color btn-xs confirmOrder" id="${doc.data().Breed}">ยืนยัน</button>
                            <button class="btn button_color_Delete btn-xs" onclick="deleteBasket('${doc.id}','${doc.data().Breed}')">ลบออก</button>
                        </div>
                    </div>
                </ons-row>
                </div>
                `
                $("#showBasket").append(result)
                countItem++;
            }
        });
        if (countItem == 0) {
            const result = /*html*/
                `
            <div class="text-center mt-5 noBasket">
                No Basket Now
            </div>
            `
            $("#showBasket").append(result)
        }


        $(".BasketPets").click(function () {
            const Breed = $(this).attr('id');
            basketSelectPets(Breed)
            document.querySelector("#Navigator_basket").pushPage('views/Basket/SelectBasket.html');
        })

        $(".confirmOrder").click(function () {
            const Breed = $(this).attr('id');
            orderPage(Breed)
            document.querySelector("#Navigator_basket").pushPage('views/Basket/Order.html');
        })
    });
}

const basketSelectPets = (Breed) => {
    db.collection("Pets").where("Breed", "==", Breed).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result = /*html*/
                `
                <div class="containerSelect text-center" style="background-color:white; margin:0.70rem;">
                    <img src="${doc.data().photoURL}" width="60%" height="200px">
                </div>
                <div class="textSelect">
                    <div><b>Breed</b> : ${doc.data().Breed}</div>
                    <div><b>Breeder</b> : ${doc.data().Breeder}</div>
                    <div><b>location</b> : ที่อยู่ : 0/23 ถนน.14 sector 3 เขตครึ่งเสี้ยวหลัง ดวงจันทร์</div>
                    <div><b>Daddy</b> : ${doc.data().Daddy} </div>
                    <div><b>Mommy</b> : ${doc.data().Mommy}</div>
                    <div><b>Gender</b> : ${doc.data().Gender}</div>
                    <div><b>Price</b> : ${doc.data().Price}</div>
                    <div><b>Description</b> : ${doc.data().Description} </div>
                </div>
                `
            selectBasketShop(doc.data().Breeder);
            $("#showSelectBasketPets").append(result)
        });
    });
};

const selectBasketShop = (Shop) => {
    db.collection("Shops").where("Name", "==", Shop).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result = /*html*/
                `
            <ons-fab position="top left" style="color: black; background-color: rgb(252, 186, 3);" id="BackSelectBasket">
                    <i class="material-icons md-48" style="margin-top: 16px;">arrow_back</i>
            </ons-fab>
            <div class="Shopprofile">
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
                    </ons-row>
            </div>
                `
            $('#showSelectBasketShop').append(result);
        });

        $("#BackSelectBasket").click(function () {
            document.querySelector("#Navigator_basket").popPage();
        })
    });
};

const deleteBasket = (docID, Breed) => {
    const user = firebase.auth().currentUser;
    ons.notification.confirm({
        message: "Are You Sure ?",
        title: "Delete " + Breed,
        primaryButtonIndex: 1,
        callback: function (index) {
            if (index == 1) {
                db.collection("Pets").doc(docID).update({
                    Basket: firebase.firestore.FieldValue.arrayRemove(user.uid)
                }).then(function () {
                    getBasketForUser(user);
                }).catch(function () {

                })
            }
        }
    })
};

const orderPage = (Breed) => {
    db.collection("Pets").where("Breed", "==", Breed).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result = /*html*/
                `
                <div class="ml-4 mt-4 h5">ร้านค้า ${doc.data().Breeder}</div>
                <div class="borderItem">
                    <ons-row class="d-flex justify-content-center align-items-center">
                        <img class="" src="${doc.data().photoURL}" width="170" height="120">
                        <div class="ml-2">
                            <div class="title-basket">Breed : ${doc.data().Breed}</div>
                            <div class="title-basket">Breeder : ${doc.data().Breeder}</div>
                            <ons-row class="d-flex justify-content-between" style="color: rgb(255, 0, 0);">
                                <div class="title-basket">ราคา :</div>
                                <div class="title-basket">${doc.data().Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                            </ons-row>
                        </div>
                    </ons-row>
                </div>
                `
            $("#showOrderPets").append(result)
        });
    });
}

const backBasket = () => {
    $("#BackBasket").click(function () {
        document.querySelector("#Navigator_basket").popPage();
    })
}