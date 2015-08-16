
function makeMove(){
  firstMove();
  otherMoves();
}

function firstMove(){
  position = [floor(maxRow/2), floor(maxColumn/2)];
  centreSquare = document.getElementById(position[0]+"-"+position[1]);
  if (centreSquare.className === empty) {
    document.getElementById(position[0]+"-"+position[1]).className = computer;
    board[position[0]][position[1]] = computer;
  }
  else {
    document.getElementById(position[0]-1+"-"+position[1]-1).className = computer;
  }
}