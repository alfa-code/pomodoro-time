// image
import tomat from 'src/static/media/tomat-left.png';

//
let canvasDomElement;

const image = new Image();
image.src = tomat;

const imagesArray = [];
const imagesPositions = ['top', 'middle', 'bottom'];

class CanvasImage {
  constructor(w = 200, h = 200, r = 0, pos = imagesPositions[2], speed = 0) {
    this.pos = pos;
    this.s = speed;
    this.w = w;
    this.h = h;
    this.x = window.innerWidth;
    this.y = (() => {
      switch (this.pos) {
        case imagesPositions[0]:
          return 0;
        case imagesPositions[1]:
          return (window.innerHeight / 2) - (this.h / 2);
        case imagesPositions[2]:
          return window.innerHeight - this.h;
        default:
          return (window.innerHeight / 2) - (this.h / 2);
      }
    })();
    this.r = r;
  }

  rotateImage = () => {
    this.r = this.r + 1;
    if (this.r >= 365) {
      this.r = 3;
    }
  }

  setSize = (percentHeight, percentValue) => {
    this.w = percentHeight * percentValue;
    this.h = percentHeight * percentValue;
  }

  setYPosition = (heightPercent) => {
    switch (this.pos) {
      case imagesPositions[0]:
        this.y = heightPercent * 10;
        break;
      case imagesPositions[1]:
        this.y = (window.innerHeight / 2) - (this.h / 2) - (heightPercent * 3);
        break;
      case imagesPositions[2]:
        this.y = (window.innerHeight - this.h) + (heightPercent * 7);
        break;
      default:
        this.y = (window.innerHeight / 2) - (this.h / 2);
        break;
    }
  }

  stepLeft = () => {
    this.x = this.x - 0.1 - this.s;

    if (this.x < (0 - this.w - 10)) {
      this.x = (window.innerWidth + 10);
    }
  }

  stepRotate = () => {
    this.r = this.r + 1;
    if (this.r > 365) {
      this.r = 0;
    }
  }
}

imagesArray.push(new CanvasImage(0, 0, 0, imagesPositions[0], 0.1));
imagesArray.push(new CanvasImage(0, 0, 0, imagesPositions[1], 0.3));
imagesArray.push(new CanvasImage(0, 0, 0, imagesPositions[2], 0.7));

function clearContext(context) {
  canvasDomElement.width = canvasDomElement.width;
  context.fillStyle = 'rgba(0, 0, 0, 0)';
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowColor = 'rgba(0, 0, 0, .4)';
  context.shadowBlur = 30;
  context.fillRect(0, 0, canvasDomElement.width, canvasDomElement.height);
}

function drawImage(context, img) {
  context.drawImage(image, img.x, img.y, img.w, img.h);
}

function drawCanvas(context) {
  clearContext(context);
  const imagesArrayLength = imagesArray.length - 1;
  imagesArray.forEach((item, i) => {
    item.stepLeft();
    if (i !== imagesArrayLength) {
      drawImage(context, item);
    } else {
      context.save();
      context.filter = 'blur(3px)';
      drawImage(context, item);
      context.restore();
    }
  });
}

function setRenderInterval(context) {
  setInterval(() => {
    requestAnimationFrame(() => {
      drawCanvas(context, canvasDomElement);
    });
  }, 17);
}

function setImagesParams() {
  const { innerHeight } = window;
  const heightPercent = Math.round(innerHeight / 100);

  imagesArray.forEach((item) => {
    switch (item.pos) {
      case imagesPositions[0]:
        item.setSize(heightPercent, 14);
        item.setYPosition(heightPercent);
        break;
      case imagesPositions[1]:
        item.setSize(heightPercent, 24);
        item.setYPosition(heightPercent);
        break;
      case imagesPositions[2]:
        item.setSize(heightPercent, 40);
        item.setYPosition(heightPercent);
        break;
      default:
        item.setSize(heightPercent, 10);
        item.setYPosition(heightPercent);
        break;
    }
  });
}

export default function startDraw(canvasElement) {
  canvasDomElement = canvasElement;
  const context = canvasDomElement.getContext('2d');
  clearContext(context, canvasDomElement);
  setImagesParams();

  window.addEventListener('resize', () => {
    canvasDomElement.width = window.innerWidth;
    canvasDomElement.height = window.innerHeight;

    setImagesParams();
  });

  image.onload = () => {
    setRenderInterval(context, canvasDomElement);
  };
}
