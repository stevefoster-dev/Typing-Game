const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init Word
let randomWord;

// Init Score
let score = 0;

// Init Time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // End Game
    gameOver();
  }
}

// Start clock on type
function startClock() {
  if (text.value !== null) {
    setInterval(updateTime, 1000);
    text.removeEventListener("input", startClock);
  }
}

// Game Over show end screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event Listener

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 3;
    } else if (difficulty === "easy") {
      time += 5;
    }

    updateTime();
  }
});

// Settings button click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});

// Stop clock on load
window.addEventListener("load", () => {
  if (text.value === "") {
    clearInterval(timeInterval);
  }
});

// Listen for user to start typing
text.addEventListener("input", startClock);
