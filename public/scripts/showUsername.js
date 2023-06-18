// Obtener el usuario autenticado desde el almacenamiento persistente (localStorage)
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Mostrar el nombre de usuario en el menú hamburguesa
const usernameContainer = document.getElementById('usernameContainer');
usernameContainer.textContent = `${currentUser.username}`;
