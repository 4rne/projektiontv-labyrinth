let dimensionsX = 10;
let dimensionsY = 10;
let cellSize = 100;
let visitedCells = [];
let obstacles = [[3,1], [3,3], [1,2], [2,4], [7,4], [5,4], [0,4], [0,9], [9,8], [7,7]];
let characters = [[8,0,"A"],[5,2,"B"],[2,3,"C"],[0,6,"D"],[5,9,"E"],[4,4,"F"],[2,5,"G"],[7,8,"H"],[7,6,"I"],[1,6,"J"]];
let startX = 5;
let startY = 5;

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
  goto(startX, startY, 0);
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

function valid(x, y) {
  return (constrain(x, 0, dimensionsX - 1) == x && constrain(y, 0, dimensionsY - 1) == y) && !obstacle(x, y);
}

function obstacle(x, y) {
  for(let i = 0; i < obstacles.length; i++) {
    if(obstacles[i][0] == x && obstacles[i][1] == y) {
      return true;
    }
  }
  return false;
}

function invalid(x, y) {
  return !valid(x, y);
}

function visited(x, y) {
  for(let i = 0; i < visitedCells.length; i++) {
    if(visitedCells[i][0] == x && visitedCells[i][1] == y) {
      return true;
    }
  }
  return false;
}

function collect(x, y) {
  for(let i = 0; i < characters.length; i++) {
    let character = characters[i];
    if(character[0] == x && character[1] == y) {
      document.getElementById('solution').innerHTML = document.getElementById('solution').innerHTML + character[2]
      console.log(character[2]);
    }
  }
}

function visit(x, y) {
  if(visitedCells.length > 0) {
    stroke("red")
    strokeWeight(2);
    let p1 = visitedCells[visitedCells.length - 1]
    line(p1[0] * cellSize + cellSize / 2, p1[1] * cellSize + cellSize / 2, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
  }
  visitedCells.push([x, y]);
}

function goto(x, y, i) {
  console.log("Recursion level: " + i);
  if(invalid(x, y) || visited(x, y)) {
    return;
  }

  collect(x, y)
  visit(x, y)

  goto(x+1, y, i + 1) //nach rechts
  goto(x, y+1, i + 1) //nach unten
  goto(x-1, y, i + 1) //nach links
  goto(x, y-1, i + 1) //nach oben
}