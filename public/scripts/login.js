import { loginValidation } from "../controller/UserController.js"

const form = document.getElementById("formId")


form.addEventListener('submit', function (event){
    event.preventDefault(); 
    const username = document.getElementById("userId").value
    const password = document.getElementById("passId").value
    loginValidation(username, password)
    .then((user)=>{
        alert(`Login Success: Welcome!`)
        window.location.href= '../index.html'
        localStorage.setItem('currentUser', JSON.stringify(user));
    })
    .catch((error)=> {
        alert(error.message)
        document.getElementById("userId").value = ""
        document.getElementById("passId").value = ""
    })
})
