/*
For the people who didn't watch until end of the part 2 of the tutorial.
This sketch takes about 120~140 secs to finally draw the water surface animation.
Since it calculate a lot in the setup().
If you want to short the processing time, try change the frmLen value smaller.
like 90 or 60.
*/
const density = '011===--.  ';
const len = density.length;

const frmLen = 120;

let initPoints = [];
let points = [];
let wave = [];
const randScales = [];
let maxNoise = 0;
const res = 10;

function setup(){
  createCanvas(windowWidth, windowHeight+200);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(12);
  frameRate(20);

  // randomSeed(70);
  for(let i = 0; i < 160; i++){
    initPoints.push(createVector(random(width), random(height)));
  }

  for(let f = 0; f < frmLen; f++){
    points.push([]);
    for(let i = 0; i < initPoints.length; i++){
      let pX = 50*sin(f*360/frmLen+6*initPoints[i].x)+initPoints[i].x;
      let pY = 50*cos(f*360/frmLen+6*initPoints[i].y)+initPoints[i].y;
      points[f].push(createVector(pX, pY));
      randScales.push(random(0.4, 2));
    }
  }

  for(let f = 0; f < frmLen; f++){
    wave.push([]);
    for(let x = 0; x < width; x += res){
      for(let y = 0; y < height; y += res){
        let distances = [];
        for(let i = 0; i < points[f].length; i++){
          let d = ((x-points[f][i].x)**2)/randScales[i]+((y-points[f][i].y)**2);
          distances[i] = d;
        }
        let noise = floor(min(distances));
        if (noise > maxNoise) {
          maxNoise = noise;
        }
        let index = x + y * width;
        wave[f][index] = noise;
      }
    }
    console.log('Generating frame data: '+str(f+1)+'/'+str(points.length));
  }
  pixelDensity(1);
  console.log('maxNoise: ', maxNoise)

}

function draw(){
  let frameIndex = frameCount % frmLen;
  background('#0827F5');

  for (let i = 0; i < width; i += res) {
    for (let j = 0; j < height; j += res) {
      let index = i + j * width;
      const n = wave[frameIndex][index]
      const charIndex = floor(map((n**1.32)/10, 0, maxNoise, len, 0));
      noStroke();
      fill(255);
      textSize(res);
      textAlign(CENTER, CENTER)
      text(density.charAt(charIndex), i, j);
    }
  }

  // for(let i = 0; i < points[frameIndex].length; i++){
  //   circle(points[frameIndex][i].x, points[frameIndex][i].y, 5);
  // }
  
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}