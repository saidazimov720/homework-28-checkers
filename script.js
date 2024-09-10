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