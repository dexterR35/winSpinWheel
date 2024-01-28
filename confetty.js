let durationConf = 5 * 1000;
let animationEnd = Date.now() + durationConf;
let defaults = {
  startVelocity: 15,
  spread: 360,
  ticks: 30,
  zIndex: 0,
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function startConfetti() {
  confettiInterval = setInterval(function () {
    let timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      stopConfetti();
      return;
    }
    console.log(timeLeft);
    let particleCount = 50 * (timeLeft / durationConf);
    // console.log(particleCountFixed, "count");
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      className: "confetti-particle",
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      className: "confetti-particle",
    });
  }, 100);
}

function stopConfetti() {
  clearInterval(confettiInterval);
}
