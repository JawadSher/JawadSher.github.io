document.addEventListener("DOMContentLoaded", ()=>{
    let UserInput = document.getElementById("user-input");
    let searchbar = document.querySelector(".search-bar");
    let closebtn = document.getElementById("close-icon");
    let speech = document.getElementById("voice-icon")
    let bar = document.querySelector(".virtical-bar");
    let searchQuery;
    let speachOn;
    let speech_timeout = 5000

    UserInput.addEventListener("input", ()=>{
        if(UserInput.value != ""){
            searchbar.classList.add("active");
        }else{
            searchbar.classList.remove("active");
        };
    });

    closebtn.style.display = "none";
    bar.style.display= "none";
    UserInput.addEventListener("input", ()=>{
        if(UserInput.value.length > 1){
            closebtn.style.display = "block";
            bar.style.display = "block";
        }else{
            closebtn.style.display = "none";
            bar.style.display = "none";
        };
    })

    UserInput.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
            event.preventDefault(); // Prevent default behaviour
            searchQuery = UserInput.value;
            let SearchURL = "https://google.com/search?q="+ encodeURIComponent(searchQuery)
            window.location.href = SearchURL
        }
   })

   
// Speech to Search Integeration

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
            UserInput.innerHTML = transcript
            let SearchURL = "https://google.com/search?q="+ encodeURIComponent(transcript)
            window.location.href = SearchURL
            resetSpeechTimer();
        }

        recognition.onerror = (event) =>{
            alert(event.error);
        }

        recognition.onend = (event) =>{
            alert(event)
        }
        
        recognition.start();
    }
    
    function startRecogniation(){
        speech.addEventListener("click", ()=>{
            speachOn = !speachOn;
            if(speachOn){
                console.log("recongition start")
                RecognitionStart();
            }else{
                if(recognition){
                    recognition.stop();
                }
                console.log("recognition stopped")
            }
        })
    }

    startRecogniation();

    closebtn.addEventListener("click", ()=>{
        UserInput.value = ""
    })

})


