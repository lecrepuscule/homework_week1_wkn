
//init game section//
var player1 = "x";
var player2 = "o";
var currentPlayer = player1;
var nextPlayer;
var board=[];

var grid = document.getElementsByClassName("square");

for (var i=0, len=grid.length; i<len; i++) {
  grid[i].addEventListener("click", playGame);
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
  if (this.getElementsByClassName("empty")[0]) {
    var position = [parseInt(this.id.split("-")[0]), parseInt(this.id.split("-")[1])];
    var currentPlayer = markSquare(position)
    this.getElementsByClassName("empty")[0].className = currentPlayer;
    var winner = checkConnection(position, currentPlayer, 3);
    if (winner) {
      endGame(winner);
    }
  }
}

function endGame(winner) {
  for (var i=0, len=grid.length; i<len; i++) {
    grid[i].removeEventListener("click", playGame);
  }
  alert(winner + " has won!");
}

// function runGame(position) {
//   var row = parseInt(position[0]);
//   var column = parseInt(position[1]);
//   markSquare();
// }


function markSquare (position) {
  currentPlayer = nextPlayer || currentPlayer;
  nextPlayer = nextPlayer === player2 ? player1 : player2;
  board[position[0]][position[1]] = currentPlayer;
  return currentPlayer;
}

function countConnections(currentPlayer,row, rIncrement, column, cIncrement, currentCount) {
  if (board[row+rIncrement][column+cIncrement] === currentPlayer) { currentCount.push([row+rIncrement,column+cIncrement])
  } 
  else {
    currentCount = [];
  }
  return currentCount;
}

function checkConnection(position, currentPlayer, winCondition) {

  var horizontalConnections=[];
  var verticalConnections=[];
  var leadDiagConnections=[];
  var antiDiagConnections=[];
  var row = position[0];
  var column = position[1];

  for (i=1-winCondition; i<winCondition; i++) {
    if (column+i >= 0 && column+i < 3) {
      horizontalConnections = countConnections(currentPlayer, row, 0, column, i, horizontalConnections);
      if (row+i >= 0 && row+i < 3) {
        leadDiagConnections = countConnections(currentPlayer, row, i, column, i, leadDiagConnections);
      }
      if (row-i >= 0 && row-i < 3) {
        antiDiagConnections = countConnections(currentPlayer, row, -i, column, i, antiDiagConnections);
      }
    }

    if (row+i >= 0 && row+i < 3) {
      verticalConnections = countConnections(currentPlayer, row, i, column, 0, verticalConnections);
    }
  }

  var winner = findWinner([horizontalConnections, verticalConnections, leadDiagConnections, antiDiagConnections], currentPlayer, winCondition);

  return winner ? winner : null;
}

function findWinner(connections, currentPlayer, winCondition) {
  var winner;
  connections.forEach(function(value){
    if (value.length >= winCondition) {
      value.forEach ( function(winSpot) {
        board[winSpot[0]][winSpot[1]] = currentPlayer + "w";
      })
      winner = currentPlayer;
    } 
  })
  return winner;
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
