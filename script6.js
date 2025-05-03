// Global Variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const statusText = document.getElementById('status');
const boardEl = document.getElementById('board');
const winLine = document.getElementById('winLine');

// Update Status
function updateStatus() {
  statusText.textContent = `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s Turn (${currentPlayer})`;
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
    '0,1,2': { top: '50px', left: '0', width: '310px', transform: 'rotate(0deg)', class: 'horizontal' },
    '3,4,5': { top: '155px', left: '0', width: '310px', transform: 'rotate(0deg)', class: 'horizontal' },
    '6,7,8': { top: '260px', left: '0', width: '310px', transform: 'rotate(0deg)', class: 'horizontal' },
    '0,3,6': { top: '0', left: '50px', height: '310px', transform: 'rotate(90deg)', class: 'vertical' },
    '1,4,7': { top: '0', left: '155px', height: '310px', transform: 'rotate(90deg)', class: 'vertical' },
    '2,5,8': { top: '0', left: '260px', height: '310px', transform: 'rotate(90deg)', class: 'vertical' },
    '0,4,8': { top: '0', left: '0', width: '440px', transform: 'rotate(45deg)', class: 'diagonal-1' },
    '2,4,6': { top: '0', left: '0', width: '440px', transform: 'rotate(-45deg)', class: 'diagonal-2' }
  };

  const key = combo.join(',');
  const pos = linePositions[key];
  if (pos) {
    winLine.style.top = pos.top;
    winLine.style.left = pos.left;
    winLine.style.width = pos.width;
    winLine.style.height = pos.height || '6px';
    winLine.style.transform = pos.transform;
    winLine.classList.add(pos.class);
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
      statusText.textContent = `${winner === 'X' ? 'Player 1' : 'Player 2'} Wins! 🎉`;
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
  winLine.classList.remove('horizontal', 'vertical', 'diagonal-1', 'diagonal-2');
  updateStatus();
}

// Event Listeners
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick);
});

document.getElementById('resetBtn').addEventListener('click', resetGame);
