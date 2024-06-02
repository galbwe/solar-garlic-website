function makeAudioControlsInteractive(element) {
  const audio = element.querySelector(".audio__file");
  const controls = element.querySelector(".audio__controls");

  const playButton = controls.querySelector(".button--play");
  const pauseButton = controls.querySelector(".button--pause");
  const volumeUp = controls.querySelector(".button--volume-up");
  const volumeDown = controls.querySelector(".button--volume-down");

  function togglePlayPause() {
    playButton.classList.toggle("hidden");
    pauseButton.classList.toggle("hidden");
  }

  playButton.addEventListener("click", function () {
    audio.play();
    togglePlayPause();
  });

  pauseButton.addEventListener("click", function () {
    audio.pause();
    togglePlayPause();
  });

  volumeUp.addEventListener("click", function () {
    audio.volume += 0.1;
  });

  volumeDown.addEventListener("click", function () {
    audio.volume -= 0.1;
  });
}

function main() {
  const audioElements = document.querySelectorAll(".audio");
  audioElements.forEach(makeAudioControlsInteractive);
}

main();
