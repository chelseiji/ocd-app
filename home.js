//JS for homepage flow

//Homepage 
// fills in the profile picture and greeting name whenever the home page loads
function homeInfo() {
    var savedProfile = localStorage.getItem('profileImage');
    var savedName = localStorage.getItem('username');
    if (savedProfile) {
        document.getElementById('home-profile-pic').src = savedProfile;
    }
    if (savedName) {
        document.getElementById('home-greeting').textContent = 'hello, ' + savedName;
    }
}

var emotionData = {
    fatigue: {
        quote: "exhaustion can be heavy, you can fly again”",
        features: [
            { title: 'calming sleep meditation', subtext: '10 minutes' },
            { title: 'dot follow', subtext: 'mini game' },
            { title: 'rejuvenate the mind', subtext: 'journaling' },
            { title: 'view your growth', subtext: 'your journey' }
        ]
    },
    happy: {
        quote: "bask in in your joy for a little longer today",
        features: [
            { title: 'focus meditation', subtext: '30 minutes' },
            { title: 'have some fun', subtext: 'min games' },
            { title: 'remember your joy', subtext: 'jounraling' },
            { title: 'track your progress', subtext: 'your journey' }
        ]
    },
    sad: {
        quote: "sadness can visit, but do not let it unpack",
        features: [
            { title: 'uplift your mood', subtext: '10 minutes' },
            { title: 'popping balloons', subtext: 'mini game' },
            { title: 'release your feelings', subtext: 'just thougths' },
            { title: 'distract by organizing', subtext: 'mini game' }
        ]
    },
    stress: {
        quote: "stress will come and go, this too shall pass",
        features: [
            { title: 'reduce stress meditation', subtext: '10 minutes' },
            { title: 'popping balloons', subtext: 'mini game' },
            { title: 'release what on your mind', subtext: 'just thoughts' },
            { title: 'soothing body meditation', subtext: '20 minutes' }
        ]
    },
    worry: {
        quote: "come and breathe, be the light you need",
        features: [
            { title: 'soothin rain sounds', subtext: '10 minutes' },
            { title: 'spin to relax', subtext: 'mini game' },
            { title: 'write about new ideas', subtext: 'journaling' },
            { title: 'focus on the good', subtext: '20 minutes' }
        ]
    },
    frustration: {
        quote: "anger burns bright, but do not let it lead",
        features: [
            { title: 'calming meditation', subtext: '20 minutes' },
            { title: 'distract by popping', subtext: 'mini game' },
            { title: 'let go of your anger', subtext: 'just thoughts' },
            { title: 'relax by organizing', subtext: 'mini game' }
        ]
    }
};

var currentEmotion = null;

// Whwhn the motion is selected this calls the hardcoded features and quote 
function selectEmotion(name) {
    var allEmotions = document.querySelectorAll('.home-emotion');
    //array of names 0-5
    var emotionNames = ['fatigue', 'happy', 'sad', 'stress', 'worry', 'frustration'];

    for (var i = 0; i < allEmotions.length; i++) {
        allEmotions[i].src = 'images/' + emotionNames[i] + '.svg';
    }

    var clickedIndex = emotionNames.indexOf(name);
    allEmotions[clickedIndex].src = 'images/' + name + '-pressed.svg';
    currentEmotion = name;

    var data = emotionData[name];
    //this is what puts the quote in quotations 
    document.getElementById('home-quote').textContent = '"' + data.quote + '"';

     //tgoes through the array and based on the numebr chnages the title and subtext for the 4 features
    for (var j = 0; j < 4; j++) {
        var featureNumber = j + 1;
        document.getElementById('feature-title-' + featureNumber).textContent = data.features[j].title;
        document.getElementById('feature-subtext-' + featureNumber).textContent = data.features[j].subtext;
    }
}


//Settings

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


// Contact Us Page

function openContactPopup() {
    document.getElementById('contact-popup').classList.add('active');
}

function closeContactPopup() {
    document.getElementById('contact-popup').classList.remove('active');
    showScreen('settings');
}

// removes the text from the inputs
function sendForm() {
    document.getElementById('contact-email-input').value = '';
    document.getElementById('contact-message-input').value = '';

    openContactPopup();
}

// Change Password page 

// adds the users saved email and passowrd to the text fiedls
function passwordEmailInfo() {
    var savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('change-password-email-input').value = savedEmail;
    }

    var savedPassword = localStorage.getItem('password');
    if (savedPassword) {
        document.getElementById('change-current-password-input').value = savedPassword;
    }
}

// basically same funtion as the one in onboarding
//seess in the two new terms are the same and then saves the new password
function saveNewPassword() {
    var newPassword = document.getElementById('new-password-input').value;
    var confirmPassword = document.getElementById('confirm-new-password-input').value;

    if (newPassword !== confirmPassword) {
        return;
    }
    localStorage.setItem('password', newPassword);
}


// FAQ Page
//inspo gotten from @W3 schools: How TO - Collapsibles/Accordion
// (# AI 13) Written with help of AI
var acc = document.getElementsByClassName("faq-question-box");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    var image = this.nextElementSibling;
    var arrow = this.lastElementChild;

    if (image.classList.contains("open")) {
      image.classList.remove("open");
      arrow.src = 'images/arrow-down-faq.svg';
    } else {
      image.classList.add("open");
      arrow.src = 'images/arrow-up-faq.svg';
    }

    repositionFaqItems();
  });
}

function repositionFaqItems() {
    var runningTop = 182;
    for (var i = 1; i <= 5; i++) {
        var faqBox = document.getElementById('faq-box-' + i);
        var answerImage = document.getElementById('faq-answer-' + i);

        faqBox.style.top = runningTop + 'px';

        var thisItemHeight = 46;
        if (answerImage.classList.contains("open")) {
            thisItemHeight += 125 + 10;
        }

        runningTop += thisItemHeight + 20;
    }

    
    document.getElementById('faq-more-questions').style.top = runningTop + 'px';
}