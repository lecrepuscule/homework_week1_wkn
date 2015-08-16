
function makeMove(){
  firstMove();
  otherMoves();
}

function getContent(position){
  return document.getElementById([position[0], position[1], "content"].join("-"));
}

function makeMove(position, computer, board){
  getContent(position).className = computer;
  board[position[0]][position[1]] = computer;
}

function findFirstMove(maxRow, maxColumn, computer, board){
  var centrePosition = [Math.floor(maxRow/2), Math.floor(maxColumn/2)];
  var move = getContent(centrePosition).className === "empty" ? centrePosition : [centrePosition-1, centrePosition[1]-1];
    makeMove(move, computer, board);
    // move = centreSquare.className;
    // board[position[0]][position[1]] = computer;
  // }
  // else {
  //   makeMove([centrePosition-1, centrePosition[1]-1], computer, board);
  //   document.getElementById((position[0]-1)+"-"+(position[1]-1)+"-content").className = computer;
  // }
}

function findOtherMoves() {

}