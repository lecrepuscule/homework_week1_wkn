
//init game section//

runGame();

function runGame() {
  var player1 = "x";
  board=[];
  board = setupBoard(4,4,board);
  initBoard(4,4);
  setClickEvents(player1, board);
}

function setClickEvents(currentPlayer, board) {
  var grid = document.getElementsByClassName("square");
  for (var i=0, len=grid.length; i<len; i++) {
    grid[i].addEventListener("click", function(){
      if (this.getElementsByClassName("empty")[0]) {
        var position = [parseInt(this.id.split("-")[0]), parseInt(this.id.split("-")[1])];
        // currentPlayer = markSquare(position, board, currentPlayer);
        this.getElementsByClassName("empty")[0].className = currentPlayer;
        board[position[0]][position[1]] = currentPlayer;
        var winner = checkConnection(position, currentPlayer, 3, board);
        if (winner) {
          endGame(winner, grid);
        }
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
    });
  }
}

function setupBoard(maxRow, maxColumn, board){
  for (r = 0; r < maxRow; r++) {
    board.push([]);
    for (c = 0; c < maxColumn; c++) {
      board[r][c] = "";
    }
  }
  return board;
}

function initBoard(maxRow, maxColumn){
  var container = document.getElementsByClassName("container")[0];
  var board = document.getElementsByClassName("board")[0];
  container.removeChild(board);
  board = document.createElement("div");
  board.setAttribute("class", "board")

  var newRow;
  var newSquare;
  for (r=0; r<maxRow; r++) {
    newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    newRow.setAttribute("id", "row"+r);
    for (c=0; c<maxColumn; c++) {
      newSquare = document.createElement("div");
      newSquare.setAttribute("class", "square");
      newSquare.setAttribute("id", r+"-"+c);
      newContent = document.createElement("div");
      newContent.setAttribute("class", "empty");
      newSquare.appendChild(newContent);
      newRow.appendChild(newSquare);
    }
    board.appendChild(newRow);
  }
  container.appendChild(board);
}

//init game section//


// function playGame() {
//       if (this.getElementsByClassName("empty")[0]) {
//         var position = [parseInt(this.id.split("-")[0]), parseInt(this.id.split("-")[1])];
//         // currentPlayer = markSquare(position, board, currentPlayer);
//         this.getElementsByClassName("empty")[0].className = currentPlayer;
//         board[position[0]][position[1]] = currentPlayer;
//         var winner = checkConnection(position, currentPlayer, 3, board);
//         if (winner) {
//           endGame(winner, grid);
//         }
//         currentPlayer = currentPlayer === "x" ? "o" : "x";
//       }
// }

function endGame(winner, grid) {
  // for (var i=0, len=grid.length; i<len; i++) {
  //   grid[i].removeEventListener("click", playGame);
  // }
  if (window.confirm(winner + " has won! would you like to play another game?")) {
    // console.log(grid);
    // for (i=0; i<grid.length; i++) {
    //   grid[i].getElementByType("div")[i].className = "empty";
    // }
    runGame();
  } 
  else {
    alert("Bye!");
  }
}

// function runGame(position) {
//   var row = parseInt(position[0]);
//   var column = parseInt(position[1]);
//   markSquare();
// }


function markSquare (position, board, currentPlayer) {
  board[position[0]][position[1]] = currentPlayer;
  currentPlayer = nextPlayer || player1;
  nextPlayer = nextPlayer === player2 ? player1 : player2;
  board[position[0]][position[1]] = currentPlayer;
  return currentPlayer;
}

function countConnections(currentPlayer,row, rIncrement, column, cIncrement, currentCount, board) {
  if (board[row+rIncrement][column+cIncrement] === currentPlayer) { currentCount.push([row+rIncrement,column+cIncrement])
  } 
  else {
    currentCount = [];
  }
  return currentCount;
}

function checkConnection(position, currentPlayer, winCondition, board) {

  var horizontalConnections=[];
  var verticalConnections=[];
  var leadDiagConnections=[];
  var antiDiagConnections=[];
  var row = position[0];
  var column = position[1];

  for (i=1-winCondition; i<winCondition; i++) {
    if (column+i >= 0 && column+i < 3) {
      horizontalConnections = countConnections(currentPlayer, row, 0, column, i, horizontalConnections, board);
      if (row+i >= 0 && row+i < 3) {
        leadDiagConnections = countConnections(currentPlayer, row, i, column, i, leadDiagConnections, board);
      }
      if (row-i >= 0 && row-i < 3) {
        antiDiagConnections = countConnections(currentPlayer, row, -i, column, i, antiDiagConnections, board);
      }
    }

    if (row+i >= 0 && row+i < 3) {
      verticalConnections = countConnections(currentPlayer, row, i, column, 0, verticalConnections, board);
    }
  }

  var winner = findWinner([horizontalConnections, verticalConnections, leadDiagConnections, antiDiagConnections], currentPlayer, winCondition, board);

  return winner ? winner : null;
}

function findWinner(connections, currentPlayer, winCondition, board) {
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
