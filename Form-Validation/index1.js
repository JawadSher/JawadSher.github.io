document.addEventListener("DOMContentLoaded", function () {
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");
    let loginBtn = document.getElementById("btn");
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
        let url = "http://127.0.0.1:5500/WEB%20Developement%20Projects/Form%20Validation/form%20validation%20plus%20redirection%20and%20user%20management/"+"index2.html"

        const loadingContainer = document.querySelector(".loading-container");
        loadingContainer.style.display = "block";
        setTimeout(() => {
            window.location.href = url;
            loadingContainer.style.display = "none"; 
          }, 3000);
    }
    
    loginBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(checkInputs()){
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

});
  