console.log("start lazy loading script");

function lazyLoadImages() {
  // Lazy load images with 'src' attribute
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    console.log(img);
    img.setAttribute("loading", "lazy");
  });

  // Lazy load background images
  const elementsWithBackground = document.querySelectorAll(
    "[data-lazy-background]"
  );
  console.log(elementsWithBackground, "Fasfa");
  elementsWithBackground.forEach((element) => {
    const imageUrl = element.getAttribute("data-lazy-background");
    element.style.backgroundImage = `url('${imageUrl}')`;
  });
}

function showSplashScreen() {
  $("#splashScreen").show();

  lazyLoadImages();

  // Optionally, you can still check for the loaded images
  checkImagesLoaded();
}

function hideSplashScreen() {
  $("#splashScreen").fadeOut("slow", function () {
    $("#splashScreen").remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showSplashScreen();
});

// Check if all images are loaded
function checkImagesLoaded() {
  const images = document.querySelectorAll("img");
  let loadedCount = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
      console.log(loadedCount, "image Ready");
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
    setTimeout(function () {
      hideSplashScreen();
    }, 1500);
  }
}
