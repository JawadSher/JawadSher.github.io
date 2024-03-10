let buttons = document.querySelectorAll("button");
let string = "";
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      try {
        string = eval(string);
        document.querySelector(".input").value = string;
      } catch (error) {
        string = "ERROR";
        document.querySelector(".input").value = string;
      }
    } else if (e.target.innerHTML == "C") {
      string = "";
      document.querySelector(".input").value = string;
    } else if (e.target.innerHTML == "←") {
      if (string.length > 0) {
        string = string.slice(0, string.length - 1);
        document.querySelector(".input").value = string;
      }
    } else {
      string = string + e.target.innerHTML;
      document.querySelector(".input").value = string;
      return;
    }
  });
});

