// Global Variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let player1 = '';
let player2 = '';

const nameForm = document.getElementById('nameForm');
const gameArea = document.querySelector('.game-area');
const statusText = document.getElementById('status');
const boardEl = document.getElementById('board');
const winLine = document.getElementById('winLine');

// Start Game
function startGame() {
  player1 = document.getElementById('player1').value.trim();
  player2 = document.getElementById('player2').value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  nameForm.style.display = 'none';
  gameArea.style.display = 'block';
  updateStatus();
}

// Update Status
function updateStatus() {
  const currentName = currentPlayer === 'X' ? player1 : player2;
  statusText.textContent = `${currentName}'s Turn (${currentPlayer})`;
}

// Check Winner
function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningLine(combo);
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
}

// Highlight Winning Line
function highlightWinningLine(combo) {
  const linePositions = {
    '0,1,2': { top: '50px', left: '0', width: '310px', rotate: '0deg' },
    '3,4,5': { top: '155px', left: '0', width: '310px', rotate: '0deg' },
    '6,7,8': { top: '260px', left: '0', width: '310px', rotate: '0deg' },
    '0,3,6': { top: '0', left: '50px', width: '310px', rotate: '90deg' },
    '1,4,7': { top: '0', left: '155px', width: '310px', rotate: '90deg' },
    '2,5,8': { top: '0', left: '260px', width: '310px', rotate: '90deg' },
    '0,4,8': { top: '0', left: '0', width: '440px', rotate: '45deg' },
    '2,4,6': { top: '0', left: '0', width: '440px', rotate: '-45deg' }
  };

  const key = combo.join(',');
  const pos = linePositions[key];
  if (pos) {
    winLine.style.top = pos.top;
    winLine.style.left = pos.left;
    winLine.style.width = pos.width;
    winLine.style.transform = `rotate(${pos.rotate})`;
    winLine.style.display = 'block';
  }
}

// Handle Cell Click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (!index || board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') {
      statusText.textContent = "It's a draw!";
    } else {
      const winnerName = winner === 'X' ? player1 : player2;
      statusText.textContent = `🎉 Congratulations ${winnerName}, You Win! 🎉`;
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

// Reset Game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  boardEl.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  winLine.style.display = 'none';
  updateStatus();
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick);
});
