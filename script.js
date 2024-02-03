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
let prizePool = "200";

console.log(buttonPressed, "start");

function updateTextBody(text, subtext) {
  $("._tText").text(text);
  $("._tText_s").text(subtext);
}

function spin() {
  if (buttonPressed) {
    return;
  }

  buttonPressed = true;
  console.log(buttonPressed, "spin");

  //wheel.play();

  let SelectedItem = "";
  let prizes = shuffle([2845, 2484, 2845]); // only 400 prize from bgwheel >  360deg >2484->200   2773>400
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
    //you_win.play();
  }, 4500);
  setTimeout(function () {
    _pinImg.removeClass("animate");
  }, 5000);
  setTimeout(function () {
    //winningLarge.play();
    showModal("Felicitari", "scenario1");
    // set initial rotation of the wheel after complete animation
    _boxContainer.css("transition", "all ease 5s");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
  }, 5500);
}

function showModal(title, scenario) {
  let buttonsConfig = {};
  if (scenario === "scenario1" || scenario === "scenario2") {
    if (buttonClicked) {
      return;
    }
    buttonClicked = false;
    buttonsConfig = {
      handleBtnClick: function () {
        // bonusWin.play();
        $("#customModal").fadeOut("fast", function () {
          $(this).remove();
          // winningLarge.play();
        });
        setTimeout(function () {
          $("._hR").fadeOut("fast", function () {
            $(this).remove();
            // bonusWin.play();
            setTimeout(addNewDivContainer, 500);
          });
          $("._hH").fadeOut("fast");
        }, 1000);
      },
    };
  } else {
    console.log("test");
  }

  let imgForModal = `
  <img class="modalImg" src="./png/elements/suport_text.png"/>
`;
  let contentOfferLines =
    scenario === "scenario1"
      ? `
        <div class="content-offer ${scenario}">
          <div class="m_line1">ai câștigat</div>
          <div class="m_line2">${prizePool} rotiri</div>
          <div class="m_line3">gratuite</div>
        </div>`
      : scenario === "scenario2"
      ? `
  
        <div class="content-offer ${scenario}">
          <div class="m_line1">
            <div>ÎNREGISTREAZĂ-TE ACUM</div>
            <div>ȘI PROFITĂ DE PREMIUL TĂU!</div>
        </div >
         <div class="flexScenario">
          <div class ="offerPart1 _of">
          ${imgForModal}
            <div class="m_line2"><div>ROTIRI</div><div>gratis</div><div>${prizePool}</div></div>       
          </div>
          <div class ="offerPart2 _of">
          ${imgForModal}
            <div class="m_line2"><div>PACHET DE</div><div>BUN VENIT</div><div>1500RON</div><div>${prizePool} Rotiri</div></div>     
          </div>
          </div>
        </div>`
      : "";

  let modalContent = `
       <div class="modal-dialog" >
        ${scenario !== "scenario2" ? imgForModal : ""}
         <div class="modal-content ${scenario}">
            <div class="modal-body" id="modalContent">
              <div class="modal-title" id="modalTitle">${title}</div>
              ${contentOfferLines}
            </div>
            </div>
            <div class="modal-footer" id="modalFooter"></div>
       </div>`;

  let modal = $("<div>", {
    class: `modalNB ${scenario}`,
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
        class: "btnNew btn-primary",
        text: scenario === "scenario1" ? "continuă" : "Inregistrează-te",
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
    _boxContainer.css("transform", "rotate(144deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
  updateTextBody("învârte cartonașele și", "rundele gratuite");
  $(".cross").hide();
  $(".menuMobile").hide();

  $(".hamburger").click(function () {
    $(".menuMobile").slideToggle("slow", function () {
      $(".hamburger").toggle();
      $(".cross").toggle();
    });
  });

  $(".cross").click(function () {
    $(".menuMobile").slideToggle("slow", function () {
      $(".cross").toggle();
      $(".hamburger").toggle();
    });
  });
});
