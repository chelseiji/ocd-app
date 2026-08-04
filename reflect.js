//JS for the reflection pages
function openJustThoughtsPopup() {
    document.getElementById('just-thoughts-popup').classList.add('active');
}

function JustThoughts() {
    document.getElementById('just-thoughts-popup').classList.remove('active');
    showScreen('just-thoughts');
}


function openJournalsPopup() {
    document.getElementById('journals-popup').classList.add('active');
}

function Journals() {
    document.getElementById('journals-popup').classList.remove('active');
    showScreen('journals');
}


// Saves which of the options is currently selected
var currentOption = null;

function selectThoughtsOption(element, optionName) {
    if (currentOption) {
        var previousIcon = document.getElementById('thoughts-icon-' + currentOption);
        previousIcon.src = 'images/' + currentOption + '.svg';
    }

    if (currentOption === optionName) {
        currentOption = null;
        return;
    }

    var newIcon = document.getElementById('thoughts-icon-' + optionName);
    newIcon.src = 'images/' + optionName + '-pressed.svg';

    currentOption = optionName;
}



// Has the text dissolve got the original code from @Akua Theresa Gyamfuwaa on CodePen: Disolver of Text
//Adjusted with AI to chnage it from HTML to JS 

var dissolveCanvas = document.getElementById('dissolve-canvas');
var dissolveCtx = dissolveCanvas.getContext('2d');
var dissolveParticles = [];
var dissolveAnimId = null;

