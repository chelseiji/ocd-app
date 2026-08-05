//JS for the compulsion tracker pages

function openNewJourneyPopup() {
    document.getElementById('new-journey-popup').classList.add('active');
}

function beginTracking() {
    document.getElementById('new-journey-popup').classList.remove('active');

    var trackerPopup = document.querySelector('.tracker-box');

    trackerPopup.innerHTML += '<img class="tracker-entry-image entry-4" src="images/entry-4.svg" alt="">';
    trackerPopup.innerHTML += '<p class="tracker-entry-caption caption-4" id="tracker-caption-4">hand washing</p>';
}