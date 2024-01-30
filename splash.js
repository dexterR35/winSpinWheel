console.log("start loader");

function checkImagesLoaded() {
  const images = document.querySelectorAll("img");
  let loadedCount = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
      //   console.log(loadedCount, "image Ready");
    } else {
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          hideSplashScreen();
        }
      };
    }
  });

  // no images, hide the splash screen
  if (loadedCount === images.length) {
    hideSplashScreen();
  }
}

function showSplashScreen() {
  $("#splashScreen").show();

  setTimeout(() => {
    checkImagesLoaded();
  }, 1000);
}

function hideSplashScreen() {
  $("#splashScreen").hide();
}

showSplashScreen();
