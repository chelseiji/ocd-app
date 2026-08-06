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