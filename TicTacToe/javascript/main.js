
//init game section//

runGame("x");

function runGame(computer) {
  // var maxRow = prompt("number of rows");
  // var maxColumn = prompt("number of columns");
  // var winCondition = prompt("how many connections to win");
  // var player1 = prompt("who goes first? x/o");

  var maxRow = 3;
  var maxColumn = 3;
  var winCondition= 3;
  var player1="o";
  var board=[];

  board = setupBoard(maxRow,maxColumn,board);
  initBoard(maxRow,maxColumn);
  setClickEvents(player1, board, winCondition);
  
  if (computer) {
    firstMove(maxRow, maxColumn, computer, board);
  }
}

function setClickEvents(currentPlayer, board, winCondition) {
  var grid = document.getElementsByClassName("square");
  for (var i=0, len=grid.length; i<len; i++) {
    grid[i].addEventListener("click", function(){
      if (this.getElementsByClassName("empty")[0]) {
        var position = [parseInt(this.id.split("-")[0]), parseInt(this.id.split("-")[1])];
        // currentPlayer = markSquare(position, board, currentPlayer);
        this.getElementsByClassName("empty")[0].className = currentPlayer;
        board[position[0]][position[1]] = currentPlayer;
        var winner = checkConnection(position, currentPlayer, winCondition, board);
        if (winner) {
          endGame(winner, grid);
        }
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
    });
  }
}

// function initGame() {
//   maxRow = prompt("number of rows");
//   maxColumn = prompt("number of columns");
//   winCondition = prompt("how many connections to win");
//   player1 = prompt("who goes first? x/o");
// }

function setupBoard(maxRow, maxColumn, board){
  for (r = 0; r < maxRow; r++) {
    board.push([]);
    for (c = 0; c < maxColumn; c++) {
      board[r][c] = "";
    }
  }
  return board;
}


//maybe create a "div factory" that takes in attributes and generate elements//
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
      newContent.setAttribute("id", r+"-"+c+"-content");
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
  alert(winner === "draw" ? "It's a draw!" : winner + " has won!");
  if (window.confirm("Would you like to play another game?")) {
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
  if (board[row+rIncrement][column+cIncrement] === currentPlayer) { 
    currentCount.push([row+rIncrement,column+cIncrement])
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
  var maxRow = board.length;
  var maxColumn = board[0].length;
  var winner;

  for (i=1-winCondition; i<winCondition; i++) {
    if (column+i >= 0 && column+i < maxColumn) {
      horizontalConnections = countConnections(currentPlayer, row, 0, column, i, horizontalConnections, board);
      if (row+i >= 0 && row+i < maxRow) {
        leadDiagConnections = countConnections(currentPlayer, row, i, column, i, leadDiagConnections, board);
      }
      if (row-i >= 0 && row-i < maxRow) {
        antiDiagConnections = countConnections(currentPlayer, row, -i, column, i, antiDiagConnections, board);
      }
    }

    if (row+i >= 0 && row+i < maxRow) {
      verticalConnections = countConnections(currentPlayer, row, i, column, 0, verticalConnections, board);
    }

    var winner = findWinner([horizontalConnections, verticalConnections, leadDiagConnections, antiDiagConnections], currentPlayer, winCondition, board);
    
    if (winner) {
      return winner;
    }
    else {
      continue;
    }
  }
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
    else if (document.getElementsByClassName("empty").length < 1) {
      winner = "draw";
    }
  })
  return winner;
}

////////some trial AI functions///////
function firstMove(maxRow, maxColumn, computer, board){
  var position = [Math.floor(maxRow/2), Math.floor(maxColumn/2)];
  var centreSquare = document.getElementById(position[0]+"-"+position[1]+"-content");
  if (centreSquare.className === "empty") {
    centreSquare.className = computer;
    board[position[0]][position[1]] = computer;
  }
  else {
    document.getElementById((position[0]-1)+"-"+(position[1]-1)+"-content").className = computer;
  }
}


