


var corners = [[0,0], [0,2], [2,2], [2,0]];
var sides = [[0,1], [1,2], [2,1], [1,0]];


function getContent(position){
  return document.getElementById([position[0], position[1], "content"].join("-"));
}

function makeMove(position, computer, board){
  getContent(position).className = computer;
  board[position[0]][position[1]] = computer;
}

function findFirstMove(maxRow, maxColumn, computer, board){
  // var move = getContent(centrePosition).className === "empty" ? centrePosition : [centrePosition-1, centrePosition[1]-1];
    // move = [centrePosition-1, centrePosition[1]-1];
    move = [0,0];
    makeMove(move, computer, board);
    return move;
    // move = centreSquare.className;
    // board[position[0]][position[1]] = computer;
  // }
  // else {
  //   makeMove([centrePosition-1, centrePosition[1]-1], computer, board);
  //   document.getElementById((position[0]-1)+"-"+(position[1]-1)+"-content").className = computer;
  // }
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
    for (i=1; i<4; i++) {
      if (corners[i][0] !== playerMove[0] && corners[i][1] !== playerMove[1]) 
      {
        move = corners[i];
        break;
      }
  break
    }
  }
  makeMove(move, computer, board);
  return nextMove;
}


/*
1. corner
2. if center -- corner opposite first move, proceed with algorithm
3. if corner -- any other corner, then the last
4. if side -- take corner where opponent blocking doesn't result two in a row. fork
*/