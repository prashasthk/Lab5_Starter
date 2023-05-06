// explore.js

window.addEventListener('DOMContentLoaded', init);
let voices = [];


function init() {
    const synth = window.speechSynthesis;
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
          document.getElementById("voice-select").appendChild(option);
      }
    });

    document.querySelector("button").addEventListener('click', function() {
        const speech = new SpeechSynthesisUtterance(document.getElementById("text-to-speak").value);
        const selectedOption = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
        for (let i = 0; i < voices.length; i++) {
          if (voices[i].name === selectedOption) {
              speech.voice = voices[i];
          }
        }
        speechSynthesis.speak(speech);
        document.querySelector("img").src = "assets/images/smiling-open.png"; 
    });

    setInterval(function() {
        if (!speechSynthesis.speaking) {
          document.querySelector("img").src = "assets/images/smiling.png"; 
        }
    }, 200);
}