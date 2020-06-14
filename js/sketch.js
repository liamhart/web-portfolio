// credit to Daniel Shiffman for original code
var cols, rows;
var scl = 20;
var w = 2400;
var h = 500;
// starting point for canvas
var start = 400;

var flying = 0;

var terrain = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,start);
  canvas.style('z-index', '-1');
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  var top  = window.pageYOffset || document.documentElement.scrollTop;
  var height = document.body.scrollHeight;
  // end can be no less than 175
  var end = start - (225 * (top / height));
  canvas.position(0, end);
  flying -= 0.01;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(255);
  translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
