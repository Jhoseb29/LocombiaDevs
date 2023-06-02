import { registerUser } from "../controller/UserController.js";
const registerForm = document.getElementById('registerForm');


registerForm.addEventListener('submit', function (event){
    event.preventDefault();
    
    const username = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Password and password confirmation don't match");
        return; // Detener la ejecución si no coinciden
    }
    
    postUser(username, email, password)
    .then(function () {
        // Realizar acciones adicionales después del registro exitoso
        window.location.href = '../views/login.html'
    })
    .catch(function (error) {
        // Mostrar una alerta al usuario con el mensaje de error
        alert(error.message);

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
    });

})

