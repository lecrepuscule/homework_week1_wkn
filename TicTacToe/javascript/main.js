
//init game section//

runGame();

function runGame() {

  var AIMode = window.confirm("AIMode?");

  if (AIMode) {
    var maxRow = 3;
    var maxColumn = 3;
    var winCondition= 3;
    var player1="o";
    var AIMode = "x";
  }
  else {
    var maxRow = prompt("number of rows");
    var maxColumn = prompt("number of columns");
    var winCondition = prompt("how many connections to win");
    var player1 = prompt("who goes first? x/o");
  }

  var board=[];
  board = setupBoard(maxRow,maxColumn,board);
  initBoard(maxRow,maxColumn);
  setClickEvents(player1, board, winCondition, AIMode);
  
  if (AIMode) {
    findFirstMove(AIMode, board);
  }
}

function setClickEvents(currentPlayer, board, winCondition, AIMode) {
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

        if (AIMode) {

          if (document.getElementsByClassName("empty").length === 7) {
            findSecondMove(position, currentPlayer, board);
          }
          currentPlayer = currentPlayer === "x" ? "o" : "x";
        }
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

function divGenerator (className, id, name) {
  var newDiv = document.createElement("div");
  newDiv.setAttribute("class", className);
  if (id) {
    newDiv.setAttribute("id", id);
  }
  if (name) {
    newDiv.setAttribute("name", name);
  }
  return newDiv;
}

function initBoard(maxRow, maxColumn){
  var container = document.getElementsByClassName("container")[0];
  var board = document.getElementsByClassName("board")[0];
  container.removeChild(board);
  board = divGenerator("board");

  var newRow;
  var newSquare;
  var name;
  for (r=0; r<maxRow; r++) {
    newRow = divGenerator("row", "row"+r);
    for (c=0; c<maxColumn; c++) {
      if ((c === 0 && r === 0) || ((c === (maxColumn - 1)) && (r === (maxRow - 1))) || (c === 0 && r === (maxRow-1)) || (c=== (maxColumn -1) && r === 0))
      {
        name = "corner";
      }
      else if (c === 0 || r === 0 || c === (maxColumn -1) || r === (maxRow-1)) {
        name = "side";
      }
      else {
        name = "centre";
      }
      newSquare = divGenerator("square", r+"-"+c);
      newContent = divGenerator("empty", r+"-"+c+"-content", name);
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

function endGame(winner) {
  alert(winner === "draw" ? "It's a draw!" : winner + " has won!");
  if (window.confirm("Would you like to play another game?")) {
    runGame();
  } 
  else {
    alert("Bye!");
  }
}



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
  if (document.getElementsByClassName("empty").length < 1) {
      return winner = "draw";
  }
}

function findWinner(connections, currentPlayer, winCondition, board) {
  var winner;
  connections.forEach(function(value){
    if (value.length >= winCondition) {
      value.forEach ( function(winSpot) {
        board[winSpot[0]][winSpot[1]] = currentPlayer + "wins";
        getContent(winSpot).className = currentPlayer + "wins";
      })
      winner = currentPlayer;
    } 
    // else if (document.getElementsByClassName("empty").length < 1) {
    //   winner = "draw";
    // }
  })
  return winner;
}

////////some trial AI functions///////
// function makeFirstMove(maxRow, maxColumn, computer, board){
//   var position = [Math.floor(maxRow/2), Math.floor(maxColumn/2)];
//   var centreSquare = document.getElementById(position[0]+"-"+position[1]+"-content");
//   if (centreSquare.className === "empty") {
//     centreSquare.className = computer;
//     board[position[0]][position[1]] = computer;
//   }
//   else {
//     document.getElementById((position[0]-1)+"-"+(position[1]-1)+"-content").className = computer;
//   }
// }

corners = [[0,0], [0,2], [2,2], [2,0]];
sides = [[0,1], [1,2], [2,1], [1,0]];


function getContent(position){
  return document.getElementById([position[0], position[1], "content"].join("-"));
}

function makeMove(position, computer, board){
  getContent(position).className = computer;
  board[position[0]][position[1]] = computer;
}

function findFirstMove(computer, board){
    var move = [0,0];
    makeMove(move, computer, board);
    return move;

}

function findSecondMove(playerMove, computer, board) {
  var move;
  var nextMove;
  switch (getContent(playerMove).getAttribute("name")) {
  case "centre": 
    move = [2,2];
    break;
  case "side":
    move = playerMove[0] === 1? [0,2] : [2,0];
    nextMove = [1,1];
    break;
  case "corner":
    var remainingCorners = [];
    for (i=1; i<4; i++) {
      if ((corners[i][0] !== playerMove[0]) || (corners[i][1] !== playerMove[1]))
      {
        remainingCorners.push(corners[i]);
      }
    }
    move = remainingCorners[0];
    nextMove = remainingCorners[1];
  break;
  }
  makeMove(move, computer, board);
}

// function findNextMove(){

// }

// function findConnections(connections, winCondition, board) {
//   var blocker;
//   var opportunity;

//   connections.forEach(function(value){
//     if (value.length >= (winCondition - 1)) {
//       value.forEach ( function(winSpot) {
//         board[winSpot[0]][winSpot[1]] = currentPlayer + "wins";
//         getContent(winSpot).className = currentPlayer + "wins";
//       })
//       winner = currentPlayer;
//     } 
//     // else if (document.getElementsByClassName("empty").length < 1) {
//     //   winner = "draw";
//     // }
//   })
//   return winner;
// }

/*
1. corner
2. if center -- corner opposite first move, proceed with algorithm
3. if corner -- any other corner, then the last
4. if side -- take corner where opponent blocking doesn't result two in a row. fork
*/
