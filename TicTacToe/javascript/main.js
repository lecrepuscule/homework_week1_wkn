var grid = document.getElementsByClassName("square");

for (i=0; i<grid.length; i++) {
  grid[i].addEventListener("click", function(){
    console.log(this);
    this.getElementsByClassName("empty")[0].className = "x";
    console.log('ouch');
  })
}

var square1 = document.getElementById("1-1");

// square1.addEventListener("click", function(){
//   document.getElementById("1-1-content").className = "x";
// })


