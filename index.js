var themeToggler = document.querySelector(".fa-toggle-on");
var searchBtn = document.querySelector(".fa-magnifying-glass");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

searchBtn.addEventListener("click", () => {
  var wordInput = document.getElementById("word").value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`)
    .then((res) => res.json())
    .then((data) => {
      var definitions = document.querySelector(".definitions ul");
      var defs = document.querySelector(".definitions");
      var wordAudio = document.querySelector(".word-audio");
      var errors = document.querySelector(".error-404");
      if (data.title === "No Definitions Found") {
        errors.classList.add("fade-in");
        defs.classList.remove("view-definitions");
        wordAudio.classList.remove("view-word");
        errors.style.display = "flex";
      } else {
        defs.classList.add("view-definitions");
        wordAudio.classList.add("view-word");
        errors.classList.remove("fade-in");
        errors.style.display = "none";
      }
      var word = document.querySelector(".word-symbol h2");
      word.innerHTML = data[0].word;
      word = "";
      var audioPlay = document.querySelector(".fa-play");
      for (let j = 0; j < data[0].phonetics.length; j++) {
        if (data[0].phonetics[j].audio.length != 0) {
          var audio = {};

          audio = data[0].phonetics[j].audio;

          break;
        }
      }

      audioPlay.addEventListener("click", () => {
        newAudio = new Audio(audio);
        newAudio.play();
        audio = {};
      });

      var phonetic = document.querySelector(".symbol");
      var phonetics = data[0].phonetics;
      console.log(phonetics);
      let phoneticList = "";
      if (Array.isArray(phonetics)) {
        for (let i = 0; i < phonetics.length; i++) {
          if ("text" in phonetics[i]) {
            phoneticList += `<p>${phonetics[i].text}</p> <span>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16"> <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> </svg></span>`;
          }
        }
        phonetic.innerHTML = phoneticList;
      } else {
        console.log("");
      }

      var definitionList = "";

      data.forEach((obj) => {
        obj.meanings.forEach((meaning) => {
          meaning.definitions.forEach((definition) => {
            definitionList += `<li> <p class="part-of-speech">${
              meaning.partOfSpeech
            }</p> ${definition.definition} <span class="example"> ${
              "example" in definition ? "Example: " + definition.example : ""
            }</span></li>`;
            definitions.innerHTML = definitionList;
          });
        });
      });
    });
});
