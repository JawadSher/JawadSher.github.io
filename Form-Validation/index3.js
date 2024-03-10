document.addEventListener("DOMContentLoaded", function () {
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");
    let cnfrmPassword = document.getElementById("confirm-password")
    let rgstrBtn = document.getElementById("btn1");
    let closeBtn = document.querySelector(".close-btn");
    let inputs = Array.from(document.getElementsByTagName("input"));
    let isValid = true;
    
    function checkInputs(){
        validateField(
            firstName, firstName.value.trim() !== "", "First-Name cannot be blank"
        );
        validateField(
           lastName, lastName.value.trim() !== "", "Last-Name cannot be blank"
        )
        validateField(
            email, isEmail(email.value.trim()), "Not a valid email address"
        );
        validateField(
            phone, isPhone(phone.value.trim()), "Not a valid phone number"
        );
        validateField(
            password, password.value.trim().length >= 8, "Password must be at least 8 characters"
        );
        // validateField(
        //     cnfrmPassword, cnfrmPassword.value.trim() == password.value, "Confirm the password"
        // );

        document.querySelectorAll(".form-area").forEach((forms)=>{
            if(forms.classList.contains("error")){
                isValid = false;
            };
        });
        return isValid;
    };

    function validateField(input, condition, errorMessage){
        if(condition){
            setSuccess(input);
        }else{
            setError(input, errorMessage);
        };
    };

    function setSuccess(input){
        let inputForms = input.parentElement;
        let icon = inputForms.querySelector(".check-icon");

        inputForms.className = "form-area success";
        icon.className = "check-icon fa-solid fa-circle-check";
    };

    function setError(input, message){
        let inputForms = input.parentElement;
        let icon = inputForms.querySelector(".check-icon");

        inputForms.className = "form-area error";
        icon.className = "check-icon fa-solid fa-circle-xmark"
        input.placeholder = message;
    };  

    function isEmail(email){
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    };

    function isPhone(phone){
        return /^\+?(\d.*){3,}$/.test(phone);
    };

    firstName.addEventListener("input", function(){
        validateField(
            firstName, firstName.value.trim() !== "", "First-Name cannot be blank"
        );
    });
    lastName.addEventListener("input", function(){
        validateField(
            lastName, lastName.value.trim() !== "", "Last-Name cannot be blank"
        );
    });
    email.addEventListener("input", function(){
        validateField(
            email, isEmail(email.value.trim()), "Not a valid email address"
        );
    });
    phone.addEventListener("input", function(){
        validateField(
            phone, isPhone(phone.value.trim()), "Not a valid phone number"
        );
    });
    password.addEventListener("input", function(){
        validateField(
            password, password.value.trim().length >= 8, "Password must be at least 8 characters"
        );
    });
    // cnfrmPassword.addEventListener("input", function(){
    //     validateField(
    //         cnfrmPassword, cnfrmPassword.value.trim() == password.value, "Confirm the password"
    //     );
    // });

    function formSuccess(){
        const modal = document.querySelector("#successModal");
        modal.style.display = "block";

        closeBtn.onclick = function(){
            modal.style.display = "none"
            inputs.forEach(input =>{
                input.value = ""
                input.placeholder = "";
                input.style.border = "2px solid #ddd"
                input.parentElement.classList.remove("success", "error")
                let icon = input.parentElement.querySelector(".check-icon")
                icon.className = ".check-icon"
            })
        }

        window.onclick = function(e){
            if(e.target === modal){
                modal.style.display = "none"
                inputs.forEach(input =>{
                    input.value = ""
                    input.placeholder = "";
                    input.style.border = "2px solid #ddd"
                    input.parentElement.classList.remove("success", "error")
                    let icon = input.parentElement.querySelector(".check-icon")
                    icon.className = ".check-icon"
                })
            }
        }
    }

    function redirection(){
        // let url = "http://127.0.0.1:5500/WEB%20Developement%20Projects/Form%20Validation/form%20validation%20plus%20redirection%20and%20user%20management/"+"index.html"

        const loadingContainer = document.querySelector(".loading-container");
        loadingContainer.style.display = "block";
        setTimeout(() => {
            // window.location.href = url;
            loadingContainer.style.display = "none"; // Hide loading screen
          }, 3000);
    }

    function sendDataToServer(data){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:5000/register/", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function(){
            if(xhr.status === 200){
                console.log("Data Send Successfully to database");
            }else{
                console.error("Failed to send data to server!")
            }
        }
        xhr.send(JSON.stringify(data))
    }

    
//     rgstrBtn.addEventListener("click", function(e){
//         e.preventDefault();
//         if(checkInputs()){
//             document.getElementById("RegisterationForm").addEventListener("submit", function(event){
//                 event.preventDefault();
//                 var formData = new FormData(this);
//                 var jsonObject = {}
//                 for(const [key, value] of formData.entries()){
//                     jsonObject[key] = value;
//                 }
//                 sendDataToServer(jsonObject);
//             })
//             formSuccess();
//             setTimeout(()=>{
//                 const modal = document.querySelector("#successModal");
//                 modal.style.display = "none";
//             }, 1000)
//             setTimeout(()=>{
//                 redirection();
//             }, 2000)
//         }
//     })

// });

document.getElementById("RegisterationForm").addEventListener("submit", function(event){
        event.preventDefault();
        if(checkInputs()){
                var formData = new FormData(this);
                var jsonObject = {}
                formData.forEach(function(value, key){
                    jsonObject[key] = value;
                })
                sendDataToServer(jsonObject);
                formSuccess();
                setTimeout(()=>{
                    const modal = document.querySelector("#successModal");
                    modal.style.display = "none";
                }, 1000)
                setTimeout(()=>{
                    redirection();
                }, 2000)
            }
        })
        
})
  