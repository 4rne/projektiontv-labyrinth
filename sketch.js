let dimensionsX = 10;
let dimensionsY = 10;
let cellSize = 100;
let visited = [];
let obstacles = [[3,1], [3,3], [1,2], [2,4], [7,4], [5,4], [0,4], [0,9], [9,8], [7,7]];
let characters = [[8,0,"A"],[5,2,"B"],[2,3,"C"],[0,6,"D"],[5,9,"E"],[4,4,"F"],[2,5,"G"],[7,8,"H"],[7,6,"I"],[1,6,"J"]];

function setup() {
  createCanvas(dimensionsX * cellSize, dimensionsY * cellSize);
  background('#eee')
  for(let i = 1; i < dimensionsX; i++) {
    line(cellSize * i, 0, cellSize * i, dimensionsY * cellSize)
  }
  for(let i = 1; i < dimensionsY; i++) {
    line(0, cellSize * i, dimensionsX * cellSize, cellSize * i)
  }
  addObstacles();
  addCharacters();
}
  
function draw() {
  // put drawing code here
}

function addObstacles() {
  textSize(cellSize / 3)
  textAlign(CENTER, CENTER);
  obstacles.forEach(obstacle => {
    text("X", obstacle[0] * cellSize + cellSize / 2, obstacle[1] * cellSize + cellSize / 2);
  });
}

function addCharacters() {
  textSize(cellSize / 3)
  textAlign(CENTER, CENTER);
  characters.forEach(character => {
    text(character[2], character[0] * cellSize + cellSize / 2, character[1] * cellSize + cellSize / 2);
  });
}

function goto(x, y) {
  if(invalid(x,y) || visited(x,y)) {
    return;
  } 

  collect(x,y) 
  markVisit(x,y) 

  goto(x+1, y) //nach rechts 
  goto(x, y+1) //nach unten 
  goto(x-1, y) //nach links 
  goto(x, y-1) //nach oben 
}