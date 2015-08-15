
//init game section//
var player1 = "x";
var player2 = "o";
var currentPlayer = player1;
var nextPlayer;
var board=[];

var grid = document.getElementsByClassName("square");

for (i=0; i<grid.length; i++) {
  grid[i].addEventListener("click", function(){
      if (this.getElementsByClassName("empty")[0]) {
      var position = [parseInt(this.id.split("-")[0]), parseInt(this.id.split("-")[1])];
      this.getElementsByClassName("empty")[0].className = markSquare(position);
      }
  })
}

function setupBoard(maxRow, maxColumn){
  for (r = 0; r < maxRow; r++) {
    board.push([]);
    for (c = 0; c < maxColumn; c++) {
      board[r][c] = "";
    }
  }
}

setupBoard(3,3);
//init game section//


function playGame() {
  setupGame();
  runGame();
  endGame();
}

// function runGame(position) {
//   var row = parseInt(position[0]);
//   var column = parseInt(position[1]);
//   markSquare();
// }


function markSquare (position) {
  currentPlayer = nextPlayer || currentPlayer;
  nextPlayer = nextPlayer === player2 ? player1 : player2;
  board[parseInt(position[0])][parseInt(position[1])] = currentPlayer;
  return currentPlayer;
}

function findWinner() {

}

function countConnection(position) {

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
//   findWinner();
// }

// function endGame(){
//   showWinner();
// }
