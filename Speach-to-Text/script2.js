
document.addEventListener("DOMContentLoaded", ()=>{
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
    let recognition;
    let speachOn;
    let speechTimer;
    let speech_timeout = 5000;


    function time(){
        let time = new Date();
        let H = time.getHours();
        let M = time.getMinutes();
        
        if(H > 12){
            H -= 12;
        }
        H = (H < 10 ? "0" : "") + H;
        M = (M < 10 ? "0" : "") + M;
        hours.innerHTML = H; 
        minutes.innerHTML = M;
    }
    time();

    function resetSpeechTimer(){
        clearTimeout(speechTimer)
       speechTimer = setTimeout(()=>{
            if(recognition){
                recognition.stop();
            }
        }, speech_timeout)
    }

    function RecognitionStart(){
        recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;

        recognition.onresult = (event) =>{
            const transcript = event.results[0][0].transcript;
            output.textContent = transcript;
            resetSpeechTimer();
        }

        recognition.onerror = (event) =>{
            output.textContent = "Error occurred in recognition"+ event.error;
        }

        recognition.onend = (event) =>{
            btnDesc.innerHTML = "Recognition Stopped";
            title.innerHTML = "Speech to Text";
            setTimeout(() => {
                startBtnImg.src = "assets/voice.svg";
                btnDesc.innerHTML = "Tap to record";
            }, 2000);
        }
        
        recognition.start();
    }
    
    function startRecogniation(){
        startBtn.addEventListener("click", ()=>{
            speachOn = !speachOn;
            if(speachOn){
                startBtnImg.src = "assets/voice-off.svg";
                btnDesc.innerHTML = "Recognition Started ....";
                title.innerHTML = "Recognition Started ....";
                RecognitionStart();
            }else{
                startBtnImg.src = "assets/voice.svg";
                btnDesc.innerHTML = "Tap to record";
                title.innerHTML = "";
                if(recognition){
                    recognition.stop();
                }
            }
        })
    }

    startRecogniation();

    copyBtn.addEventListener("click", ()=>{
        navigator.clipboard.writeText(output.textContent)
    })

    deleteBtn.addEventListener("click", ()=>{
        output.innerHTML = "";
    })

    saveText.addEventListener("click",async ()=>{
        try{
            let handle = await window.showSaveFilePicker();
            let writeable = await handle.createWritable()
            await writeable.write(output.textContent)
            await writeable.close();
        }catch(error){
            alert(error)
        }
    })
})

