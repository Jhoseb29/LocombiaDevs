import { loginValidation } from "../controller/UserController.js"

const form = document.getElementById("formId")


form.addEventListener('submit', function (event){
    event.preventDefault(); 
    const username = document.getElementById("userId").value
    const password = document.getElementById("passId").value
    loginValidation(username, password)
    .then((users)=>{
        alert(`Login Success: Welcome!`)
        window.location.href= '../index.html'
    })
    .catch((error)=> {
        alert(error.message)
        document.getElementById("userId").value = ""
        document.getElementById("passId").value = ""
    })
})
