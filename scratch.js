function initializeScratchCard(containerId, scratchDivId) {
  console.log(scratchDivId);
  console.log(containerId);
  let isDrawing, lastPoint;
  let containerIDS = document.getElementById(containerId);
  let scratchDiv = document.getElementById(scratchDivId);
  scratchDiv.style.width = containerIDS.offsetWidth + "px";
  scratchDiv.style.height = containerIDS.offsetHeight + "px";
  scratchDiv.style.position = "relative";
  scratchDiv.style.overflow = "hidden";
  let ctx = scratchDiv.style;

  let image = new Image();
  let brush = new Image();
  let offsetX, offsetY;
  image.src = "./png/elements/scratched.webp";
  image.onload = function () {
    offsetX = scratchDiv.offsetWidth - image.width;
    offsetY = scratchDiv.offsetHeight - image.height;

    // Set the background image
    scratchDiv.style.backgroundImage = "url(" + image.src + ")";
    scratchDiv.style.backgroundPosition = offsetX + "px " + offsetY + "px";
  };
  brush.src = "./png/brush.png";

  scratchDiv.addEventListener("mousedown", handleMouseDown, false);
  scratchDiv.addEventListener("touchstart", handleMouseDown, false);
  scratchDiv.addEventListener("mousemove", handleMouseMove, false);
  scratchDiv.addEventListener("touchmove", handleMouseMove, false);
  scratchDiv.addEventListener("mouseup", handleMouseUp, false);
  scratchDiv.addEventListener("touchend", handleMouseUp, false);

  function distanceBetween(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }

  function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  function getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1;
    }

    let pixels = ctx.getImageData(
        0,
        0,
        scratchDiv.offsetWidth,
        scratchDiv.offsetHeight
      ),
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

  function getMouse(e, div) {
    let offsetX = 0,
      offsetY = 0,
      mx,
      my;

    if (div.offsetParent !== undefined) {
      do {
        offsetX += div.offsetLeft;
        offsetY += div.offsetTop;
      } while ((div = div.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return { x: mx, y: my };
  }

  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;

    if (filledInPixels > 50) {
      scratchDiv.parentNode.removeChild(scratchDiv);
      showModal(
        "Congratulations",
        "You scratched 2 out of 3 cards with at least 60% on each card!",
        "scenario2"
      );
    }
  }

  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, scratchDiv);
  }

  function handleMouseMove(e) {
    if (!isDrawing) {
      return;
    }

    e.preventDefault();

    let currentPoint = getMouse(e, scratchDiv),
      dist = distanceBetween(lastPoint, currentPoint),
      angle = angleBetween(lastPoint, currentPoint),
      x,
      y;

    for (let i = 0; i < dist; i++) {
      x = lastPoint.x + Math.sin(angle) * i - 20;
      y = lastPoint.y + Math.cos(angle) * i - 25;
      ctx.globalCompositeOperation = "destination-out";
      //   ctx.drawImage(brush, x, y, scratchDiv.offsetWidth, scratchDiv.offsetHeight);
      ctx.drawImage(brush, x, y, brush.width * 0.8, brush.height * 0.5);
    }

    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
}
