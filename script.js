console.log('using app');

//This is so that the flowers dont start falling instantly when users open the application
setTimeout(function() {
    document.querySelector('.flowerfall').classList.add('active');
}, 2000);