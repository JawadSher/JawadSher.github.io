
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


    async function TranslateAPI(text, toLanguage){
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
              dest: toLanguage,
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              const translatedText = response.data.translation;
              return translatedText
          } catch (error) {
              console.error(error);
          }
    }

    input.addEventListener("input", function(){
        const text = input.value
        const lanugage = toLanguage
        TranslateAPI(text, lanugage)
        .then(translatedText =>{
            output.value = translatedText
        }).catch(error =>{
            console.log("Error", error)
        })
    })
    
})