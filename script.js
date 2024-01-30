console.log("start main script");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    // console.log(randomIndex, "randomIndex");
    currentIndex--;
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

      <div class="modalNew"><div>${prizePool}</div></div>
        <div class="_scratchCardParent">
          ${Array.from(
            { length: 3 },
            (_, i) => `
            <div class="frame_scratch">
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
    buttonPressed = true;
  }, 100);
  setTimeout(function () {
    you_win.play();
  }, 4500);
  setTimeout(function () {
    _pinImg.removeClass("animate");
  }, 5000);
  setTimeout(function () {
    winningLarge.play();
    showModal("Congratulations", `"You won" + ${SelectedItem}`, "scenario1");
    // set initial rotation of the wheel after complete animation
    _boxContainer.css("transition", "all ease 5s");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
  }, 5500);
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
          $(this).remove();
          // winningLarge.play();
        });
        setTimeout(function () {
          $("._hR").fadeOut("slow", function () {
            $(this).remove();
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
    // console.log(rotationAngle, "rotationAngle");
    _boxContainer.css("transform", "rotate(108deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
});

let mouseMoveInited = false;
let _seven = document.querySelector("._seven"),
  _crown = document.querySelector("._crown"),
  _dollar = document.querySelector("._dollar");
function onMouseMove(e) {
  (x = e.clientX), (y = e.clientY);

  _seven.style["transform"] =
    "translateX(" +
    (e.clientX * 0.01 - 5) +
    "px) translateY(" +
    -e.clientY * 0.1 +
    "px)";
  _crown.style["transform"] =
    "translateX(" +
    (5 - e.clientX * 0.02) +
    "px) translateY(" +
    (5 - e.clientY * 0.01) +
    "px)";
  _dollar.style["transform"] =
    "translateX(" +
    (e.clientX * 0.02 - 5) +
    "px) translateY(" +
    (5 - e.clientY * 0.01) +
    "px)";
}

function check() {
  if (window.innerWidth > 1000) {
    if (mouseMoveInited) return false;
    mouseMoveInited = true;
    window.addEventListener("mousemove", onMouseMove);
  } else if (mouseMoveInited) {
    mouseMoveInited = false;
    _seven.style["transform"] = "";
    _crown.style["transform"] = "";
    _dollar.style["transform"] = "";
    window.removeEventListener("mousemove", onMouseMove);
  }
}

window.addEventListener("resize", check);

// check();
