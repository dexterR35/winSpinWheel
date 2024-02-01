let textAppendedCount = 0;
const texts = [
  ["500", "ron", "./png/elements/x4.webp"],
  ["50", "runde gratuite", "./png/elements/x3.webp"],
];
let prize = "safasf";
let checkIndex = [];
let _percentFixed;
let percentValue = 40;
const _containers = [
  { id: "jsContainer1", completionStatus: false },
  { id: "jsContainer2", completionStatus: false },
  { id: "jsContainer3", completionStatus: false },
];

// function addNewDivContainer() {
//   if (!containerAppended) {
//     // cardsShow.play();
//     let htmlStructure = `
//         <div class="_scrathContainer _apDiv _hR">

//           <div class="_scratchCardParent">
//             ${Array.from(
//               { length: 3 },
//               (_, i) => `
//               <div class="frame_scratch">
//                 <div class="${"_scratch" + "" + (i + 1)} _scratchCard" id=${
//                 "jsContainer" + "" + (i + 1)
//               }>
//                  <div class="prizeScratch"></div>
//                </div>
//               </div>
//             `
//             ).join("")}
//           </div>
//         </div>
//       `;
//     $("#appendDivs").append(htmlStructure);
//     containerAppended = true;
//     addScratch();
//   } else {
//     console.log("Container already appended");
//   }
// }

// this is added when button is pressed
function addScratch() {
  console.log("loaded Scratch Script");
  function checkUpdateStatus() {
    //filter _containers obj
    const completedContainers = _containers.filter(
      (container) => container.completionStatus
    );
    // Check if two or more containers have completionStatus set to true
    if (completedContainers.length >= 2) {
      // console.log(completedContainers, "completedContainers");
      // Disable pointer events for the remaining containers  -> i want to prevent/block and not use the pointerEvents because can be disabled in Inspect Element
      _containers.forEach((container) => {
        if (!container.completionStatus) {
          const containerElement = document.getElementById(container.id);
          if (containerElement) {
            containerElement.style.pointerEvents = "none";
          }
        }
      });
    }
  }
  //create scrath card
  function createScratchCard(containerId, imageForwardSrc, imageBackgroundSrc) {
    const _containerBox = document.getElementById(containerId);
    //settings
    const sc = new ScratchCard(_containerBox, {
      scratchType: SCRATCH_TYPE.BRUSH,
      containerWidth: _containerBox.offsetWidth,
      containerHeight: _containerBox.offsetHeight,
      imageForwardSrc: imageForwardSrc,
      imageBackgroundSrc: imageBackgroundSrc,
      htmlBackground: "", // for percent
      percentToFinish: percentValue,
      clearZoneRadius: 0, // for line
      nPoints: 0, // for spray
      pointSize: 0,
      brushSrc: "./png/brush.webp",
      //callback when finish
      callback: function () {
        let percent = sc.getPercent();
        //fixpercent but not use for now
        _percentFixed = percent.toFixed(2);
        //find indexid of obj
        const containerIndex = _containers.findIndex(
          (container) => container.id === containerId
        );
        //appent containerIndex in an array
        checkIndex.push(containerIndex);
        //check is empty ,check if array is === 2
        if (containerIndex !== -1) {
          if (checkIndex.length === 2) {
            console.log(
              `The Final length of the array is ${checkIndex.length}`
            );

            setTimeout(() => {
              // alert("done 2x");
              startConfetti();
              jackpotWin.play();

              showModal(
                "Congratulations",
                `"You won" ${prizePool}`,
                "scenario2"
              );
            }, 700);
          } else {
            console.log(`The length of the array is ${checkIndex.length}`);
          }
        }
        // cardsShow.play();
        console.log("done single card", containerIndex);
      },
    });

    sc.init()
      .then(() => {
        sc.canvas.addEventListener("scratch.move", () => {
          // cardsShow.play();
          let percent = sc.getPercent().toFixed(0);
          const containerIndex = _containers.findIndex(
            (container) => container.id === containerId
          );
          if (percent >= 0) {
            if (containerIndex !== -1) {
              //add true for two containers and pointer events for last one
              _containers[containerIndex].completionStatus = true;
              checkUpdateStatus();
            }
          }

          // $percentValue check if empty document (prevent Re-render when scratch card)
          if (percent >= 2) {
            if ($(`#${containerId} .prizeScratch:empty`).length > 0) {
              if (textAppendedCount < texts.length) {
                // Check arrays in arrays
                const [text1, text2, imagePath1, imagePath2] =
                  texts[textAppendedCount];
                const prizeScratchDiv = $(`#${containerId} .prizeScratch`);
                // Function to append text and image
                const appendTextAndImage = (text, imagePath, addCls) => {
                  const _addCls = text.slice(0, 3);
                  const divE = $("<div>")
                    .text(text)
                    .addClass("_line" + _addCls.toUpperCase())
                    .hide();
                  const imgE = $("<img>")
                    .attr("src", imagePath)
                    .addClass("prizeImage")
                    .hide();
                  console.log(text, "tesxt");
                  prizeScratchDiv.append(divE);

                  $(`#${containerId}`).append(imgE);
                  //mini bug a second img tag is appended in(dom(parent)) with no attribute, so i check each container and i remove from dom
                  $(`#${containerId} img:not([src],[alt],[title])`).remove();
                  // fadeIn
                  // shinningPopUp.play();
                  divE.fadeIn("fast");
                  imgE.fadeIn("fast");
                };

                // Append text and image for the first/second
                appendTextAndImage(text1, imagePath1);
                appendTextAndImage(text2, imagePath2);

                textAppendedCount++;
              }
            }
          }
          _percentFixed = percent;
        });
      })
      .catch((error) => {
        console.error("Error initializing scratch card:", error);
      });
  }

  _containers.forEach((container) => {
    createScratchCard(
      container.id,
      "./png/elements/unscratched3.webp",
      "./png/elements/scratched.webp"
    );
  });
  console.log("test");
}
