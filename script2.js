let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let playerNames = { X: "", O: "" };

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const boardElement = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  playerNames.X = player1;
  playerNames.O = player2;
  currentPlayer = "X";
  gameActive = true;

  // Hide form, show board and status
  document.getElementById("nameForm").style.display = "none";
  boardElement.style.display = "grid";
  statusText.style.display = "block";
  resetBtn.style.display = "inline-block";

  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.style.animation = "fadeIn 0.3s ease-in-out";

      if (checkWin()) {
        statusText.textContent = `🎉 ${playerNames[currentPlayer]} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "🤝 It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
      }
    }
  });
});

function checkWin() {
  return winningCombinations.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `${playerNames[currentPlayer]}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.animation = "none";
  });
}
