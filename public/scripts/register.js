import { RegisterUser } from "../controller/UserController.js";
import { validateConfirmPass } from "./validationFormRegister.js";

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const firstname = document.getElementById('firstname'); 
  const lastname = document.getElementById('lastname'); 
  const docu = document.getElementById('document'); 

  if (password.value !== confirmPassword.value) {
    validateConfirmPass(password, confirmPassword);
    return; // Detener la ejecución si no coinciden
  }

  RegisterUser(username, email, password.value, firstname.value, lastname.value, docu.value)
    .then(function () {
      // Realizar acciones adicionales después del registro exitoso
      window.location.href = '../views/login.html';
    })
    .catch(function () {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
    });
});