const db = firebase.firestore();

document.addEventListener('init', function (event) {
   var page = event.target;

   if (page.id === 'HomePage') {
      getRecommededPets();
      shopProfileShop();
      clickCategory();
   } else if (page.id === 'ShopPage') {

   } else if (page.id === 'SelectPage') {

   }
});

const getRecommededPets = () => {
   $("#showItemRecomended").empty();
   db.collection("Pets").limit(4).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         const result =
            /*html*/
            `<ons-col class="col-6 p-1 clickAnimal">
         <div class="containerH" id="${doc.data().Breed}">
            <img src="${doc.data().photoURL}" width="100%">
            <div>Breed : ${doc.data().Breed}</div>
            <div>Breeder : ${doc.data().Breeder}</div>
            <div>Price : ${doc.data().Price}</div>
         </div>
      </ons-col>`
         $("#showItemRecomended").append(result);
      });

      $(".containerH").click(function () {
         const ID = $(this).attr('id');
         const Navigator = "#Navigator_home";
         selectAnimal(ID, Navigator)
         document.querySelector("#Navigator_home").pushPage("views/Home/Select.html");
      })
   });
};

const shopProfileShop = () => {
   $("#showShopProfile").empty();
   db.collection("Shops").limit(2).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         const result =
            /*html*/
            `<ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile clickShop" id="${doc.data().Name}">
         <ons-col class="col-5 pixprofile">
            <img src="${doc.data().PhotoURL}" width="100%" style="border-radius: 100%;
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

         $("#showShopProfile").append(result);

      });
      $(".clickShop").click(function () {
         const Name = $(this).attr('id');
         const Navigator = "#Navigator_home";
         clickShop(Name, Navigator)
         document.querySelector("#Navigator_home").pushPage("views/Home/Shop.html");
      })
   });
};

const selectAnimal = (Breed, Navigator) => {
   db.collection("Pets").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         if (Breed == doc.data().Breed) {
            var Shop = doc.data().Breeder
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
               <button type="button" class="btnSelect">ให้บ้าน</button>
            </div>
            `
            selectShop(Shop, Navigator);
            $('#showSelectAnimal').append(result);
         }
      });
   });
};

const selectShop = (Shop, Navigator) => {
   db.collection("Shops").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         if (Shop == doc.data().Name) {
            const result = /*html*/
               `
         <ons-fab position="top left" style="color: black; background-color: rgb(252, 186, 3);" id="BackSelect">
               <i class="material-icons md-48" style="margin-top: 16px;">arrow_back</i>
         </ons-fab>
         <div class="Shopprofile">
               <ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile">
                  <ons-col class="col-5 pixprofile">
                     <img src="${doc.data().PhotoURL}" width="100%" style="border-radius: 100%;
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
            $('#showSelectShop').append(result);
         }
      });

      $("#BackSelect").click(function () {
         document.querySelector(`${Navigator}`).popPage();
      })
   });
};

const clickShop = (Name, Navigator) => {
   db.collection("Shops").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         if (Name == doc.data().Name) {
            const result = /*html*/
               `
         <ons-fab position="top left" style="color: black; background-color: rgb(252, 186, 3);" id="Back">
               <i class="material-icons md-48" style="margin-top: 16px;">arrow_back</i>
         </ons-fab>
         <div class="Shopprofile">
               <ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile">
                  <ons-col class="col-5 pixprofile">
                     <img src="${doc.data().PhotoURL}" width="100%" style="border-radius: 100%;
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
            showPetShop(doc.data().Name);
            $('#showShop').append(result);
         }
      });
      $('#Back').click(function () {
         document.querySelector(`${Navigator}`).popPage();
      })
   });
};

const showPetShop = (Breeder) => {
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
            $("#showPetinShop").append(result);
         }
      });

      $(".ClickSelectInShop").click(function () {
         const Breeder = $(this).attr('id');
         selectAnimal(Breeder, "#Navigator_Shop")
         document.querySelector("#Navigator_Shop").pushPage("views/Home/Select.html");
      })
   });
};

const clickCategory = () => {
   $("ons-carousel-item button").click(function () {
      const Category = $(this).attr('id')
      if (Category == "แนะนำ") {
         getRecommededPets();
         shopProfileShop();
      } else {
         getPetsCategory(Category);
         getShopCategory(Category);
      }
   })
}

const getPetsCategory = (Category) => {
   $("#showItemRecomended").empty();
   db.collection("Pets").where("Type", "==", Category).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         const result =
            /*html*/
            `
         <ons-col class="col-6 p-1 clickAnimal">
            <div class="containerH" id="${doc.data().Breed}">
               <img src="${doc.data().photoURL}" width="100%">
               <div>Breed : ${doc.data().Breed}</div>
               <div>Breeder : ${doc.data().Breeder}</div>
               <div>Price : ${doc.data().Price}</div>
            </div>
         </ons-col>`
         $("#showItemRecomended").append(result);
      });
      $(".containerH").click(function () {
         const ID = $(this).attr('id');
         const Navigator = "#Navigator_home";
         selectAnimal(ID, Navigator)
         document.querySelector("#Navigator_home").pushPage("views/Home/Select.html");
      })
   });
};

const getShopCategory = (Category) => {
   $("#showShopProfile").empty();
   db.collection("Shops").where("Type", "==", Category).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
         const result =
            /*html*/
            `<ons-row class="d-flex justify-content-around pl-1 pr-1 textprofile clickShop" id="${doc.data().Name}">
         <ons-col class="col-5 pixprofile">
            <img src="${doc.data().PhotoURL}" width="100%" style="border-radius: 100%;
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

         $("#showShopProfile").append(result);

      });
      $(".clickShop").click(function () {
         const Name = $(this).attr('id');
         const Navigator = "#Navigator_home";
         clickShop(Name, Navigator)
         document.querySelector("#Navigator_home").pushPage("views/Home/Shop.html");
      })
   });
};