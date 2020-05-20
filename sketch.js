// Image Classification with MobileNet
// A Beginner's Guide to Machine Learning with ml5.js
// The Coding Train / Daniel Shiffman
// https://youtu.be/D9BoBSkLvFo
// https://thecodingtrain.com/learning/ml5/1.2-webcam-classification.html
// https://editor.p5js.org/codingtrain/sketches/JrudwwVD

let mobilenet;
const key = "7lmLEwC7S2808QIYlb2a3BHcAhRBjGJI"
let classifier;
let video;
let label = '';

function modelReady() {
    console.log('Model is ready!!!');
    const btn = document.querySelector('.btn');
    btn.addEventListener("click", handleBtnClick);
    classifier.load('model.json', customModelReady);
    //mobilenet.predict(gotResults);
}

function customModelReady() {
    console.log('Custom Model is ready!!!');
    label = 'model ready';
    classifier.classify(gotResults);
}
    

let captureResult = [];

const handleBtnClick = () => {
    console.log(captureResult)
    const keywords = captureResult[0].label.split(',')
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


// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function videoReady() {
    console.log('Video is ready!!!');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}


function gotResults(error, results) {
    if (error) {
      console.error(error);
    } else {
      captureResult = results
      label = results[0].label;
      classifier.classify(gotResults);
    }
}