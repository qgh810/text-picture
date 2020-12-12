// window.onload = onload;
// alert(111)

// function onload () {
//     alert(222)
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.font = '35px Microsoft YaHei';
//     ctx.fillText('hello world, hello world, hello world', 50, 50);
// }
const WIDTH = 2000;
const HEIGHT = 2000;
let ctx = null
let image = null;
let imageData = null;
const grayColorCount = 8; // 不可以大于256
const colorStep = parseInt(256 / grayColorCount);
const colors = genGrayColor(grayColorCount)

window.onload = function () {
  initData()
  drawImage()
  getImageData()
  handleImageData()
  putColorData()
}

function initData() {
  const canvas = document.getElementById('canvas');
  // const textCanvas = document.getElementById('text');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  image = document.getElementById('image')
}

function drawImage() {
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
}

function getImageData () {
  imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
}

function handleImageData() {
  const picLength = WIDTH * HEIGHT
  for (var i = 0; i < picLength * 4; i += 4) {

    var myRed = imageData.data[i];

    var myGreen = imageData.data[i + 1];

    var myBlue = imageData.data[i + 2];

    myGray = getGrayColor(myRed, myGreen, myBlue);
    // console.log(myGray)

    imageData.data[i] = myGray;
    imageData.data[i + 1] = myGray;
    imageData.data[i + 2] = myGray;
  }
}

function putColorData() {
  ctx.putImageData(imageData, 0, 0);
}

function getGrayColor(r, g, b) {
  const gray =  parseInt((r + g + b) / 3) + 20;
  const colorIndex = parseInt(gray / colorStep)
  const color = colors[colorIndex];
  // if (color === undefined) {
  //   throw new Error('color is null')
  // }
  return color || 0;
  // const newGray = gray
}

function genGrayColor(grayColorCount) {
  const colors = []
  for (let index = 0; index < grayColorCount + 1; index++) {
    let color = parseInt(colorStep * index)
    if (color >= 180) color = 256
    if (color <= 80) color = 0
    colors.push(color) 
  }
  return colors;
}