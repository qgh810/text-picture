// window.onload = onload;
// alert(111)

// function onload () {
//     alert(222)
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.font = '35px Microsoft YaHei';
//     ctx.fillText('hello world, hello world, hello world', 50, 50);
// }
const WIDTH = 200;
const HEIGHT = 200;
const mixColorCount = 4 // 去除边界极端颜色数量
const colorCount = 10
const grayColorCount = colorCount + mixColorCount; // 不可以大于256
const colorStep = parseInt(256 / grayColorCount);
const colors = genGrayColor(grayColorCount)
const colorIndexs = []

let imageData = null;

window.onload = function () {
  const imageCanvasCtx = initImageData()
  getColorIndexs(imageCanvasCtx)
  print()
}

function initImageData() {
  const imageCanvas = document.getElementById('image-canvas');
  // const textCanvas = document.getElementById('text');
  imageCanvas.width = WIDTH;
  imageCanvas.height = HEIGHT;
  const ctx = imageCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const image = document.getElementById('image');
  ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
  return ctx;
}

function getColorIndexs (imageCanvasCtx) {
  imageData = imageCanvasCtx.getImageData(0, 0, WIDTH, HEIGHT);
  const picLength = WIDTH * HEIGHT
  for (var i = 0; i < picLength * 4; i += 4) {
    var r = imageData.data[i];
    var g = imageData.data[i + 1];
    var b = imageData.data[i + 2];
    const myGray =  parseInt((r + g + b) / 3);
    let colorIndex = parseInt(myGray / colorStep)
    colorIndexs.push(colorIndex)
  }
}

function print() {
  const resultCanvas = document.getElementById('result-canvas');
  const size = 14
  resultCanvas.width = WIDTH * size
  resultCanvas.height = HEIGHT * size
  const resultCanvasCtx = resultCanvas.getContext('2d');

  colorIndexs.forEach((colorIndex, index) => {
    const y = parseInt(index / WIDTH) * size;
    const x = (index % WIDTH) * size;
    printItem(colorIndex, x, y, resultCanvasCtx, size)
  });
}

function printItem (colorIndex, x, y, ctx, size) {
  const grayColorNum = colors[colorIndex];
  const color = `rgb(${grayColorNum}, ${grayColorNum}, ${grayColorNum})`
  ctx.fillStyle = color;
  // ctx.fillRect(x, y, size, size);
  ctx.font = size + 'px Microsoft YaHei';
  ctx.fillText('妮', x, y);
}

function genGrayColor(grayColorCount) {
  const colors = []
  for (let index = 0; index < grayColorCount + 1; index++) {
    let color = parseInt(colorStep * index)
    if (color >= 256) color = 256
    colors.push(color) 
  }

  // 抹除边界的颜色粒度，减少颜色
  colors.forEach((color, index) => {
    if (index >= colors.length - mixColorCount) {
      colors[index] = 256
    } else if (index < mixColorCount) {
      colors[index] = 0
    }
  })

  return colors;
}