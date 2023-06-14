import { Delete, Get } from "../controller/UserApi.js";

Get('historic').then(historic => {
  historic.forEach(entry => {
    const products = entry.products;
    const userId = entry.userId; // Obtiene el ID del usuario

    products.forEach(product => {

      const productId = product.productId;
      const productName = product.name;
      const productPrice = product.price;

      console.log(productName, productId, productPrice, userId)
    
    });
  });
});

const deleteUserButton = document.getElementById("deleteUserButton");

deleteUserButton.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure to delete your account? This action can not be undone.");

  if (confirmDelete) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;

    Delete(userId)
      .then(() => {
        // Eliminación exitosa, puedes realizar acciones adicionales después de eliminar el usuario
        alert("Your account has been successfully deleted.");
        window.location.href = '../views/login.html'
        localStorage.removeItem('currentUser');
        // Redirigir al usuario a una página diferente o realizar otras acciones necesarias
      })
      .catch((error) => {
        // Manejar el error en caso de que ocurra algún problema durante la eliminación del usuario
        alert("Failed to delete account. Please try again later.");
        console.log(error);
      });
  }
});