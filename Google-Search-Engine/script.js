document.addEventListener("DOMContentLoaded", ()=>{
    let UserInput = document.getElementById("user-input");
    let searchbar = document.querySelector(".search-bar");
    let closebtn = document.getElementById("close-icon");
    let bar = document.querySelector(".virtical-bar");
    let searchQuery;

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
            var SearchURL = "https://google.com/search?q="+ encodeURIComponent(searchQuery)
            window.location.href = SearchURL
        }
   })

    closebtn.addEventListener("click", ()=>{
        UserInput.value = ""
    })

})


