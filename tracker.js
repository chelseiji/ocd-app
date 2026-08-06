//JS for the compulsion tracker pages

//Opens when the new journal is added and then adds new jounral to the page (hardcoded)
function openNewJourneyPopup() {
    document.getElementById('new-journey-popup').classList.add('active');
}

function beginTracking() {
    document.getElementById('new-journey-popup').classList.remove('active');

    var trackerPopup = document.querySelector('.tracker-box');

    trackerPopup.innerHTML += '<img class="tracker-entry-image entry-4" src="images/entry-4.svg" alt="" onclick="openCompulsionPopup(4)">';
    trackerPopup.innerHTML += '<p class="tracker-entry-caption caption-4" id="tracker-caption-4">hand washing</p>';
}

//Opens for eveyr compulsion

function openCompulsionPopup(number) {
    document.getElementById('compulsion-' + number + '-popup').classList.add('active');
}

//Opens when users click edit in compulsion, they can edit name but not the date
function openEditPopup(number) {
    document.getElementById('compulsion-' + number + '-popup').classList.remove('active');
    document.getElementById('edit-popup-' + number).classList.add('active');
}

function cancelEdit(number) {
    document.getElementById('edit-popup-' + number).classList.remove('active');
    showScreen('tracker');
}

//chnages the text of the user in edit 
//chnaged text content for @W3 : HTML DOM Element textContent
function saveEdit(number) {
    var newText = document.getElementById('edit-name-input-' + number).value;
    document.getElementById('tracker-caption-' + number).textContent = newText;
    document.getElementById('edit-popup-' + number).classList.remove('active');
}

//Opens when users click delete in compulsion, they can delete all of the compulsopns

function openDeletePopup(number) {
    document.getElementById('compulsion-' + number + '-popup').classList.remove('active');
    document.getElementById('delete-popup-' + number).classList.add('active');
}

//  closes the popup, goes back to the tracker page
function closeDeletePopup(number) {
    document.getElementById('delete-popup-' + number).classList.remove('active');
    showScreen('tracker');
}

// removes the entry's image and caption from the page
function confirmDelete(number) {
    document.querySelector('.entry-' + number).remove();
    document.getElementById('tracker-caption-' + number).remove();
    document.getElementById('delete-popup-' + number).classList.remove('active');
}

//This section was added so that when users click outside of the screen that the popup closes
//since the other popus do have the cancel or close option I did not add it to those
// (# AI 12) Written with help of AI
function setupClickOutsideClose(overlayId) {
    var overlay = document.getElementById(overlayId);
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

setupClickOutsideClose('new-journey-popup');
setupClickOutsideClose('compulsion-1-popup');
setupClickOutsideClose('compulsion-2-popup');
setupClickOutsideClose('compulsion-3-popup');
setupClickOutsideClose('compulsion-4-popup');