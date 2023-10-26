let you;
let yourScore =  0;
let opponent;
let opponentScore = 0;
const choices = ["rock", "paper", "scissors"];
let gameStarted = false;

// Function to load scores from local storage
function loadScores() {
  if (sessionStorage.getItem("yourScore")) {
    yourScore = parseInt(sessionStorage.getItem("yourScore"));
  }
  if (sessionStorage.getItem("opponentScore")) {
    opponentScore = parseInt(sessionStorage.getItem("opponentScore"));
  }
  updateScores();
}

// Function to update the displayed scores
function updateScores() {
  document.getElementById("your-score").innerText = "My score:  " + yourScore;
  document.getElementById("opponent-score").innerText =
    "Computer score:  " + opponentScore;
}

// Call loadScores to load scores on page load
loadScores();

function onLoad2() {
  const opponentImg = document.getElementById("opponent-choice");
  const yourImg = document.getElementById("your-choice");

  opponentImg.src = "computer.png";
  yourImg.src = "me.png";

  for (let i = 0; i < 3; i++) {
    let choice = document.createElement("img");
    choice.id = choices[i];
    choice.src = choices[i] + ".png";
    choice.addEventListener("click", selectChoice);
    document.getElementById("choices").appendChild(choice);
  }
}

function selectChoice() {
  you = this.id;
  document.getElementById("your-choice").src = you + ".png";

  opponent = choices[Math.floor(Math.random() * 3)];
  document.getElementById("opponent-choice").src = opponent + ".png";

  if (you === opponent) {
    // It's a tie
  } else if (
    (you === "rock" && opponent === "scissors") ||
    (you === "scissors" && opponent === "paper") ||
    (you === "paper" && opponent === "rock")
  ) {
    yourScore += 1;
  } else {
    opponentScore += 1;
  }

  updateScores();
  saveScores(); // Call function to save scores to local storage

  if (yourScore === 5 || opponentScore === 5) {
    endGame(yourScore === 5 ? "You" : "Opponent");
  }
}

// Function to save scores to local storage
function saveScores() {
  sessionStorage.setItem("yourScore", yourScore);
  sessionStorage.setItem("opponentScore", opponentScore);
}

function endGame(winner) {
  const modal = document.getElementById("startModal");
  modal.style.display = "block";
  const winnerDeclarationModal = document.querySelector("#startModal h2");
  const modalP = document.querySelector("#startModal .modal-p");
  const modalBtn = document.querySelector("#startModal .modal-btn");

  winnerDeclarationModal.innerText = winner + " win!";
  modalP.innerText = "Click the button below to restart the game";
  modalBtn.innerText = "Restart Game";

  modalBtn.addEventListener("click", function () {
    yourScore = 0;
    opponentScore = 0;
    updateScores();
    saveScores();

    const opponentImg = document.getElementById("opponent-choice");
    const yourImg = document.getElementById("your-choice");

    opponentImg.src = "computer.png";
    yourImg.src = "me.png";

    modal.style.display = "none";
  });
}

// Display the start modal when the page loads
window.onload = function () {
  displayStartModal();
};

function displayStartModal() {
  const modal = document.getElementById("startModal");
  modal.style.display = "block";

  document.getElementById("startButton").addEventListener("click", function () {
    modal.style.display = "none";
    if (!gameStarted) {
      onLoad2();
      gameStarted = true;
    }
  });
}
