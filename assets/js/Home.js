document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'HomePage') {

    } else if (page.id === 'ShopPage') {

    } else if (page.id === 'SelectPage') {

    }
});
 function goShop(){
    document.querySelector("#Navigator_home").pushPage("views/Home/Shop.html");
 }

 function goBackHome(){
    document.querySelector("#Navigator_home").popPage();
 }