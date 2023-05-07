// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelector = document.getElementById("horn-select");
  const hornImg = document.querySelector("img");
  const audio = document.querySelector("audio");
  const volumeSlider = document.getElementById("volume");
  const volumeImg = document.getElementById("volume-controls").querySelector("img");
  const jsConfetti = new JSConfetti();

  // Set the appropriate horn image and audio based on dropdown selection
  hornSelector.addEventListener('change', function() { 
      if (hornSelector.value == 'air-horn') {
        hornImg.src = "assets/images/air-horn.svg";
        audio.src = "assets/audio/air-horn.mp3";
      } else if (hornSelector.value == 'car-horn') {
        hornImg.src = "assets/images/car-horn.svg";
        audio.src = "assets/audio/car-horn.mp3";
      } else {
        hornImg.src = "assets/images/party-horn.svg";
        audio.src = "assets/audio/party-horn.mp3";
      }
  });

  // Adjust the audio volume and volume icon based on volume slider
  volumeSlider.addEventListener('change', function() {
      audio.volume = volumeSlider.value/100;
      if (volumeSlider.value == 0) {
          volumeImg.src = "assets/icons/volume-level-0.svg";
      } else if (volumeSlider.value < 33) {
          volumeImg.src = "assets/icons/volume-level-1.svg";
      } else if (volumeSlider.value < 67) {
          volumeImg.src = "assets/icons/volume-level-2.svg";
      } else {
          volumeImg.src = "assets/icons/volume-level-3.svg";
      }
  });
  
  // Play horn at selected volume
  document.querySelector("button").addEventListener('click', function() {
      audio.play();
      if (hornSelector.value == 'party-horn') {
          jsConfetti.addConfetti();
      }
  });
}