function getTextPixels(text, width, height) {
    var offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    var octx = offscreen.getContext('2d');
    octx.fillStyle = 'white';
    octx.font = '500 16px Quicksand, sans-serif';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';

    var words = text.split(' ');
    var lines = [];
    var currentLine = '';
    for (var i = 0; i < words.length; i++) {
        var testLine = currentLine + words[i] + ' ';
        if (octx.measureText(testLine).width > width - 20 && currentLine !== '') {
            lines.push(currentLine);
            currentLine = words[i] + ' ';
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    var lineHeight = 24;
    var startY = height / 2 - (lines.length * lineHeight) / 2 + lineHeight / 2;
    for (var j = 0; j < lines.length; j++) {
        octx.fillText(lines[j], width / 2, startY + j * lineHeight);
    }

    var data = octx.getImageData(0, 0, width, height).data;
    var pixels = [];
    for (var y = 0; y < height; y += 3) {
        for (var x = 0; x < width; x += 3) {
            var index = (y * width + x) * 4;
            if (data[index + 3] > 128) {
                pixels.push({ x: x, y: y });
            }
        }
    }
    return pixels;
}

function spawnDissolveParticles(text) {
    var pixels = getTextPixels(text, dissolveCanvas.width, dissolveCanvas.height);
    dissolveParticles = pixels.map(function(p) {
        return {
            x: p.x,
            y: p.y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.8) * 0.6,
            alpha: 1,
            size: Math.random() * 1.5 + 0.5,
            delay: Math.random() * 800,
            dissolveStart: null
        };
    });

    var now = performance.now();
    for (var i = 0; i < dissolveParticles.length; i++) {
        dissolveParticles[i].dissolveStart = now + dissolveParticles[i].delay;
    }
}

function drawDissolve(ts) {
    dissolveCtx.clearRect(0, 0, dissolveCanvas.width, dissolveCanvas.height);
    var allGone = true;

    for (var i = 0; i < dissolveParticles.length; i++) {
        var p = dissolveParticles[i];

        if (ts < p.dissolveStart) {
            dissolveCtx.globalAlpha = 1;
            dissolveCtx.fillStyle = '#3E4F45';
            dissolveCtx.beginPath();
            dissolveCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            dissolveCtx.fill();
            allGone = false;
            continue;
        }

        var elapsed = ts - p.dissolveStart;
        var duration = 1200 + Math.random() * 400;
        var progress = Math.min(elapsed / duration, 1);
        p.alpha = 1 - progress;
        p.x += p.vx * (1 + progress * 2);
        p.y += p.vy * (1 + progress * 1.5);

        if (p.alpha > 0.01) {
            dissolveCtx.globalAlpha = p.alpha;
            dissolveCtx.fillStyle = '#7C6C5A';
            dissolveCtx.beginPath();
            dissolveCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            dissolveCtx.fill();
            allGone = false;
        }
    }

    dissolveCtx.globalAlpha = 1;

    if (!allGone) {
        dissolveAnimId = requestAnimationFrame(drawDissolve);
    } else {
        dissolveCanvas.style.display = 'none';
        document.getElementById('thoughts-textbox').value = '';
        document.getElementById('thoughts-textbox').style.display = 'block';
    }
}

function runDissolveEffect() {
    var textbox = document.getElementById('thoughts-textbox');
    var text = textbox.value.trim();

    if (!text) {
        return;
    }

    dissolveCanvas.width = 279;
    dissolveCanvas.height = 308;

    textbox.style.display = 'none';
    dissolveCanvas.style.display = 'block';

    spawnDissolveParticles(text);
    dissolveAnimId = requestAnimationFrame(drawDissolve);
}

// Has the text fly off of the screen got the original code from @Neil Carpenter on CodePen: Fly in, Fly Out 
//Adjusted with AI to chnage it from HTML to JS 

function runFlyEffect() {
    var textbox = document.getElementById('thoughts-textbox');
    var text = textbox.value.trim();

    if (!text) {
        return;
    }

    var flyContainer = document.createElement('div');
    flyContainer.className = 'fly-container';
    flyContainer.id = 'fly-container';

    var chars = text.length;
    for (var i = 0; i < chars; i++) {
        var letterSpan = document.createElement('span');
        letterSpan.className = 'fly-letter';
        letterSpan.textContent = text.charAt(i) === ' ' ? '\u00A0' : text.charAt(i);
        flyContainer.appendChild(letterSpan);
    }

    textbox.style.display = 'none';
    textbox.parentNode.insertBefore(flyContainer, textbox);

    var wrappedChars = flyContainer.querySelectorAll('.fly-letter');
    var j = 0;

    function addEffect() {
        setTimeout(function() {
            wrappedChars[j].classList.add('flying');
            j += 1;
            if (j < wrappedChars.length) {
                addEffect();
            } else {
                setTimeout(function() {
                    flyContainer.remove();
                    textbox.value = '';
                    textbox.style.display = 'block';
                }, 1000);
            }
        }, 60);
    }

    addEffect();
}

//  Allows the users to erase the text that is on the screen got the original code from @Valdmir Iudin on CodePen: Interactive Reveal Effect with Mouse Trail
//Adjusted with AI for the needs of my project 

var eraseCanvas = document.getElementById('erase-canvas');
var eraseCtx = eraseCanvas.getContext('2d');
var eraseIsErasing = false;

function drawEraseText(text) {
    eraseCtx.clearRect(0, 0, eraseCanvas.width, eraseCanvas.height);
    eraseCtx.fillStyle = '#333';
    eraseCtx.font = '600 16px Quicksand, sans-serif';
    eraseCtx.textAlign = 'left';
    eraseCtx.textBaseline = 'top';

    var words = text.split(' ');
    var lines = [];
    var currentLine = '';
    for (var i = 0; i < words.length; i++) {
        var testLine = currentLine + words[i] + ' ';
        if (eraseCtx.measureText(testLine).width > eraseCanvas.width - 10 && currentLine !== '') {
            lines.push(currentLine);
            currentLine = words[i] + ' ';
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    for (var j = 0; j < lines.length; j++) {
        eraseCtx.fillText(lines[j], 5, 5 + j * 24);
    }
}

function eraseAt(x, y) {
    eraseCtx.globalCompositeOperation = 'destination-out';
    eraseCtx.beginPath();
    eraseCtx.arc(x, y, 20, 0, Math.PI * 2);
    eraseCtx.fill();
    eraseCtx.globalCompositeOperation = 'source-over';
}

function getCanvasPosition(event) {
    var rect = eraseCanvas.getBoundingClientRect();
    var clientX = event.touches ? event.touches[0].clientX : event.clientX;
    var clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function handleEraseMove(event) {
    if (!eraseIsErasing) {
        return;
    }
    var pos = getCanvasPosition(event);
    eraseAt(pos.x, pos.y);
}

eraseCanvas.addEventListener('mousedown', function() { eraseIsErasing = true; });
eraseCanvas.addEventListener('mouseup', function() { eraseIsErasing = false; });
eraseCanvas.addEventListener('mousemove', handleEraseMove);

eraseCanvas.addEventListener('touchstart', function() { eraseIsErasing = true; });
eraseCanvas.addEventListener('touchend', function() { eraseIsErasing = false; });
eraseCanvas.addEventListener('touchmove', handleEraseMove);

function runEraseEffect() {
    var textbox = document.getElementById('thoughts-textbox');
    var text = textbox.value.trim();

    if (!text) {
        return;
    }

    eraseCanvas.width = 279;
    eraseCanvas.height = 308;

    textbox.style.display = 'none';
    eraseCanvas.style.display = 'block';

    drawEraseText(text);
}


/*Allows the users to crush the text that is on the screen 
This part is fully Ai generated */

function runCrushEffect() {
    var textbox = document.getElementById('thoughts-textbox');
    var text = textbox.value.trim();

    if (!text) {
        return;
    }

    var crushContainer = document.createElement('div');
    crushContainer.className = 'crush-container';

    var centerX = 279 / 2;
    var centerY = 308.4 / 2;

    var chars = text.length;
    for (var i = 0; i < chars; i++) {
        var letterSpan = document.createElement('span');
        letterSpan.className = 'crush-letter';
        letterSpan.textContent = text.charAt(i) === ' ' ? '\u00A0' : text.charAt(i);

        var pullX = (Math.random() - 0.5) * centerX;
        var pullY = (Math.random() - 0.5) * centerY;
        var rotateAmount = (Math.random() - 0.5) * 720;

        letterSpan.style.setProperty('--crush-x', pullX + 'px');
        letterSpan.style.setProperty('--crush-y', pullY + 'px');
        letterSpan.style.setProperty('--crush-rotate', rotateAmount + 'deg');

        crushContainer.appendChild(letterSpan);
    }

    textbox.style.display = 'none';
    textbox.parentNode.insertBefore(crushContainer, textbox);

    var wrappedChars = crushContainer.querySelectorAll('.crush-letter');
    for (var j = 0; j < wrappedChars.length; j++) {
        wrappedChars[j].classList.add('crushing');
    }

    setTimeout(function() {
        crushContainer.remove();
        textbox.value = '';
        textbox.style.display = 'block';
    }, 900);
}


function sendThought() {
    if (currentOption === 'dissolve') {
        runDissolveEffect();
    } else if (currentOption === 'fly') {
        runFlyEffect();
    } else if (currentOption === 'erase') {
        runEraseEffect();
    } else if (currentOption === 'crush') {
        runCrushEffect();
    }
}




// Journal Pages - different from reflect 
// basically the same as profile upload but instead replaces the placeholder image

var journalImageUpload = document.getElementById('journal-image-upload');
var journalImageBox = document.getElementById('journal-image-box');

journalImageUpload.addEventListener('change', function() {
    var file = journalImageUpload.files[0];
    if (file) {
        var imageUrl = URL.createObjectURL(file);
        journalImageBox.src = imageUrl;
        localStorage.setItem('journalImage', imageUrl);
    }
});

localStorage.setItem('journalImage', journalImageBox.src);

// opens/closes the prompt dropdown, flips the arrow icon
function togglePromptDropdown() {
    var panel = document.getElementById('prompt-dropdown-panel');
    var arrow = document.getElementById('prompt-dropdown-arrow');

    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        arrow.src = 'images/arrow-down.svg';
    } else {
        panel.classList.add('open');
        arrow.src = 'images/arrow-up.svg';
    }
}

// closes dropdown and chooses the prompt
// this function was make with the help of AI
function selectPrompt(promptElement) {
    document.getElementById('prompt-dropdown-text').textContent = promptElement.textContent;

    var panel = document.getElementById('prompt-dropdown-panel');
    panel.classList.remove('open');
    document.getElementById('prompt-dropdown-arrow').src = 'images/arrow-down.svg';
}

// saves the body and title in the journal for later use same functions as used earlier 

var journalTitleInput = document.getElementById('journal-title');
journalTitleInput.addEventListener('input', function() {
    localStorage.setItem('journalTitle', journalTitleInput.value);
});

var journalBodyInput = document.getElementById('journal-body');
journalBodyInput.addEventListener('input', function() {
    localStorage.setItem('journalBody', journalBodyInput.value);
});


function openJournalEntryPopup(){
    document.getElementById('leave-journal-entry-popup').classList.add('active');
}

function closeJournalEntryPopup() {
    document.getElementById('leave-journal-entry-popup').classList.remove('active');
}

// discards everything typed/uploaded and goes back to the journals page
// this function was make with the help of AI
function returnJournalHome() {
    localStorage.removeItem('journalTitle');
    localStorage.removeItem('journalBody');
    localStorage.removeItem('journalImage');

    document.getElementById('journal-title').value = '';
    document.getElementById('journal-body').value = '';
    document.getElementById('journal-image-box').src = 'images/journal-header-image.jpg';

    closeJournalEntryPopup() ;
    showScreen('journals');
}

//saves the journal entry (which i saved in the other functions) and then makes 
//it go back to the journals page with the new journal added
function saveJournalEntry() {
    showScreen('journals');
}



// builds and displays a journal entry card on the journals page
// this section below was made with the help of AI
function addJournalEntryToPage() {
    var savedImage = localStorage.getItem('journalImage');
    var savedTitle = localStorage.getItem('journalTitle');
    var savedBody = localStorage.getItem('journalBody');

    if (!savedImage || !savedTitle) {
        return;
    }

    buildJournalCard('user-entry', savedTitle, savedImage, savedBody);

    for (var i = 0; i < hardcodedJournalEntries.length; i++) {
        var entry = hardcodedJournalEntries[i];
        buildJournalCard(entry.id, entry.title, entry.image, entry.body);
    }

    document.getElementById('journals-icon-left').src = 'images/visuals-active.svg';
    document.getElementById('journals-icon-right').src = 'images/delete-active.svg';
}


// has the text show when there arent any jounrals 
function updateNoJournalsText() {
    var journalsList = document.getElementById('journals-list');
    var noJournalsText = document.getElementById('no-journals-text');

    if (journalsList.children.length === 0) {
        addJournalEntryToPage();
    }

    if (journalsList.children.length === 0) {
        noJournalsText.style.display = 'block';
    } else {
        noJournalsText.style.display = 'none';
    }
}


// hardcoding the jounral entires 
var hardcodedJournalEntries = [
    {   id: 'j1', 
        title: 'today was much better', 
        image: 'images/hardcoded-1.jpg', 
        body: 'after a long week of doing work I fianlly had a day to myself, I went out with some friends and had fun at dinner.' 
    },
    {   id: 'j2', 
        title: 'the things i would do', 
        image: 'images/hardcoded-2.jpg', 
        body: 'sometimes when I am at my most overwhelmed I think of all of the things I would do if I were able to travel all of the time. I lke getting lost in my thoughts' 
    },
    {   id: 'j3', 
        title: 'i went on a walk', 
        image: 'images/hardcoded-3.jpg', 
        body: 'I had a very stressful day at work and I just needed to go on a walk during my lunch break. I did not want to see people so instead I decided to look at the tress and the birds and I felt much better after.' 
    },
    {   id: 'j4', 
        title: 'i am happy', 
        image: 'images/hardcoded-4.jpg', 
        body: 'I am really putting the work into my work and also into my mental health. I feel like I am doing much better and I can confidently say that I am feeling much happier' 
    }
];

function buildJournalCard(id, title, image, body) {
    var journalsList = document.getElementById('journals-list');

    var card = document.createElement('div');
    card.className = 'journal-card';
    card.setAttribute('data-id', id);
    card.setAttribute('data-title', title);
    card.setAttribute('data-image', image);
    card.setAttribute('data-body', body);
    card.onclick = function() {
        openJournalReadPage(id, title, image, body);
    };

    // this section below was made with the help of AI
    var imageEl = document.createElement('img');
    imageEl.className = 'journal-entry-image';
    imageEl.src = image;
    card.appendChild(imageEl);

    var titleBar = document.createElement('div');
    titleBar.className = 'journal-title-bar';

    var titleEl = document.createElement('p');
    titleEl.className = 'journal-entry-title';
    titleEl.textContent = title;
    titleBar.appendChild(titleEl);

    card.appendChild(titleBar);
    journalsList.appendChild(card);
}


function openJournalReadPage(id, title, image, body) {
    document.getElementById('read-journal-image').src = image;
    document.getElementById('read-journal-title').textContent = title;
    document.getElementById('read-journal-body').textContent = body;

    showScreen('read-journal');
}