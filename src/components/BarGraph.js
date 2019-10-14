import React, { useRef, useEffect } from 'react';

const BarGraph = value => {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    const x =
      value.total === 0
        ? 0
        : canvas.current.width * (value.value / value.total);
    animate(
      ctx,
      x,
      10,
      canvas.current.width,
      canvas.current.height,
      value.isRight
    );
  });

  function animate(ctx, toX, delay, width, height, isRight) {
    if (!toX) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#A9D0F5';
      ctx.fillRect(1, 1, width, height);
    }

    for (var i = 1; i < toX; i++) {
      if (isRight) {
        drawToRight(i);
      } else {
        drawToLeft(i);
      }
    }

    function drawToLeft(x) {
      setTimeout(function() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#A9D0F5';
        ctx.fillRect(1, 1, width - x, height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(width - x, 1, x, height);
      }, x * delay);
    }

    function drawToRight(x) {
      setTimeout(function() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#A9D0F5';
        ctx.fillRect(x, 1, width - x, height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(1, 1, x - 1, height);
      }, x * delay);
    }
  }
  const canvasWidth =
    document.documentElement.clientWidth > 768
      ? document.documentElement.clientWidth * 0.125
      : document.documentElement.clientWidth * 0.9 * 0.25;

  return (
    <div className="matchInfo_stat_row_graph">
      <canvas
        className="barGraph"
        ref={canvas}
        width={canvasWidth}
        height="15"
      ></canvas>
    </div>
  );
};

export default BarGraph;
