let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.style.animation = "fadeIn 0.3s ease-in-out";

      if (checkWin()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "🤝 It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
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
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.animation = "none";
  });
}
