document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'SearchPage') {
        clickPets();
        showSearchShop();
    } else if (page.id === 'ShopSearchPage') {

    } else if (page.id === 'SelectSearchPage') {

    }
});

const showSearchShop = () => {
    $("#clickSearchshop").click(function () {
        $("#showSearchPets").empty();
        $("#categoryButton").empty();

        db.collection("Shops").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const result =
                    /*html*/
                    `<ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile clickShop" id="${doc.data().Name}">
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

                $("#showSearchPets").append(result);

            });
            $(".clickShop").click(function () {
                const Name = $(this).attr('id');
                const Navigator = "#Navigator_search";
                clickSearchShop(Name, Navigator)
                document.querySelector("#Navigator_search").pushPage("views/Search/ShopSearch.html");
            })
        });
    })

};

const clickPets = () => {
    $("#clickSearchPets").click(function () {
        $("#categoryButton").empty();
        const result =
            /*html*/
            `
        <div class="d-flex justify-content-around backgroudSearchbutton pb-2" id="Category">
            <div class="" style="width: 23%;">
                <button type="button" class="btn btnh" id="Dog">หมา</button>
            </div>
            <div class="" style="width: 23%;">
                <button type="button" class="btn btnh" id="Cat">แมว</button>
            </div>
            <div class="" style="width: 23%;">
                <button type="button" class="btn btnh" id="Small">สัตว์เล็ก</button>
            </div>
            <div class="" style="width: 23%;">
                <button type="button" class="btn btnh" id="Water">สัตว์น้ำ</button>
            </div>
        </div>
        `
        $("#categoryButton").append(result);
        getSearchPets();
        clickCategorySearch();
    })
}

const clickCategorySearch = () => {
    $("#Category div button").click(function () {
        const Type = $(this).attr('id');
        getSearchCategoryPets(Type);
    })
}

const getSearchPets = () => {
    $("#showSearchPets").empty();
    db.collection("Pets").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result =
                /*html*/
                `<ons-col class="col-6 p-1">
                  <div class="containerH" id="${doc.data().Breed}">
                     <img src="${doc.data().photoURL}" width="100%">
                     <div>Breed : ${doc.data().Breed}</div>
                     <div>Breeder : ${doc.data().Breeder}</div>
                     <div>Price : ${doc.data().Price}</div>
                  </div>
               </ons-col>`
            $("#showSearchPets").append(result);
        });

        $(".containerH").click(function () {
            const Breed = $(this).attr('id');
            const Navigator = "#Navigator_search";
            selectSearchAnimal(Breed, Navigator)
            document.querySelector("#Navigator_search").pushPage("views/Search/SelectSearch.html");
        })
    });
};

const getSearchCategoryPets = (Type) => {
    $("#showSearchPets").empty();
    db.collection("Pets").where("Type", "==", Type).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result =
                /*html*/
                `<ons-col class="col-6 p-1">
                    <div class="containerH" id="${doc.data().Breed}">
                        <img src="${doc.data().photoURL}" width="100%">
                        <div>Breed : ${doc.data().Breed}</div>
                        <div>Breeder : ${doc.data().Breeder}</div>
                        <div>Price : ${doc.data().Price}</div>
                    </div>
                </ons-col>`
            $("#showSearchPets").append(result);
        });

        $(".containerH").click(function () {
            const Breed = $(this).attr('id');
            const Navigator = "#Navigator_search";
            selectSearchAnimal(Breed, Navigator)
            document.querySelector("#Navigator_search").pushPage("views/Search/SelectSearch.html");
        })
    });
};

const selectSearchAnimal = (Breed, Navigator) => {
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
             <div class="editbtnSelect">
                <button type="button" class="btnSelect" onclick="AddBasketSearch()">ให้บ้าน</button>
             </div>
             `
            selectSearchShop(doc.data().Breeder, Navigator);
            $("#showSelectSearchAnimal").append(result)
        });
    });
};

const selectSearchShop = (Shop, Navigator) => {
    db.collection("Shops").where("Name", "==", Shop).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const result = /*html*/
                `
          <ons-fab position="top left" style="color: black; background-color: rgb(252, 186, 3);" id="BackSelectSearch">
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
            $('#showSelectSearchShop').append(result);
        });

        $("#BackSelectSearch").click(function () {
            document.querySelector(`${Navigator}`).popPage();
        })
    });
};

const clickSearchShop = (Name, Navigator) => {
    db.collection("Shops").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (Name == doc.data().Name) {
                const result = /*html*/
                    `
          <ons-fab position="top left" style="color: black; background-color: rgb(252, 186, 3);" id="BackShop">
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
                showPetSearchShop(doc.data().Name);
                $('#showsearchShop').append(result);
            }
        });
        $('#BackShop').click(function () {
            document.querySelector(`${Navigator}`).popPage();
        })
    });
};

const showPetSearchShop = (Breeder) => {
    db.collection("Pets").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().Breeder == Breeder) {
                const result =
                    /*html*/
                    `<ons-col class="col-6 p-1">
                   <div class="containerH ClickSelectInShop" id="${doc.data().Breed}">
                      <img src="${doc.data().photoURL}" width="100%">
                      <div>Breed : ${doc.data().Breed}</div>
                      <div>Breeder : ${doc.data().Breeder}</div>
                      <div>Price : ${doc.data().Price}</div>
                   </div>
                </ons-col>`
                $("#showPetinSearchShop").append(result);
            }
        });

        $(".ClickSelectInShop").click(function () {
            const Breeder = $(this).attr('id');
            selectSearchAnimal(Breeder, "#Navigator_ShopSearch")
            document.querySelector("#Navigator_ShopSearch").pushPage("views/Search/SelectSearch.html");
        })
    });
};

const AddBasketSearch = () => {
    ons.notification.alert('ให้บ้านสำเร็จ')
}