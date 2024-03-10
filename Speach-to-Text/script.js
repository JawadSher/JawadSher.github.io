document.addEventListener("DOMContentLoaded", () => {
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let startBtn = document.getElementById("speach");
  let startBtnImg = document.getElementById("start-btn-img");
  let btnDesc = document.getElementById("btn-desc");
  let output = document.getElementById("text");
  let copyBtn = document.getElementById("copy");
  let deleteBtn = document.getElementById("delete");
  let saveText = document.getElementById("save-btn");
  let title = document.getElementById("title");
  let speachOn = false;
  let recognition;
  let speechTimer;
  let speech_timeout = 5000;

  function time() {
    setInterval(() => {
      let time = new Date();
      let time_H = time.getHours();
      let time_M = time.getMinutes();
      if (time_H >= 12) {
        time_H -= 12;
      }
      hours.innerHTML = time_H;
      minutes.innerHTML = time_M;
    }, 1000);
  }
  time();

  function resetSpeechTimer() {
    clearTimeout(speechTimer);
    speechTimer = setTimeout(() => {
      if (recognition) {
        recognition.stop();
      }
    }, speech_timeout);
  }

  function startRecogniation() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      output.textContent = transcript;
      resetSpeechTimer();
    };
    recognition.onerror = (event) => {
      output.textContent = "Error occurred in recognition: " + event.error;
    };

    recognition.onend = () => {
        resetSpeechTimer();
        btnDesc.innerHTML = "Recognition Stoped";
        title.innerHTML = "Speech to Text";
        setTimeout(()=>{
            btnDesc.innerHTML = "Tap to record";
        }, 1000)
    };

    recognition.start();
  }

  function recognitionStart() {
    startBtn.addEventListener("click", () => {
      speachOn = !speachOn;
      if (speachOn) {
        startBtnImg.src = "assets/voice-off.svg";
        btnDesc.innerHTML = "Recording Started ";
        title.innerHTML = "Recognition Started ....";
        startRecogniation();
      } else {
        startBtnImg.src = "assets/voice.svg";
        btnDesc.innerHTML = "Tap to record";
        title.innerHTML = "";
        if (recognition) {
          recognition.stop();
        }
      }
    });
  }
  recognitionStart();

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent);
  });

  deleteBtn.addEventListener("click", ()=>{
    output.innerHTML = ""
  })

  saveText.addEventListener("click", async ()=>{
    try{
        const handle = await window.showSaveFilePicker();
        const Writeable = await handle.createWritable();
        await Writeable.write(output.textContent);
        await Writeable.close();
        console.log("File Saved Successfully")
    }catch(error){
        console.error(error)
    }
  })
  
});




