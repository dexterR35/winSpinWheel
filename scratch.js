function initializeScratchCard(containerId, canvasId) {
  console.log(canvasId);
  console.log(containerId);
  let isDrawing, lastPoint;
  let containerIDS = document.getElementById(containerId);
  let canvas = document.getElementById(canvasId);
  canvas.width = containerIDS.offsetWidth;
  canvas.height = containerIDS.offsetHeight;
  let ctx = canvas.getContext("2d");
  let image = new Image();
  let brush = new Image();
  let scale = 1; // Set the initial scale value
  let offsetX, offsetY;
  image.src = "./png/elements/scratched.webp";
  image.onload = function () {
    // Calculate the scaling factor to fit the image within the canvas
    scale = Math.min(canvas.width / image.width, canvas.height / image.height);
    // Center the image within the canvas
    offsetX = (canvas.width - image.width * scale) / 2;
    offsetY = (canvas.height - image.height * scale) / 2;

    // Draw the image
    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      image.width * scale,
      image.height * scale
    );

    // Show the form when Image is loaded.
  };
  brush.src = "./png/brush.png";

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("touchstart", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("touchmove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);
  canvas.addEventListener("touchend", handleMouseUp, false);

  function distanceBetween(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }

  function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1;
    }

    let pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
      pdata = pixels.data,
      l = pdata.length,
      total = l / stride,
      count = 0;

    // Iterate over all pixels
    for (let i = (count = 0); i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  }

  function getMouse(e, canvas) {
    let offsetX = 0,
      offsetY = 0,
      mx,
      my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      } while ((canvas = canvas.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return { x: mx, y: my };
  }

  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;

    if (filledInPixels > 62) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
  }

  function handleMouseMove(e) {
    if (!isDrawing) {
      return;
    }

    e.preventDefault();

    let currentPoint = getMouse(e, canvas),
      dist = distanceBetween(lastPoint, currentPoint),
      angle = angleBetween(lastPoint, currentPoint),
      x,
      y;

    for (let i = 0; i < dist; i++) {
      x = lastPoint.x + Math.sin(angle) * i - 20;
      y = lastPoint.y + Math.cos(angle) * i - 25;
      ctx.globalCompositeOperation = "destination-out";
      //   ctx.drawImage(brush, x, y, canvas.width, canvas.height);
      ctx.drawImage(brush, x, y, brush.width * 0.8, brush.height * 0.5);
    }

    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
}
