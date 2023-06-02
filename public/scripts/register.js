import { RegisterUser } from "../controller/UserController.js";
import { validateConfirmPass } from "./validationFormRegister.js";
const registerForm = document.getElementById('registerForm');





registerForm.addEventListener('submit', function (event){
    
    event.preventDefault();
    const username = document.getElementById('name')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirmPassword');

    if (password.value !== confirmPassword.value) {
        validateConfirmPass(password,confirmPassword)
        return; // Detener la ejecución si no coinciden
    }
    
    RegisterUser(username, email, password.value)
    .then(function () {
        // Realizar acciones adicionales después del registro exitoso
        window.location.href = '../views/login.html'
    })
    .catch(function (error) {
        
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    });

})

