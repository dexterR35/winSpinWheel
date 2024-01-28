function shuffle(array) {
  var currentIndex = array.length,
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
let buttonPressed, buttonClicked;
containerAppended = false;

function addNewDivContainer() {
  if (!containerAppended) {
    let htmlStructure = `
      <div class="_scrathContainer _apDiv">
        <div class="_scratchCardParent">
          ${Array.from(
            { length: 3 },
            (_, i) => `
            <div class="${"_scratch" + "" + (i + 1)} _scratchCard" id=${
              "js-container-" + "" + (i + 1)
            }>
              <canvas class="_scratchCanva" id=${
                "js-canvas-" + "" + (i + 1)
              } width="420px" height="270px"></canvas>
              <div class="_canvaTextContainer">
                <div>text ${i + 1}</div>
              </div>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;
    $("#appendDivs").append(htmlStructure);
    containerAppended = true;
    initializeScratchCard("js-container-1", "js-canvas-1");
    initializeScratchCard("js-container-2", "js-canvas-2");
    initializeScratchCard("js-container-3", "js-canvas-3");
  } else {
    console.log("Container already appended");
  }
}

function spin() {
  if (buttonPressed) {
    return;
  }
  buttonPressed = true;
  wheel.play();
  let SelectedItem = "";
  //2773 for 400 yellow
  //4753,2953 for 400 pink
  let prizes = shuffle([2773, 2953, 2773]);
  let Result = [prizes[0]];
  // console.log(prizes);
  // console.log(Result[0], "fsdaf");
  if (prizes.includes(Result[0])) SelectedItem = "test";

  _boxContainer.css("transition", "all ease 5s");
  _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");

  setTimeout(function () {
    _pinImg.addClass("animate");
  }, 100);
  setTimeout(function () {
    _pinImg.removeClass("animate");
  }, 5000);
  setTimeout(function () {
    _pinImg.removeClass("animate");
    applause.play();

    showModal(
      "Congratulations",
      "You scratched 2 out of 3 cards with at least 60% on each card!",
      "scenario1"
    );
  }, 5500);

  // Delay and set reset
  setTimeout(function () {
    _boxContainer.css("transition", "all ease 5s");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
    buttonPressed = false;
  }, 6000);
}

// function showModal(title, content) {
//   let modalContent = `
//     <div class="modal-dialog" >
//       <div class="modal-content">
//           <h5 class="modal-title" id="modalTitle">${title}</h5>
//         <div class="modal-body" id="modalContent">${content}</div>
//         <div class="modal-footer">aa</div>
//       </div>
//     </div>`;

//   let modal = $("<div>", {
//     class: "modalNB",
//     id: "customModal",
//     style: "display: flex;",
//     role: "dialog",
//     "aria-labelledby": "modalTitle",
//     "aria-describedby": "modalContent",
//   })
//     .html(modalContent)
//     .appendTo("#appendDivs")
//     .fadeIn("slow");
// }

$(document).ready(function () {
  $(".clipPath").each(function (index) {
    console.log(index);
    var rotationAngle = -17 + index * 36;
    _boxContainer.css("transform", "rotate(108deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
});
function showModal(title, message, scenario) {
  let buttonsConfig = {};

  if (scenario === "scenario1" || scenario === "scenario2") {
    if (buttonClicked) {
      // Disable button if already clicked
      return;
    }

    buttonClicked = true;
    buttonsConfig = {
      handleBtnClick: function () {
        $("#customModal").fadeOut("slow", function () {
          $("#customModal").remove();
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
         <div class="modal-content">
             <h5 class="modal-title" id="modalTitle">${title}</h5>
           <div class="modal-body" id="modalContent">${message}</div>
           <div class="modal-footer" id="modalFooter"></div>
         </div>
       </div>`;

  let modal = $("<div>", {
    class: "modalNB",
    modal: {
      backdrop: "static",
      keyboard: false,
    },
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
        disabled: !buttonClicked,
      }).appendTo("#modalFooter");
    }
  }
  // modal.focus();
}
// Initialize each scratch card separately
