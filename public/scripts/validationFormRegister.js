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

export const validateConfirmPass = (passhtml,ConformPasswordHtml) =>{
    passhtml.classList.toggle("inputError");
    ConformPasswordHtml.classList.toggle("inputError");
    const ErrorSpan = document.getElementById("msErrorConfirmpass");
    ErrorSpan.textContent = MsErros.textPasswordConfirm
    ErrorSpan.style.display = "inline"
}

export const ValidationUser = (userhtml,emailhtml)=>{
    userhtml.classList.toggle("inputError");
    emailhtml.classList.toggle("inputError");
    const ErrorSpan = document.getElementById("Errortitle");
    ErrorSpan.textContent = MsErros.textUserRepeat
    ErrorSpan.style.display = "inline"
}

