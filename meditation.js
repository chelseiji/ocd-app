//JS for the meditation pages
//basically same function as the one that deals with the profile picture
function selectMeditationImage(icon) {
    var allImages = document.querySelectorAll('.meditation-image');
    for (var i = 0; i < allImages.length; i++) {
        allImages[i].classList.remove('selected');
    }
    icon.classList.add('selected');

    localStorage.setItem('meditationBackground', icon.src);
}
