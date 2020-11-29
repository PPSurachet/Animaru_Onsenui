document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'BasketPage') {
    
    } else if (page.id === 'paymentPage') {

    }

});

function confirmOrder(){
    document.querySelector('#Navigator_basket').pushPage("views/Basket/Order.html")
}
function backtoBasketPage() {     document.querySelector('#Navigator_basket').popPage(); }