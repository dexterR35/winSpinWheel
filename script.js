function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  console.log(currentIndex, "curentindex");
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    console.log(currentIndex, "curentindex");
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const _boxContainer = $("._boxContainer");
const _pinImg = $("._pin img");
const mainBox = $("#mainbox");
let buttonPressed = false;
let buttonClicked = false;
let containerAppended = false;
let prizePool = "400";

console.log(buttonPressed, "start");
//   <img src="/png//elements/framepilow.png" alt="frame" class="frame_img" />
function addNewDivContainer() {
  if (!containerAppended) {
    cardsShow.play();
    let htmlStructure = `
      <div class="_scrathContainer _apDiv _hR">

        <div class="_scratchCardParent">
          ${Array.from(
            { length: 3 },
            (_, i) => `
            <div class="frame_scratch">
            <div class="tesst"></div>
              <div class="${"_scratch" + "" + (i + 1)} _scratchCard" id=${
              "jsContainer" + "" + (i + 1)
            }>
             </div>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;
    $("#appendDivs").append(htmlStructure);
    containerAppended = true;

    addScrath();
  } else {
    console.log("Container already appended");
  }
}

function spin() {
  if (buttonPressed) {
    return;
  }

  buttonPressed = true;
  console.log(buttonPressed, "spin");

  wheel.play();

  let SelectedItem = "";
  //2773 for 400 yellow
  //4753,2953 for 400 pink
  let prizes = shuffle([2773, 2953, 2773]); // only 400 prize from bgwheel

  let Result = [prizes[0]];

  if (prizes.includes(Result[0])) SelectedItem = prizePool;

  _boxContainer.css("transition", "all ease 5s");
  _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");

  setTimeout(function () {
    _pinImg.addClass("animate");
  }, 100);
  setTimeout(function () {
    _pinImg.removeClass("animate");
    you_win.play();
  }, 5000);
  setTimeout(function () {
    you_win.play();
  }, 4500);
  setTimeout(function () {
    winningLarge.play();
  }, 5500);
  setTimeout(function () {
    showModal("Congratulations", `"You won" + ${SelectedItem}`, "scenario1");
  }, 6000);

  // Delay and set reset
  setTimeout(function () {
    _boxContainer.css("transition", "all ease 5s");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
    buttonPressed = false;
    startConfetti();
    console.log(startConfetti(), "settime reset");
  }, 6000);
}

function showModal(title, message, scenario) {
  let buttonsConfig = {};
  if (scenario === "scenario1" || scenario === "scenario2") {
    if (buttonClicked) {
      return;
    }
    buttonClicked = false;
    buttonsConfig = {
      handleBtnClick: function () {
        bonusWin.play();
        $("#customModal").fadeOut("slow", function () {
          $("#customModal").remove();
          // winningLarge.play();
        });
        setTimeout(function () {
          $("._hR").fadeOut("slow", function () {
            $("._hR").remove();
            setTimeout(addNewDivContainer, 500);
          });
        }, 1000);
      },
    };
  } else {
    console.log("test");
  }
  let modalContent = `
       <div class="modal-dialog" >
       <img class="modalImg" src="./png/elements/suport_text.png"/>
         <div class="modal-content">
            <div class="modal-body" id="modalContent">
              <h5 class="modal-title" id="modalTitle">${title}</h5>
              <div class="content-offer">${message}</div>
            </div>
           <div class="modal-footer" id="modalFooter"></div>
         </div>
       </div>`;

  $("<div>", {
    class: "modalNB",

    id: "customModal",
    style: "display: flex;",
    role: "dialog",
    "aria-labelledby": "modalTitle",
    "aria-describedby": "modalContent",
  })
    .html(modalContent)
    .appendTo("#appendDivs")
    .fadeIn("slow");

  for (let buttonLabel in buttonsConfig) {
    if (buttonsConfig.hasOwnProperty(buttonLabel)) {
      $("<button>", {
        class: "btn btn-primary",
        text: scenario === "scenario1" ? "continueb" : "mergi",
        click: buttonsConfig[buttonLabel],
        disabled: buttonClicked,
      }).appendTo("#modalFooter");
      // console.log(buttonPressed, "btncfg");
    }
  }
  // modal.focus();
}

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
$(document).ready(function () {
  $(".clipPath").each(function (index) {
    console.log(index);
    let rotationAngle = -17 + index * 36;
    _boxContainer.css("transform", "rotate(108deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
});

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
// Initialize each scratch card separately
