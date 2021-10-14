
const canvas = document.getElementById("rain-something");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const AG = 9.81; // Acceleration of gravity

// let raf;

const MODE = {
  RAIN: "RAIN", // rainning mode, just vertical drop
  SNOOKER: "SNOOKER" // like snooker, will rebound when hit boundary
};
const EMOJI_CODE = ["1F966"];

const EMOJI_NUMBER = EMOJI_CODE.length; // how many emojis

/**
 * @param {string} - emoji char code
 * @return {string} - the emoji char for a codepoint.
 *
 * copy from https://github.com/notwaldorf/emoji-rain
 * lifted from https://github.com/twitter/twemoji
 */
function getEmojiFromCodePoint(codePoint) {
  let code =
    typeof codePoint === "string" ? parseInt(codePoint, 16) : codePoint;
  if (code < 0x10000) {
    return String.fromCharCode(code);
  }
  code -= 0x10000;
  return String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff));
}

/**
 * Class representing a raindrop
 */
class RainDrop {
  /**
   * creates a raindrop
   * @param {string} emoji - emoji char to display as the raindrop
   * @param {number} maxHeight - raindrop initial position 0~max height, default canvas's height
   * @param {number} maxWidth - raindrop initial position 0~max width, default canvas's width
   * @param {number} maxVelocity - raindrop max velocity, default 5
   * @param {string} mode - can be MODE.RAIN, or MODE.SNOOKER
   */


  constructor(
    emoji,
    maxHeight = canvas.height, 
    maxWidth = canvas.width, 
    maxVelocity = 10,
    mode = MODE.RAIN
  ) {
    this.text = emoji;
    this.x = Math.random() * maxWidth;
    this.y = Math.random() * maxHeight;
    this.vx = mode === MODE.RAIN ? 0 : Math.random() * maxVelocity;
    this.vy = mode === MODE.RAIN ? AG : Math.random() * maxVelocity;
    this.font = "150px serif";
    // this.color = '#fff';
  }

  drawDrop(ctx) {
    ctx.font = this.font;
    ctx.fillText(this.text, this.x, this.y);
    // ctx.fillStyle = this.color;
  }

  move(maxHeight, maxWidth) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > maxWidth || this.y > maxHeight) {
      this.x = Math.random() * maxWidth;
      this.y = -50;
    }
    // console.log(maxHeight, maxWidth);
    // this.vy *= 0.99;
    // this.vy += 0.25;

    // // boundary
    // if (this.y + this.vy > maxHeight ||
    //     this.y + this.vy < 0) {
    //     this.vy = -this.vy * 0.99;
    // }
    // if (this.x + this.vx > maxWidth ||
    //     this.x + this.vx < 0) {
    //     this.vx = -this.vx * 0.99;
    // }
  }
}

const maxDrops = 10;
const EMOJI_MODE = {
  SINGLE: "SINGLE",
  MIXED: "RANDOM"
};

function generateEmojiDrops(mode = EMOJI_MODE.SINGLE) {
  const drops = [];
  switch (mode) {
    case EMOJI_MODE.SINGLE: {
      const emoji = getEmojiFromCodePoint(
        EMOJI_CODE[Math.floor(Math.random() * EMOJI_NUMBER)]
      );
      for (let i = 0; i < maxDrops; i++) {
        drops.push(new RainDrop(emoji));
      }
      break;
    }
    case EMOJI_MODE.MIXED: {
      for (let i = 0; i < maxDrops; i++) {
        const emoji = getEmojiFromCodePoint(
          EMOJI_CODE[Math.floor(Math.random() * EMOJI_NUMBER)]
        );
        drops.push(new RainDrop(emoji));
      }
    }
    default:
      break;
  }
  return drops;
}
let emojiMode = EMOJI_MODE.SINGLE;
let emojiDrops = generateEmojiDrops(emojiMode);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < maxDrops; i++) {
    emojiDrops[i].drawDrop(ctx);
    emojiDrops[i].move(canvas.height, canvas.width);
  }

  // window.requestAnimationFrame(draw);
}

// window.requestAnimationFrame(draw);
let loopId = setInterval(draw, 50);
window.addEventListener("", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});



