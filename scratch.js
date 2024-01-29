function addScrath() {
  console.log("loaded scratch");
  // Keep track of completion status for each container
  const completionStatus = {
    jsContainer1: false,
    jsContainer2: false,
    jsContainer3: false,
  };

  function createScratchCard(containerId, imageForwardSrc, imageBackgroundSrc) {
    const _containerBox = document.getElementById(containerId);

    const sc = new ScratchCard(_containerBox, {
      scratchType: SCRATCH_TYPE.LINE,
      containerWidth: _containerBox.offsetWidth,
      containerHeight: _containerBox.offsetHeight,
      imageForwardSrc: imageForwardSrc,
      imageBackgroundSrc: imageBackgroundSrc,
      htmlBackground: "",
      percentToFinish: 90,
      clearZoneRadius: 40,
      nPoints: 100,
      pointSize: 100,
      brushSrc: "./png/brush.png",
      // enabledPercentUpdate: !"";

      callback: function () {
        let percent = sc.getPercent();
        if (containerId) {
          console.log(containerId, "each containerId");
        }
        const completedContainers23 = Object.values(completionStatus).filter(
          (status) => !status
        );

        if (completedContainers23.length === 1 && percent >= 90) {
          console.log(_containerBox);
          $("._scratchCard").css("pointerEvents", "none");
          setTimeout(function () {
            jackpotWin.play();
            showModal(
              "Congratulations",
              `"You won" + ${prizePool}`,
              "scenario2"
            );
          }, 1000);
        }
      },
    });

    sc.init()
      .then(() => {
        let percents = sc.getPercent();
        sc.canvas.addEventListener("scratch.move", () => {
          let percent = sc.getPercent();
          if (!completionStatus[containerId]) {
            if (percent >= 0.1) {
              completionStatus[containerId] = true;
              const completedContainers = Object.values(
                completionStatus
              ).filter((status) => status);

              if (completedContainers.length === 2) {
                const remainingContainerId = Object.keys(completionStatus).find(
                  (id) => !completionStatus[id]
                );

                if (remainingContainerId) {
                  document.getElementById(
                    remainingContainerId
                  ).style.pointerEvents = "none";
                }
                console.log(
                  "Two containers reached 50% or more! No more scratching allowed.percent >= 0.1",
                  percent
                );
                return;
              }
            }
          } else if (percent >= 89 && percent <= 95) {
            const completedContainers2 = Object.values(completionStatus).filter(
              (status) => !status
            );

            if (completedContainers2.length === 1) {
              // console.log("completedContainers2", completedContainers2);
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error initializing scratch card:", error);
      });
  }

  const containerIds = ["jsContainer1", "jsContainer2", "jsContainer3"];

  containerIds.forEach((id) => {
    createScratchCard(
      id,
      "./png/elements/scratched.png",
      "./png/elements/redpilow.png"
    );
  });
}
