// explore.js

window.addEventListener('DOMContentLoaded', init);
let voices = [];


function init() {
    const synth = window.speechSynthesis;
    const voiceSelection = document.getElementById("voice-select");
    
    // Loading all the voices in dropdown
    synth.addEventListener("voiceschanged", function() {
      voices = synth.getVoices();
      for (let i = 0; i < voices.length; i++) {
          const option = document.createElement("option");
          option.textContent = `${voices[i].name} (${voices[i].lang})`;
          if (voices[i].default) {
            option.textContent += " — DEFAULT";
          }
          option.setAttribute("data-lang", voices[i].lang);
          option.setAttribute("data-name", voices[i].name);
          voiceSelection.appendChild(option);
      }
    });

    // Event handler for text-to-speech when "Press to Talk" is pressed
    document.querySelector("button").addEventListener('click', function() {
        const speech = new SpeechSynthesisUtterance(document.getElementById("text-to-speak").value);
        const selectedOption = voiceSelection.selectedOptions[0].getAttribute("data-name");
        for (let i = 0; i < voices.length; i++) {
          if (voices[i].name === selectedOption) {
              speech.voice = voices[i];
          }
        }
        speechSynthesis.speak(speech); 
    });

    // Change face image whether the synthesizer is currently speaking
    setInterval(function() {
        if (synth.speaking) {
          document.querySelector("img").src = "assets/images/smiling-open.png";
        } else {
          document.querySelector("img").src = "assets/images/smiling.png"; 
        }   
    }, 200);
}