var player1 = "x";
var player2 = "o";
var currentPlayer = player1;
var nextPlayer;

var grid = document.getElementsByClassName("square");

for (i=0; i<grid.length; i++) {
  grid[i].addEventListener("click", function(){
    console.log(this);
    this.getElementsByClassName("empty")[0].className = markSquare();
    console.log('ouch');
  })
}

function playGame() {
  setupGame();
  runGame();
  endGame();
}

function markSquare () {
  currentPlayer = nextPlayer || currentPlayer;
  nextPlayer = nextPlayer === player2 ? player1 : player2;
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
