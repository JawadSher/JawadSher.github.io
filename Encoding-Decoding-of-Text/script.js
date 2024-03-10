document.addEventListener("DOMContentLoaded", function () {
  let input = document.getElementById("input");
  let output = document.getElementById("output");
  let encoding = document.getElementById("drop-down");
  let copy = document.getElementById("copy");
  let convert = document.getElementById("convert-btn");
  let title = document.getElementById("title");
  let header = document.getElementById("header");
  let clear = document.getElementById("clear-btn")
  let inputValue;
  let results;
  convert.addEventListener("click", () => {
    switch (encoding.value) {
      case "Text to Binary":
        title.innerHTML = encoding.value;
        header.innerHTML = encoding.value;
        inputValue = input.value;
        results = "";
        for (let i = 0; i < inputValue.length; i++) {
          results += inputValue[i].charCodeAt(0).toString(2) + " ";
        }
        output.innerHTML = results;
        break;

      case "Text to Base64":
        title.innerHTML = encoding.value;
        header.innerHTML = encoding.value;
        inputValue = input.value;
        results = "";
        results = btoa(inputValue);
        output.innerHTML = results;
        break;

      case "Text to Hex":
        title.innerHTML = encoding.value;
        header.innerHTML = encoding.value;
        inputValue = input.value;
        results = "";
        for (let i = 0; i < inputValue.length; i++) {
          results += inputValue.charCodeAt(i).toString(16) + " ";
        }
        output.innerHTML = results;
        console.log(results);
        break;

      default:
        alert("Choose Encoding Type First");
    }
  });

  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);
    copy.textContent = "Copied";

    setTimeout(() => {
      copy.textContent = "Copy";
    }, 400);
  });

  clear.addEventListener("click", ()=>{
    if(input.value == "" && output.value == "" ){
      alert("already Cleared")
    }else{
      input.value = "";
      output.innerHTML = "";
      clear.innerHTML = "Cleared"
      
      setTimeout(()=>{
        clear.innerHTML = "Clear"
      }, 400)
    }
  })

});
