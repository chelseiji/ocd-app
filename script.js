console.log('using app');

//This is so that the flowers dont start falling instantly when users open the application
setTimeout(function() {
    document.querySelector('.flowerfall').classList.add('active');
}, 2000);

//This is so that after a couple seconds of showing the flowers falling then the page will change
setTimeout(function() {
    showScreen('onboarding1');
}, 6000);

//changes the screen of the app thats active 
function showScreen(screenNumber){
    //elements in screen
    var allScreens = document.querySelectorAll('.screen');

    //loop to go through each of the screens hide the ones i dont need to show
    for (var i =0; i < allScreens.length; i++){
        allScreens[i].classList.remove('active')
    }

    //makes it so that only the active screen is shown 
    document.getElementById(screenNumber).classList.add('active');
}
