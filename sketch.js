/*
For the people who didn't watch until end of the part 2 of the tutorial.
This sketch takes about 120~140 secs to finally draw the water surface animation.
Since it calculate a lot in the setup().
If you want to short the processing time, try change the frmLen value smaller.
like 90 or 60.
*/
const density = '00001111====--                       ';

const frmLen = 120;

let initPoints = [];
let points = [];
let wave = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(12);
  frameRate(20);

  randomSeed(70);
  for(let i = 0; i < 36; i++){
    initPoints.push(createVector(random(width), random(height)));
  }

  for(let f = 0; f < frmLen; f++){
    points.push([]);
    for(let i = 0; i < initPoints.length; i++){
      let pX = 50*sin(f*360/frmLen+6*initPoints[i].x)+initPoints[i].x;
      let pY = 50*cos(f*360/frmLen+6*initPoints[i].y)+initPoints[i].y;
      points[f].push(createVector(pX, pY));
    }
  }

  for(let f = 0; f < frmLen; f++){
    wave.push([]);
    for(let x = 0; x < width; x += res){
      for(let y = 0; y < height; y += res){
        let distances = [];
        for(let i = 0; i < points[f].length; i++){
          let d = (x-points[f][i].x)**2+(y-points[f][i].y)**2;
          distances[i] = d;
        }
        let noise = Math.sqrt(min(distances));
        let index = (x + y * width)*4;

        const r = waveColor(noise, 40, 32, 2.2);
        const g = waveColor(noise, 30, 55, 3.34);
        const b = waveColor(noise, 30, 68, 3.55);
        
        

        //Daytime
        wave[f][index+0] = waveColor(noise, 14.5, 44, 2.5);
        wave[f][index+1] = waveColor(noise, 21, 169, 2.5);
        wave[f][index+2] = waveColor(noise, 40, 225, 3.0);

        //Nighttime
        // wave[f][index+0] = waveColor(noise, 40, 32, 2.2);
        // wave[f][index+1] = waveColor(noise, 30, 55, 3.34);
        // wave[f][index+2] = waveColor(noise, 30, 68, 3.55);

        // wave[f][index+0] = waveColor(noise, 30, 37, 3.77);
        // wave[f][index+1] = waveColor(noise, 30, 13, 3.62);
        // wave[f][index+2] = waveColor(noise, 30, 0, 3.23);

        // wave[f][index+0] = waveColor(noise, 30, 70, 3.6);
        // wave[f][index+1] = waveColor(noise, 30, 14, 3.21);
        // wave[f][index+2] = waveColor(noise, 30, 68, 3.22);

        // wave[f][index+0] = waveColor(noise, 29, 105, 3.13);
        // wave[f][index+1] = waveColor(noise, 30, 130, 3.17);
        // wave[f][index+2] = waveColor(noise, 30, 27, 3.06);
        // wave[f][index+3] = 255;
      }
    }
    console.log('Generating frame data: '+str(f+1)+'/'+str(points.length));
  }
  pixelDensity(1);
}

function draw(){
  let frameIndex = frameCount % frmLen;
  background('#0827F5');

  const res = 10;
  // loadPixels();
  // for(let i = 0; i < wave[frameIndex].length; i+=4){
  //   pixels[i+0] = wave[frameIndex][i+0];
  //   pixels[i+1] = wave[frameIndex][i+1];
  //   pixels[i+2] = wave[frameIndex][i+2];
  //   pixels[i+3] = wave[frameIndex][i+3];
  // }
  // updatePixels();

  for (let i = 0; i < width; i += res) {
    for (let j = 0; j < height; j += res) {
      let index = (i + j * width)*4;
      noStroke();
      const r = wave[frameIndex][index+0];
      const g = wave[frameIndex][index+1];
      const b = wave[frameIndex][index+2];
      const avg = (r + g + b) / 3
      fill(255); 
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      // square(i, j, res);
      textSize(res);
      textAlign(CENTER, CENTER)
      text(density.charAt(charIndex), i, j);
      // text('O', i, j);
    }
  }
  
  //Display feature points
  // beginShape(POINTS);
  // for(let i = 0; i < points[frameIndex].length; i++){
  //   vertex(points[frameIndex][i].x, points[frameIndex][i].y);
  // }
  // endShape();

  for(let i = 0; i < points[frameIndex].length; i++){
    circle(points[frameIndex][i].x, points[frameIndex][i].y, 5);
  }

  
}

function waveColor(x, a, b, e){
  if(x < 0) return b;
  else return Math.pow(x/a, e)+b;
}