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