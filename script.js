const gameBoard = document.getElementById('gameBoard');
const boardSize = 8;
let selectedPiece = null;
let currentPlayer = 'red';

function createBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const  cell = document.createElement('div');
            cell.classList.add('cell');
            if ((row + col)%2 === 0) {
                cell.classList.add('light');
            }else{
                cell.classList.add('dark');
                if (row < 3) {
                    addPiece(cell, 'red');
                }else if(row > 4 ){
                    addPiece(cell, 'black');
                }
            }
            cell.dataset.row = row;
            cell.dataset.col = col;
            gameBoard.appendChild(cell);
        }
    }
}

function addPiece(cell, color) {
    const piece = document.createElement('div');
    piece.classList.add('piece', color);
    cell.appendChild(piece);
}

gameBoard.addEventListener('click', (event) => {
    const cell = event.target.closest('.cell.dark');
    if(!cell) return;
    const piece = cell.querySelector('.piece');
    if (selectedPiece) {
        if (!piece && canMove(selectedPiece, cell)) {
            movePiece(selectedPiece, cell);
            switchPlayer();
        }else if(!piece && canJump(selectedPiece, cell)){
            jumpPiece(selectedPiece, cell);
            switchPlayer();
        }
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
    }else if(piece && piece.classList.contains(currentPlayer)){
        selectedPiece = piece;
        selectedPiece.classList.add('selected');
    }
});

function canMove(piece, targetCell) {
    const startRow = parseInt(piece.parentElement.dataset.row);
    const startCol = parseInt(piece.parentElement.dataset.col);
    const targetRow = parseInt(targetCell.dataset.row);
    const targetCol = parseInt(targetCell.dataset.col);
    const rowDiff = targetRow  - startRow;
    const colDiff = targetCol - startCol;
    if (currentPlayer = 'red' && rowDiff === 1 && Math.abs(colDiff) === 1) {
        return true;
    }
    if (currentPlayer = 'black' && rowDiff === -1 && Math.abs(colDiff) === 1) {
        return true;
    }
    return false;
}

function canJump(piece, targetCell) {
    const startRow = parseInt(piece.parentElement.dataset.row);
    const startCol = parseInt(piece.parentElement.dataset.col);
    const targetRow = parseInt(targetCell.dataset.row);
    const targetCol = parseInt(targetCell.dataset.col);
    const rowDiff = targetRow - startRow;
    const colDiff = targetCol - startCol;
    if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
        const middleRow = (startRow + targetRow) / 2;
        const middleCol = (startCol + targetCol) / 2;
        const middleCell = getCell(middleRow, middleCol);
        const middlePiece = middleCell.querySelector('.piece');
        if (middlePiece && middlePiece.classList.contains(currentPlayer === 'red' ? 'black': 'red')) {
            return true;
        }
    }
    return false;
}

function movePiece(piece, targetCell) {
    targetCell.appendChild(piece);
}
function jumpPiece(piece, targetCell) {
    const startRow = parseInt(piece.parentElement.dataset.row);
  const startCol = parseInt(piece.parentElement.dataset.col);
  const targetRow = parseInt(targetCell.dataset.row);
  const targetCol = parseInt(targetCell.dataset.col);
  const rowDiff = targetRow - startRow;
  const colDiff = targetCol - startCol;
  if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
    const middleRow = (startRow + targetRow) / 2;
    const middleCol = (startCol + targetCol) / 2;
    const middleCell = getCell(middleRow, middleCol);
    const middlePiece = middleCell.querySelector('.piece');
    if (middlePiece && middlePiece.classList.contains(currentPlayer === 'red' ? 'black' : 'red')) {
      return true;
    }
  }
  return false;
}