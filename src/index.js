import sketchWrapper from "@daeinc/sketch-wrapper";
import { drawCircle } from "@daeinc/draw";
import { snapBy } from "@daeinc/math";
import { hsv2rgb } from "@daeinc/color";

const fps = Math.floor(Math.random() * 10 + 2);

const sketch = ({ context: ctx, width, height }) => {
  const numCircles = fps;
  const numRepeats = 10;

  return ({ width, height, playhead, totalFrames }) => {
    ctx.fillStyle = `#aaa`;
    ctx.fillRect(0, 0, width, height);

    const dim = Math.min(width, height);
    const diam = dim * 0.28;

    ctx.lineWidth = dim * 0.015;
    for (let i = 0; i < numCircles; i++) {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((i / numCircles) * Math.PI * 2);
      drawCircle(ctx, [diam, 0], diam);
      ctx.strokeStyle = `#333`;
      ctx.stroke();
      ctx.restore();
    }

    // force snap to frame interval.
    playhead = snapBy(playhead, 1 / totalFrames);
    const angle = playhead * Math.PI * 2;

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    for (let i = 0; i < numRepeats; i++) {
      drawCircle(ctx, [diam, 0], diam - (diam * i) / numRepeats);
      ctx.fillStyle = `rgb(${hsv2rgb(0.5 + i * 0.05, 1 - i * 0.08, 1)})`;
      ctx.fill();
    }
    ctx.restore();
  };
};

const settings = {
  mode: "2d",
  dimensions: [800, 800],
  pixelRatio: window.devicePixelRatio,
  animate: true,
  duration: 1_000, // 1 second loop
  playFps: fps,
  exportFps: fps,
  framesFormat: ["gif", "webm"],
};

sketchWrapper(sketch, settings);
