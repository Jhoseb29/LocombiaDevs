import { UpdateUserForm } from "../controller/UserController.js";

const updateForm = document.getElementById('form-update');

updateForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const userId = currentUser.id; // Obtén el ID del usuario que se va a actualizar
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Verificar si se proporcionó un nombre de usuario o correo electrónico no vacío
    if (!username && !email) {
      alert('Debes ingresar al menos un campo para actualizar');
      return;
    }


    UpdateUserForm(userId, username, email, password)
      .then(updatedUser => {
        alert('Usuario actualizado exitosamente');
        window.location.href = '../views/login.html'
      })
      .catch(error => {
        alert(error.message); // Mostrar el mensaje de error
        console.error(error);
      });
});