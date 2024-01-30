console.log("start script");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    // console.log(randomIndex, "randomIndex");
    currentIndex--;
    // console.log(currentIndex, "curentindex");
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

  let prizes = shuffle([2773, 3133, 3313]); // only 400 prize from bgwheel >  180deg

  let Result = [prizes[0]];
  console.log(Result);
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
    buttonPressed = false;
    _boxContainer.css("transition", "all ease 5s");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
    startConfetti();
    console.log(startConfetti(), "start confetty");
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

  let modal = $("<div>", {
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
        text: scenario === "scenario1" ? "continueb" : "Inregistreaza-te",
        click: buttonsConfig[buttonLabel],
        disabled: buttonClicked,
      }).appendTo("#modalFooter");
      // console.log(buttonPressed, "btncfg");
    }
  }
  modal.focus();
}

$(document).ready(function () {
  $(".clipPath").each(function (index) {
    let rotationAngle = -14 + index * 36;
    console.log(rotationAngle, "rotationAngle");
    _boxContainer.css("transform", "rotate(108deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
});
