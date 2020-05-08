/* globals background translate rotateX rotateY rotateZ keyIsPressed key millis cylinder loadImage specularMaterial createCanvas WEBGL ambientLight noStroke PI HALF_PI texture plane sin */

/*****************************************************************************
 *
 * 2020-05-04 15:00 : Mark created a new fake quarter that uses textures right
 * 2020-05-04 : Mark Sherman helped get up-and-down
 *****************************************************************************/

let flip = false;
let land = false;
let begin = 0;
const flipHeight = -300;
const flipTime = 3000; // in milliseconds
let headsImg;
let tailsImg;
let flipSound;
let options = ['heads', 'tails'];

function preload() {
  headsImg = loadImage('quarterheads.png');
  tailsImg = loadImage('quarter-tails-MA.png');
  font = loadFont('static/RobotoSlab-Regular.ttf');
  flipSound = loadSound('CoinFlipSound.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 100, WEBGL);
  noStroke();
}

function draw() {
  ambientLight('white');
  background('beige');
  translate(0, 150, 0);

  const time = millis() - begin;

  if (flip) {
    translate(0, sin(time * (PI / flipTime)) * flipHeight, 0);
    rotateX(time / 500);
    rotateZ(time / 75);
    rotateY(time / 1000);
    land = false;
  }

  if (keyIsPressed && key === ' ') {
    flip = true;
    land = false;
    begin = millis();
    flipSound.play();
    shuffle(options, true);
  }

  if (land) {
    textFont(font);
    textSize(32);
    fill('black');
    text(options[0], -50, -250);
  }

  if (time > flipTime && begin != 0) {
    flip = false;
    land = true;
  }

  coin();
}

function coin() {
  specularMaterial('silver');
  cylinder(50, 4.8);

  if (land && options[0] == 'heads') {
    noStroke();
    rotateX(HALF_PI);
    translate(0, 0, 2.5);
    texture(headsImg);
    plane(100, 100);

    translate(0, 0, -5);
    texture(tailsImg);
    plane(100, 100);
  } else {
    noStroke();
    rotateX(HALF_PI);
    translate(0, 0, 2.5);
    texture(tailsImg);
    plane(100, 100);

    translate(0, 0, -5);
    texture(headsImg);
    plane(100, 100);
  }
}
