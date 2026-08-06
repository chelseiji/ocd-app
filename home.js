//JS for homepage flow

// adds the sved profile picture from the onboarding to the seeting page
function settingsInfo() {
    var savedProfile = localStorage.getItem('profileImage');
    var savedName = localStorage.getItem('username');
    if (savedProfile) {
        document.getElementById('settings-profile-pic').src = savedProfile;
    }
    if (savedName) {
        document.getElementById('settings-username').value = savedName;
    }
}

// opens popup when user clicke the signout button
function openSignoutPopup() {
    document.getElementById('signout-popup').classList.add('active');
}

function closeSignoutPopup() {
    document.getElementById('signout-popup').classList.remove('active');
    showScreen('settings');
}

function SignOut() {
    document.getElementById('signout-popup').classList.remove('active');
    showScreen('loading-screen');
}


function openProfilePicPopup() {
    document.getElementById('profile-pic-popup').classList.add('active');
}

// Profile picture popup (basically same functions as the one used in onboarding )

// selects the profile that the user clicks on, and saves it right away
// Saving the username and image to local storage from @GeeksforGeeks : How to Create a Textfield to Enter a Username and Save it on a Website?
function selectSettingsProfile(icon) {
    var allOptions = document.querySelectorAll('.profile-pic-option');
    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove('selected');
    }
    icon.classList.add('selected');

    localStorage.setItem('profileImage', icon.src);
    document.getElementById('settings-profile-pic').src = icon.src;
}

var settingsProfileUpload = document.getElementById('settings-profile-upload');
var uploadedImage = document.getElementById('uploaded-image');

settingsProfileUpload.addEventListener("change", function () {
    getSettingsImgData();
});

// having user select their own image from @W3 Collective: Preview selected image (input type="file") using JavaScript
function getSettingsImgData() {
    var files = settingsProfileUpload.files[0];
    if (files) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            uploadedImage.src = this.result;
            selectSettingsProfile(uploadedImage);
        });
    }
}

function cancelChange() {
    document.getElementById('profile-pic-popup').classList.remove('active');
}


function saveChange() {
    document.getElementById('profile-pic-popup').classList.remove('active');
}