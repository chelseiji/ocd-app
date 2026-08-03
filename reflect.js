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