function addScrath() {
  console.log("loaded scratch");
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
      clearZoneRadius: 90,
      nPoints: 140,
      enabledPercentUpdate: true,
      pointSize: 210,
      brushSrc: "./png/brush.png",

      callback: function () {
        let percent = sc.getPercent();

        if (containerId) {
          console.log(containerId, "each containerId");

          const completedContainers = Object.values(completionStatus).filter(
            (status) => !status
          );
          //from 3xfalse > 1xfalse==true
          // console.log(completedContainers, "fasfasf");
          if (completedContainers.length === 1 && percent >= 90) {
            $("._scratchCard").css("pointerEvents", "none");
            setTimeout(function () {
              jackpotWin.play();
              showModal(
                "Congratulations",
                `"You won" ${prizePool}`,
                "scenario2"
              );
            }, 1000);
          }
        }
      },
    });

    sc.init()
      .then(() => {
        sc.canvas.addEventListener("scratch.move", () => {
          let percent = sc.getPercent();
          // console.log(percent);
          if (!completionStatus[containerId]) {
            if (percent >= 0.01) {
              completionStatus[containerId] = true;
              //find status true
              const completedContainers = Object.values(
                completionStatus
              ).filter((status) => status);
              // console.log(completedContainers);
              //complete status 2xtrue
              if (completedContainers.length === 2) {
                const remainingContainerId = Object.keys(completionStatus).find(
                  (id) => !completionStatus[id]
                );

                if (remainingContainerId) {
                  document.getElementById(
                    remainingContainerId
                  ).style.pointerEvents = "none";
                  document.getElementById(remainingContainerId).style.display =
                    "none";
                }
                console.log(
                  "Two containers reached 50% or more! No more scratching allowed.percent >= 0.1",
                  percent
                );
                return;
              }
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
