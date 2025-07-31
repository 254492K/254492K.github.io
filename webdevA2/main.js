// === Background Image Slideshow ===
// Array of background images to cycle through
var backgroundImages = [
    'images/bgimg1.jpg',
    'images/bgimg2.jpg',
    'images/bgimg3.jpg'
];
var bgIndex = 0; // index for current background image

// Function to change the background image with a fade effect
function changeBackground() {
    var imgElement = document.querySelector('.bg-img'); // select the image element used as background

    // Cycle to next image index (loop back to 0 at end)
    bgIndex = (bgIndex + 1) % backgroundImages.length;
    var nextImage = backgroundImages[bgIndex];

    // Fade out current image
    imgElement.style.opacity = '0';

    // After fade-out, change image source and fade in new one
    setTimeout(function () {
        imgElement.src = nextImage;
        imgElement.style.opacity = '1.0';
    }, 600); // matches CSS transition speed
}
// Automatically change background every 4 seconds
setInterval(changeBackground, 4000);


/* === Hamburger Menu === */
document.addEventListener('DOMContentLoaded', function () {
    var hamIcon = document.getElementById('hamIcon'); // hamburger icon
    var navMenu = document.getElementById('navMenu'); // navigation menu container

    // Toggle menu display when hamburger is clicked (mobile view)
    hamIcon.addEventListener('click', function () {
        navMenu.classList.toggle('show'); // adds/removes 'show' class to toggle menu
    });
});


/* === F1 Car Sound Button === */
document.addEventListener("DOMContentLoaded", function () {
    var soundBtn = document.getElementById("sound-btn"); // button for sound
    var audio = document.getElementById("f1-audio"); // audio element

    soundBtn.addEventListener("click", function (e) {
        e.preventDefault(); // prevent default link behavior

        // Reset button progress instantly (remove playing state)
        soundBtn.classList.remove("playing");
        soundBtn.style.setProperty("--fill-duration", "0s");
        void soundBtn.offsetWidth; // Force reflow (to restart CSS animation)

        // Start audio from beginning
        audio.currentTime = 0;
        audio.play();

        // Wait until audio metadata is loaded to get duration
        if (audio.readyState >= 1) {
            startProgress();
        } else {
            audio.addEventListener("loadedmetadata", startProgress, { once: true });
        }
    });

    // Function to start button fill animation based on audio duration
    function startProgress() {
        soundBtn.style.setProperty("--fill-duration", audio.duration + "s");
        soundBtn.classList.add("playing");
    }

    // Reset button fill instantly when audio finishes playing
    audio.addEventListener("ended", function () {
        soundBtn.classList.remove("playing");
        soundBtn.style.setProperty("--fill-duration", "0s");
    });
});


/* === Page Switching === */
document.addEventListener("DOMContentLoaded", function () {
    var page1btn = document.getElementById("page1btn");
    var page2btn = document.getElementById("page2btn");
    var page3btn = document.getElementById("page3btn");

    var pages = document.querySelectorAll(".page"); // all page content containers

    // Function to show one page and hide others
    function showPage(pageId) {
        for (var i = 0; i < pages.length; i++) {
            pages[i].classList.remove("active");
        }
        document.getElementById(pageId).classList.add("active");
        // Smooth scroll to top of that page section
        document.getElementById(pageId).scrollIntoView({ behavior: "smooth" });
    }

    // Assign click events for each page button
    page1btn.addEventListener("click", function () { showPage("page1"); });
    page2btn.addEventListener("click", function () { showPage("page2"); });
    page3btn.addEventListener("click", function () { showPage("page3"); });
});


