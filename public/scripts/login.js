import { loginValidation } from "../controller/UserController.js"

const form = document.getElementById("formId")


form.addEventListener('submit', function (event){
    event.preventDefault(); 
    const username = document.getElementById("userId").value
    const password = document.getElementById("passId").value

    console.log(username)
    console.log(password)
    loginValidation(username, password)
    .then((users)=>{
        alert(`Login Success: Welcome ${users.username}!`)
        window.location.href= '../index.html'
    })
})
