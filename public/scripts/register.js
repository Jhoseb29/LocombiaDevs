import { postUser } from "../controller/UserController.js";
const registerForm = document.getElementById('registerForm');


registerForm.addEventListener('submit', function (event){
    event.preventDefault();
    
    const username = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    console.log("se ejecuto")

    postUser(username, email, password)
        .then(function (response){
            console.log(response.data)
        })
        .catch(function (error){
            console.log(error)
        })
})