/* === Quiz Game (2025 Teams) === */
document.addEventListener("DOMContentLoaded", function () {
    // Quiz Data: each entry contains car image and team name
    var quizData = [
        { img: "images/car_1.jpg", team: "Alpine" },
        { img: "images/car_2.jpg", team: "Haas" },
        { img: "images/car_3.jpg", team: "Ferrari" },
        { img: "images/car_4.jpg", team: "Williams" },
        { img: "images/car_5.jpg", team: "Aston Martin" },
        { img: "images/car_6.jpg", team: "Racing Bulls" },
        { img: "images/car_7.jpg", team: "Kick Sauber" },
        { img: "images/car_8.jpg", team: "Mercedes" },
        { img: "images/car_9.jpg", team: "McLaren" },
        { img: "images/car_10.jpg", team: "Red Bull Racing" }
    ];

    var allTeams = [];
    for (var i = 0; i < quizData.length; i++) {
        allTeams.push(quizData[i].team);
    }
    var quizImage = document.getElementById("quiz-image"); // image container
    var optionsDiv = document.getElementById("options"); // options buttons container
    var resultP = document.getElementById("result"); // result text

    // Get random question (random car)
    function getRandomQuestion() {
        var randomIndex = Math.floor(Math.random() * quizData.length);
        return quizData[randomIndex];
    }

    // Get random options including correct one
    function getRandomOptions(correct) {
        var shuffled = allTeams.slice().sort(function () { return 0.5 - Math.random(); });
        var options = [correct];
        while (options.length < 4) {
            var candidate = shuffled.pop();
            if (options.indexOf(candidate) === -1) {
                options.push(candidate);
            }
        }
        return options.sort(function () { return 0.5 - Math.random(); });
    }

    // Load a question and its options
    function loadQuestion() {
        resultP.textContent = ""; // clear result text
        var question = getRandomQuestion();
        quizImage.src = question.img;

        var options = getRandomOptions(question.team);
        optionsDiv.innerHTML = ""; // clear old options
        for (var j = 0; j < options.length; j++) {
            var option = options[j];
            var btn = document.createElement("button");
            btn.textContent = option;
            btn.classList.add("option-btn");
            // Pass `option` and `question.team` safely using bind
            btn.addEventListener("click", checkAnswer.bind(null, option, question.team));
            optionsDiv.appendChild(btn);
        }
    }

    // Check answer and show feedback
    function checkAnswer(selected, correct) {
        if (selected === correct) {
            resultP.textContent = "Correct!";
            resultP.style.color = "green";
        } else {
            resultP.textContent = "Wrong! Correct answer: " + correct;
            resultP.style.color = "red";
        }
        // Load next question after short delay
        setTimeout(loadQuestion, 1500);
    }

    // Load quiz when Teams page button is clicked
    document.getElementById("page2btn").addEventListener("click", function () { loadQuestion(); });
});


/* === Flip Card (Fun Fact Card) === */
document.getElementById('funFactCard').addEventListener('click', function () {
    this.classList.toggle('flipped'); // toggles card rotation state
});


/* === Mini Reaction Game === */
document.addEventListener("DOMContentLoaded", function () {
    var lights = document.querySelectorAll('.light'); // red/green lights
    var startBtn = document.getElementById('startGame'); // start button
    var result = document.getElementById('resultTime'); // result text
    var clickArea = document.getElementById('clickArea'); // click detection area

    // Sounds for lights
    var redSound = new Audio('audio/red-light-sound.mp3');
    var greenSound = new Audio('audio/green-light-sound.mp3');

    var startTime = 0; // start time for reaction measurement
    var gameActive = false; // is game currently running?
    var canClick = false; // is player allowed to click yet?
    var intervalId = null; // interval for red lights
    var timeoutId = null; // timeout for green light delay

    startBtn.addEventListener('click', startGame);

    // Start the reaction test sequence
    function startGame() {
        startBtn.disabled = true; // prevent multiple clicks
        result.textContent = "";
        gameActive = true;
        canClick = false;

        var index = 0;
        // Turn on red lights one by one (800ms interval)
        intervalId = setInterval(function () {
            lights[index].classList.add('on'); // red light on
            redSound.currentTime = 0;
            redSound.play();
            index++;
            if (index === lights.length) {
                clearInterval(intervalId);

                // After all red lights are on, wait random 1000–2500ms, then green
                var randomDelay = 1000 + Math.random() * 1500;
                timeoutId = setTimeout(function () {
                    // Switch all lights to green
                    for (var k = 0; k < lights.length; k++) {
                        lights[k].classList.remove('on');
                        lights[k].classList.add('green');
                    }
                    greenSound.currentTime = 0;
                    greenSound.play();

                    startTime = performance.now(); // record start time for reaction
                    canClick = true; // now player can click
                }, randomDelay);
            }
        }, 800);
    }

    // Handle click area events
    clickArea.addEventListener('click', function () {
        if (!gameActive) return; // ignore if game not started

        if (!canClick) {
            // Player clicked before green light
            result.textContent = "Too early!";
            stopAll();
            resetGame();
            return;
        }

        // Calculate reaction time
        var reactionTime = performance.now() - startTime;
        result.textContent = "Your reaction time: " + reactionTime.toFixed(0) + " ms (" + (reactionTime / 1000).toFixed(3) + " seconds)";
        resetGame();
    });

    // Stop ongoing animations/timeouts
    function stopAll() {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        for (var i = 0; i < lights.length; i++) {
            lights[i].classList.remove('on');
            lights[i].classList.remove('green');
        }
    }

    // Reset game state to initial
    function resetGame() {
        canClick = false;
        gameActive = false;
        startBtn.disabled = false;

        // Reset all lights to off
        for (var i = 0; i < lights.length; i++) {
            lights[i].classList.remove('on');
            lights[i].classList.remove('green');
        }
    }
});
