import { UserData } from "./UserData.js";
import { saveinfogameview } from "./gameviewcontroller.js";
import { API_URL } from "./shoppingCartController.js";

export const Get = (ruta) => {
  return fetch(API_URL + ruta).then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    //* console.log(response.json())
    return response.json();
  });
};

export const CreateUser = (
  username,
  email,
  password,
  firstname,
  lastname,
  document
) => {
  UserData.username = username;
  UserData.email = email;
  UserData.password = password;
  UserData.firstname = firstname;
  UserData.lastname = lastname;
  UserData.document = document;
  return fetch(API_URL + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error al guardar datos");
    }
  });
};
export const FindExistingUser = (
  username,
  { email = null, password = null } = {}
) => {
  //! el username es obligatorio , pero el email o password son obcionales , no se pueden pasar los tres parametros
  const Users = Get("users");
  if (email != null) {
    //? verificar si el usuario con el mismo email ó username || para registros
    return Users.then((UsersList) => {
      return (
        UsersList.find(
          (user) => user.username === username || user.email === email
        ) || null
      );
    });
  } else if (password != null) {
    //? verificar si el usuario con el mismo password y username || para login
    return Users.then((UsersList) => {
      return (
        UsersList.find(
          (user) => user.username === username && user.password === password
        ) || null
      );
    });
  } else {
    throw new Error("estamos trabajando");
  }
};

export const Delete = async (id) => {
  const response = await fetch(`${API_URL}users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};

export const getAllProducts = () => {
  return Get("products");
};

export function toggleLike(userId, productId, likebutton, likecount) {
  // Realizar la petición a la API para obtener el producto por su ID
  fetch(`${API_URL}products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Verificar si la ID del usuario está presente en el array de likes
      const index = product.likes.indexOf(userId);
      if (index === -1) {
        // Si el usuario no ha dado like, agregar la ID del usuario al array de likes
        product.likes.push(userId);
        likebutton.classList.add("like");
        likebutton.classList.remove("nolike");
        likecount.innerHTML = product.likes.length;
        console.log(likebutton);
      } else {
        // Si el usuario ya ha dado like, quitar la ID del usuario del array de likes
        product.likes.splice(index, 1);
        likebutton.classList.remove("like");
        likebutton.classList.add("nolike");
        likecount.innerHTML = product.likes.length;
        console.log(product.likes);
      }

      // Realizar la petición a la API para actualizar el producto con los nuevos likes
      fetch(`${API_URL}products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((updatedProduct) => {
          console.log("Producto actualizado:", updatedProduct);
        })
        .catch((error) => {
          console.error("Error al actualizar el producto:", error);
        });

      // actualizamos el local storage
      saveinfogameview(
        userId,
        product.name,
        product.price,
        product.imgurl,
        productId,
        product.description,
        product.genre,
        product.developerId
      );
    })
    .catch((error) => {
      console.error("Error al obtener el producto:", error);
    });
}
