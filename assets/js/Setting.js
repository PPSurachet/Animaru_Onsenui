document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'SettingPage') {
        
    } else if (page.id === 'myShopPage') {

    } else if (page.id === 'profilePage') {

    }
});

function profilePage() {
    document.querySelector('#Navigator_setting').pushPage("views/Setting/Profile.html");
}

function backtoSetting() {
    document.querySelector('#Navigator_setting').popPage();
}

function storePage() {
    document.querySelector('#Navigator_setting').pushPage("views/Setting/OpenShop.html")
}

function addAnimaruForm() {
    document.querySelector('#Navigator_setting').pushPage("views/Setting/addanimalform.html")
}

function backtoMyStore(){
    document.querySelector('#Navigator_myShop').popPage();
}