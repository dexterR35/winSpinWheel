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
const customModal = $("#customModal");
const _boxContainer = $("._boxContainer");
const _pinImg = $("._pin img");
const mainBox = $("#mainbox");
let buttonPressed = false;

function createAndAppendButton(id, text, clickCallback) {
  console.log(id, "das");
  console.log(text, "text");
  let button = $("<button>", {
    class: "btn",
    id: id,
    text: text,
  }).on("click", function () {
    if (buttonPressed) return;
    buttonPressed = true;
    setTimeout(() => (buttonPressed = false), 6000);
    if (clickCallback) {
      clickCallback();
    }
  });

  $(".modal-footer").append(button);
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
  console.log(prizes);
  console.log(Result[0], "fsdaf");

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
    // applause.play();
    showModal("Congratulations", "You Won The " + SelectedItem + ".");
    createAndAppendButton("btnContinue", "Continua", function () {
      removeModal();
    });
    // Set a lower speed for continuous rotation after the initial spin
  }, 5500);
  // Delay and set reset
  setTimeout(function () {
    _boxContainer.css("transition", "initial");
    _boxContainer.css("transform", "rotate(" + Result[0] + "deg)");
    buttonPressed = false;
  }, 6000);
}

function showModal(title, content) {
  let modalContent = `
    <div class="modal-dialog" >
      <div class="modal-content">
       
          <h5 class="modal-title" id="modalTitle">${title}</h5>
      
        
        <div class="modal-body" id="modalContent">${content}</div>
        <div class="modal-footer">aa</div>
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
    .appendTo("body")
    .fadeIn("slow");
}

function removeModal() {
  $("#customModal").fadeOut("slow", function () {
    $("#customModal").remove();
  });
}
$(document).ready(function () {
  $(".clipPath").each(function (index) {
    console.log(index);
    var rotationAngle = -17 + index * 36;
    _boxContainer.css("transform", "rotate(108deg)");
    $(this).css("transform", "rotate(" + rotationAngle + "deg)");
  });
});
