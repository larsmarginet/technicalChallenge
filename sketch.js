// Image Classification with MobileNet
// A Beginner's Guide to Machine Learning with ml5.js
// The Coding Train / Daniel Shiffman
// https://youtu.be/D9BoBSkLvFo
// https://thecodingtrain.com/learning/ml5/1.2-webcam-classification.html
// https://editor.p5js.org/codingtrain/sketches/JrudwwVD

let mobilenet;
const key = "7lmLEwC7S2808QIYlb2a3BHcAhRBjGJI"
let video;
let label = '';

function modelReady() {
    console.log('Model is ready!!!');
    const btn = document.querySelector('.btn');
    btn.addEventListener("click", handleBtnClick);
    mobilenet.predict(gotResults);
}

let captureResult = [];

const handleBtnClick = () => {
    const keywords = captureResult[0].className.split(',')
    keywords.forEach(keyword => loadGif(keyword))
}

const loadGif = async keyword => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    return getImage(data.data); 
}

const getImage = results => {
    const $img = document.querySelector(`img`);
    const $slug = document.querySelector(`.slug`);
    const random = results[Math.floor(Math.random() * results.length)]
    $img.src = `${random.images.original.url}`;
    $slug.textContent = random.slug;
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    captureResult = results
    label = results[0].className;
    mobilenet.predict(gotResults);
  }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
