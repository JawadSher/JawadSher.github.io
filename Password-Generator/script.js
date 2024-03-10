// ******* Password Generator ********

let nums = "1234567890";
let chars = "abcdefghijklmnopqrstuvwxyz";
let symbols = "@#$%*()/-";

const num_checked = document.getElementById("numbers");
const chars_checked = document.getElementById("Characters");
const special_chars = document.getElementById("special-characters");

num_checked.addEventListener("change", check_combination);
chars_checked.addEventListener("change", check_combination);
special_chars.addEventListener("change", check_combination);




const button = document.getElementById("button1");
button.addEventListener("click", check_combination); 

 function check_combination(){
    let combined_chars = "";
    if(num_checked.checked && chars_checked.checked && special_chars.checked){
        console.log("chars, special chars & Nums are checked");

        combined_chars += nums;
        combined_chars += chars;
        combined_chars += symbols;
        
    }
    else if(num_checked.checked && chars_checked.checked){
        console.log("only nums & chars are checked");

        combined_chars += nums;
        combined_chars += chars;
    }
    else if(num_checked.checked && special_chars.checked){
        console.log("only nums & special chars are checked");

        combined_chars += nums;
        combined_chars += symbols;
    }
    else if(chars_checked.checked && special_chars.checked ){
        console.log("only chars & special chars are checked");

        combined_chars += chars;
        combined_chars += symbols;
    }
    else if(num_checked.checked ){
        console.log("only nums are checked");
        
        combined_chars += nums;

    }
    else if(special_chars.checked){
        console.log("only special chars are checked");

        combined_chars += symbols;
    }
    else if(chars_checked.checked){
        console.log("only chars are checked");

        combined_chars += chars;    
    }

    else{
        console.log("Please set the bellow configuration first");
    }

    if(button.click){
        if( button.clicked && combined_chars.length > 0){
            const lengthElement = document.getElementById("length");
            const passwordLength = parseInt(lengthElement.value);
            console.log("The length of the password has been set to : "+passwordLength);
    
            const lengthDisplay = document.getElementById("pass-length");
            lengthDisplay.textContent = "";
            lengthDisplay.textContent = passwordLength;
    
            let password = "";
            while(password.length < passwordLength){
                let randomIndex = Math.floor(Math.random() * combined_chars.length);
                password += combined_chars.charAt(randomIndex);
            }
    
            console.log("generated Password : "+ password);
            document.getElementById("pass").innerHTML = password;
    
        }
        else{
            console.log("Please select at leat one character set");
        }
    }
}

function generate_password(){
    const button = document.getElementById("button1");
    button.addEventListener("click", ()=>{
        button.clicked = true;
        check_combination();
        button.clicked = false;
    })
}

const copyButton = document.getElementById("copy-pass");
copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  const passwordElement = document.getElementById("pass");
  const password = passwordElement.textContent;

  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

}

function copy(){
    document.getElementById("copied-pass").innerHTML = "Password Copied";
}

const lengthInput = document.getElementById("length");
lengthInput.addEventListener("input", updatePasswordLength);

function updatePasswordLength() {
    const lengthElement = document.getElementById("length");
    const passwordLength = parseInt(lengthElement.value);
  
    const lengthDisplay = document.getElementById("pass-length");
    lengthDisplay.textContent = passwordLength;
  }




