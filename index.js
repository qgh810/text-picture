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
const BACKGROUND_COLOR = '#fff'
const TEXT_COLOR = '#666'
const mixColorCountPrev = 2 // 去除边界极端颜色数量
const mixColorCountNext = 2 // 去除边界极端颜色数量
const colorCount = 8; // 不可以大于256 不可以小于2
const noWhiteColorCount = colorCount - mixColorCountPrev - mixColorCountNext + 1
const colorStep = parseInt(256 / (colorCount - 1));
const colors = genColors(colorCount)
const colorIndexs = []
const fontSizes = []
console.log('需要绘制的颜色数量: ' + noWhiteColorCount)

let imageData = null;

window.onload = function () {
  const imageCanvasCtx = initImageData()
  getColorIndexs(imageCanvasCtx)
  print()

  listenerCheckbox()
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

function print(textColor = '#000') {
  const resultCanvas = document.getElementById('result-canvas');
  const size = 30
  resultCanvas.width = WIDTH * size
  resultCanvas.height = HEIGHT * size
  const resultCanvasCtx = resultCanvas.getContext('2d');

  // 填充背景色
  resultCanvasCtx.fillStyle = BACKGROUND_COLOR;
  resultCanvasCtx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
  resultCanvasCtx.fillStyle = textColor;

  colorIndexs.forEach((colorIndex, index) => {
    const y = parseInt(index / WIDTH) * size;
    const x = (index % WIDTH) * size;

    printItem(colorIndex, x, y, resultCanvasCtx, size)
  });
}

function printItem () {
  printItemByCustomFontSize(...arguments);
  // printItemByFontSize(...arguments);
  // printItemByTextColor(...arguments);
  // printItemByCustomTextColor(...arguments);
}

function printItemByCustomTextColor(colorIndex, x, y, ctx, size) {
  let grayColorNum = colors[colorIndex];
  if (grayColorNum >= 200) return;
  if (grayColorNum < 100) grayColorNum = 0;
  const color = `rgb(${grayColorNum}, ${grayColorNum}, ${grayColorNum})`
  ctx.fillStyle = color;
  ctx.font = size + 'px Microsoft YaHei';
  ctx.fillText('妮', x, y);
}

function printItemByCustomFontSize(colorIndex, x, y, ctx, size) {
  let fontSize = size - colorIndex * 3;
  
  if (fontSize < 22) return;

  if (fontSize > 25) {
    fontSize = size;
  } else {
    fontSize = 18;
  }


  if (fontSizes.indexOf(fontSize) === -1) {
    fontSizes.push(fontSize)
  }
  ctx.font = fontSize + 'px STXingkaiSC';
  ctx.fillText('妮', x, y);
}

// 按照字体颜色绘图
function printItemByTextColor(colorIndex, x, y, ctx, size) {
  let grayColorNum = colors[colorIndex];
  if (grayColorNum >= 200) return;
  if (grayColorNum < 100) grayColorNum = 0;
  const color = `rgb(${grayColorNum}, ${grayColorNum}, ${grayColorNum})`
  ctx.fillStyle = color;
  ctx.font = size + 'px Microsoft YaHei';
  ctx.fillText('妮', x, y);
}

// 按照字体大小绘图
function printItemByFontSize(colorIndex, x, y, ctx, size) {
  let fontSize = size - colorIndex * 2;
  if (fontSize < 4) return;
  if (fontSize > size - 3) fontSize = size;
  ctx.font = fontSize + 'px Microsoft YaHei';
  ctx.fillText('妮', x, y);
}

function genColors(colorCount) {
  const colors = []
  for (let index = 0; index < colorCount; index++) {
    let color = parseInt(colorStep * index)

    if (index < mixColorCountPrev) {
      color = 0
    } else if (index >= colorCount - mixColorCountNext) {
      color = 256
    }

    colors.push(color) 
  }

  return colors;
}


function listenerCheckbox() {
  const checkbox = document.getElementById('checkbox');
  checkbox.addEventListener('change', ev => {
    const checked = ev.target.checked;
    console.log(checked)
    const resultCanvas = document.getElementById('result-canvas');
    if (checked) {
      resultCanvas.style.width = '100cm'
      resultCanvas.style.height = '100cm'
    } else {
      resultCanvas.style.width = '10cm'
      resultCanvas.style.height = '10cm'
    }
  })
}