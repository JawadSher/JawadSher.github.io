
document.addEventListener("DOMContentLoaded", ()=>{
    let FromdropDown = document.querySelector(".from .drop-down");
    let TodropDown = document.querySelector(".to .drop-down");
    let FromLang = document.querySelectorAll(".from .drop-down ul li");
    let ToLang = document.querySelectorAll(".to .drop-down ul li")
    let FromLangReflect = document.querySelector("#from");
    let ToLangReflect = document.querySelector("#to");
    let FromdownArrow = document.getElementById("from-down-arrow")
    let TodownArrow = document.getElementById("to-down-arrow")
    let input = document.getElementById("input-field")
    let output = document.getElementById("output-field")
    let closebtn = document.getElementById("clear-btn")
    let copy = document.getElementById("copy")
    let fromLanguage;
    let toLanguage;


    // Close Button
    closebtn.style.display = "none"
        input.addEventListener("input", ()=>{
        if(input.value.length >= 1){
            closebtn.style.display = "block";
        }else{
            closebtn.style.display = "none";
        };

        closebtn.addEventListener("click", ()=>{
            input.value = ""
            closebtn.style.display = "none"
        })
    })

    // From Drop Down
    FromdownArrow.addEventListener("click", function () {
      if (FromdropDown.style.display === "block") {
        FromdropDown.style.display = "none";
      } else {
        FromdropDown.style.display = "block";
      }
    });
    
    // To Drop Down
    TodownArrow.addEventListener("click", function () {
        if (TodropDown.style.display === "block") {
          TodropDown.style.display = "none";
        } else {
          TodropDown.style.display = "block";
        }
      });
    
    // From Language
    FromLang.forEach(li => {
        li.addEventListener("click", function() {
            fromLanguage = li.textContent; 
            FromLangReflect.innerHTML = fromLanguage
            FromdropDown.style.display = "none"
        });
    });
    
    // To Language
    ToLang.forEach(li => {
        li.addEventListener("click", function() {
            toLanguage = li.textContent; 
            ToLangReflect.innerHTML = toLanguage
            TodropDown.style.display = "none"
        });
    });
    

    // Typed JS
    var typed = new Typed('.title', {
      strings: ["The Google Text Translator Clone Project", "The LanguagesTranslater", "Web Application Project", "Translate Different Languages"], // Replace with your desired text
      typeSpeed: 70,
      backSpeed:50,
      loopCount:Infinity,
      showCursor:false
    });

    async function translateText(text, targetLanguage) {
      const options = {
        method: 'POST',
        url: 'https://google-translate-v21.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c729c4c10fmsh85e63358b95e41bp1f61c8jsn6030ebffba60',
          'X-RapidAPI-Host': 'google-translate-v21.p.rapidapi.com'
        },
        data: {
          text_to_translate: text,
          dest: targetLanguage
        }
      };
    
      try {
        const response = await axios.request(options);
        console.log(response); // Log the entire response object
        const translatedText = response.data.translation;
        console.log(translatedText);
        return translatedText;
      } catch (error) {
        console.error("Error translating text:", error);
        throw error(error);
      }
    }
    
    input.addEventListener("input", () => {
      const englishText = input.value;
      const targetLanguage = toLanguage
      translateText(englishText, targetLanguage)
        .then(translatedText => {
          output.value = translatedText;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    })

  copy.addEventListener("click", ()=>{
    navigator.clipboard.writeText(output.value)
  })
})