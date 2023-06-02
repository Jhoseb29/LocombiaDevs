import { MsErros } from "./MsErros.js";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    if(input.type !== "submit" && input.type !== "checkbox"){
        input.addEventListener("blur", () => {
            console.log(input.validity.valid)
            Validation(input)
        })
    }
})


function Validation (input) {
    console.log(input)
    const ErrorSpan = input.nextElementSibling;
    if (input.validity.valid == false) {
        input.classList.add("inputError")
        ErrorSpan.style.display = "inline"
        ErrorSpan.textContent = MsErros["text"+input.name]
    }
    else{
        ErrorSpan.style.display = "none"
        input.classList.remove("inputError")
        
    }
}

export const ValidateLogin = (bolean) => {
    const Error = document.getElementById("ErorrMsTitle");
    console.log(Error)
    if(bolean == true){
        Error.style.display = "inline"
        Error.textContent = MsErros.textLogin
    }
    else{
        Error.style.display = "none"
    }

}