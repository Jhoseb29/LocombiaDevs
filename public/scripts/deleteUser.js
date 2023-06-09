import { Delete } from "../controller/UserApi.js";

const deleteUserButton = document.getElementById("deleteUserButton");

deleteUserButton.addEventListener("click", () => {
  const confirmDelete = confirm("¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.");

  if (confirmDelete) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;

    Delete(userId)
      .then(() => {
        // Eliminación exitosa, puedes realizar acciones adicionales después de eliminar el usuario
        alert("Tu cuenta ha sido eliminada correctamente.");
        window.location.href = '../views/login.html'
        localStorage.removeItem('currentUser');
        // Redirigir al usuario a una página diferente o realizar otras acciones necesarias
      })
      .catch((error) => {
        // Manejar el error en caso de que ocurra algún problema durante la eliminación del usuario
        alert("Error al eliminar la cuenta. Por favor, inténtalo nuevamente más tarde.");
        console.log(error);
      });
  }
});