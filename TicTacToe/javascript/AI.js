


var corners = [[0,0], [0,2], [2,2], [2,0]];
var sides = [[0,1], [1,2], [2,1], [1,0]];
var centre = [1,1];

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

function findSecondMove(playerMove) {
  var move;
  if (corners.indexOf(playerMove) !== -1) {
    for (i=1; i<4; i++) {
      if (i !== corners.indexOf(playerMove)) {
        move = corners[i];
        break;
      }
    }
  }
  else if (sides.indexOf(playerMove) !== -1) {
    move = playerMove[0] === 1? [0,2] : [2,0];
  }
  else {
    move = [2,2];
  }
  makeMove(move, computer, board);
}


/*
1. corner
2. if center -- corner opposite first move, proceed with algorithm
3. if corner -- any other corner, then the last
4. if side -- take corner where opponent blocking doesn't result two in a row. fork
*/