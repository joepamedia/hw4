// Global Variables
const startBtn = document.getElementById("start");
const questionH2 = document.getElementById("question");
const timerElement = document.getElementById("timer");
const answersDiv = document.getElementById("answers");
const landingSection = document.getElementById("landing");
const quizSection = document.getElementById("quiz");
const clearHighScoresBtn = document.getElementById("clear-scores");
const scoreForm = document.getElementById("score-form");
const scoreInitialsInput = document.getElementById("score-initials");
const scoresSection = document.getElementById("scores");
const scoreTable = document.getElementById("score-table");
const playAgainBtn = document.getElementById("play-again");
const questions = [
  {
    title:
      "Who was the 8th overall draft choice for the Chicago Bears in 2018? ",
    answers: ["Mitch Trubisky", "Justin Fields", "Roquan Smith"],
    correct: "Roquan Smith",
  },
  {
    title: "How many Norris Trophies has Duncan Keith won?",
    answers: ["0", "2", "3"],
    correct: "2",
  },
  {
    title:
      "Who was the Cub's starting pitcher in the 2016 World Series Game 7?",
    answers: ["Jon Lester", "Jake Arrieta", "Kyle Hendricks"],
    correct: "Kyle Hendricks",
  },
  {
    title:
      "What year did former Chicago Bull Derrick Rose win Most Valuable Player?",
    answers: ["2011", "2010", "2013"],
    correct: "2011",
  },
  {
    title: "Who is the manager for the Chicago White Sox?",
    answers: ["Ozzie Guiellen", "Lou Pinella", "Tony LaRussa"],
    correct: "Tony LaRussa",
  },
  {
    title: "Who currently wears number 77 on the Chicago Blackhawks?",
    answers: ["Seth Jones", "Kirby Dach", "David Blaine"],
    correct: "Kirby Dach",
  },
  {
    title: "What team ruins Chicago sports fan's Sunday?",
    answers: ["Bears", "Blackhawks", "Sometimes they all do."],
    correct: "Sometimes they all do.",
  },
];
let qIndex = 0;
let timerCount = 20;
let timer;
let isWin = false;
//Clear out previous answer options.
// Functions
function loadNextQuestion() {
  //clear any existing buttons
  answersDiv.innerText = "";
  // Show first question with answers
  questionH2.innerText = questions[qIndex].title;
  // Loop through answers
  questions[qIndex].answers.forEach((answer) => {
    // Create element button, add attributes value and text, add click event, and append button to the answers div
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
  });
}
// Answer click function
function answerClick() {
  // When someone clicks the button, we want the computer to know what button you pushed. Determine the answer the user chose.
  let clickedAnswer = this.value;
  // Verify if the answer is correct.
  if (clickedAnswer === questions[qIndex].correct) {
    // Let them know they got the answer right or wrong.
    // Move to next question or end the game.
    alert("You got the right answer!");
    qIndex++;
    if (questions.length > qIndex) {
      loadNextQuestion();
    } else {
      isWin = true;
      displayHighScores();
    }
  } else {
    alert("You are wrong");
    timerCount = timerCount - 5;
  }
}

function startQuiz() {
  //updates display
  landingSection.classList.add("hide");
  quizSection.classList.remove("hide");
  //calls functions
  startTimer();
  loadNextQuestion();
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        alert("You have successfully completed the quiz!");
      }
    }
    //checks time left on timer
    if (timerCount === 0) {
      clearInterval(timer);
      alert("You Lose.");
      restartGame();
    }
  }, 1000);
}

function displayHighScores() {
  quizSection.classList.add("hide");
  scoreTable.innerHTML = "";
  scoresSection.classList.remove("hide");

  //get saved scores from local storage
  let highScores = JSON.parse(window.localStorage.getItem("quizScore")) || [];
  //update the display high scores elements
  highScores.forEach((score) => {
    scoreTable.innerHTML += `<tr><td>${score.initials}:</td> <td>${score.score}</td></tr>`;
  });
}

function saveHighScore(event) {
  // prevents default behavior where page refreshes
  event.preventDefault();
  //get existing scores from local storage
  // if there are no scores, we want to initialize to an empty array
  const scoresArray =
    JSON.parse(window.localStorage.getItem("quizScore")) || [];
  console.log(scoresArray);
  // collect user score and initials
  const scoreObject = {
    initials: scoreInitialsInput.value,
    score: timerCount,
  };
  scoresArray.push(scoreObject);
  console.log(scoresArray);
  // save to local storage
  window.localStorage.setItem("quizScore", JSON.stringify(scoresArray));
  displayHighScores();
}

function clearHighScores() {
  //this will clear the high scores from local storage
  localStorage.clear();
  displayHighScores();
}

function restartGame() {
  location.reload();
}

// Save high score
//function saveHighScore
//we want this to record the score of the user when the game is over.
//Use get/set item and record to local storage

// Initialization- start
startBtn.addEventListener("click", startQuiz);
// clears high scores from local storage
clearHighScoresBtn.addEventListener("click", clearHighScores);
// submits and adds initials and score to local storage
scoreForm.addEventListener("submit", saveHighScore);
//starts the quiz again
playAgainBtn.addEventListener("click", restartGame);
