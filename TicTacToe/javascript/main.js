
//init game section//
var player1 = "x";
var player2 = "o";
var currentPlayer = player1;
var nextPlayer;
var board=[[]];

var grid = document.getElementsByClassName("square");

for (i=0; i<grid.length; i++) {
  grid[i].addEventListener("click", function(){
    this.getElementsByClassName("empty")[0].className = markSquare(this.id.split("-"));
  })
}

function setupBoard(maxRow, maxColumn){
  for (r = 0; r < maxRow; r++) {
    for (c = 0; c < maxColumn; c++) {
      board[r][c] = "";
    }
  }
}
//init game section//


function playGame() {
  setupGame();
  runGame();
  endGame();
}

function markSquare (position) {
  currentPlayer = nextPlayer || currentPlayer;
  nextPlayer = nextPlayer === player2 ? player1 : player2;
  var r = parseInt(position[0]);
  var c = parseInt(position[0]);
  console.log(currentPlayer);
  board[r][c] = currentPlayer;
  console.log(board);
  return currentPlayer;
}


// function setupPlayers() {
//   player1
// }

// function setupGame() {
//  setupPlayers();
//   setupBoard();
//   setupWinCondition();
// }

// function runGame(){
//   markSquare();
//   checkWinCondition();
// }

// function endGame(){
//   showWinner();
// }
