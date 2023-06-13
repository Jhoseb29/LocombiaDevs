import { API_URL } from "./shoppingCartController.js";

// Función para verificar si un usuario dio like a un producto
export async function hasUserLikedProduct(userId, productId) {
  // Obtener el producto del JSON Server
  return fetch(`${API_URL}products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Verificar si el usuario ha dado like al producto
      const likes = product.likes;
      const userLiked = likes.some((like) => like === userId);
      console.log(
        `El usuario ${userId} ha dado like al producto ${productId}: ${userLiked}`
      );
      return userLiked;
    })
    .catch((error) => console.error(error));
}

// Función para obtener la cantidad de likes de un producto
export async function getProductLikes(productId) {
  // Obtener el producto del JSON Server
  return fetch(`${API_URL}products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Obtener la cantidad de likes del producto
      const likesCount = product.likes.length;
      console.log(`El producto ${productId} tiene ${likesCount} likes`);
      return likesCount;
    })
    .catch((error) => console.error(error));
}

export async function getDev(devID) {
  return fetch(`${API_URL}developers/${devID}`)
    .then((response) => response.json())
    .then((dev) => {
      //obtener dev name

      const devName = dev.name;
      return devName;
    });
}

export async function saveinfogameview(
  userid,
  productname,
  productprice,
  producturl,
  productId,
  productdescription,
  productgenre,
  developerID
) {
  console.log(
    userid,
    productname,
    productprice,
    producturl,
    productId,
    productdescription,
    productgenre,
    developerID
  );
  let likes = await getProductLikes(productId);
  let liked;
  if (await hasUserLikedProduct(userid, productId)) {
    liked = "like";
  } else {
    liked = "nolike";
  }
  const developer = await getDev(developerID);
  // Guardar los valores en el almacenamiento local

  let data = {
    productId:productId,
    productName: productname,
    productPrice: productprice,
    developer: developer,
    productGenre: productgenre,
    likes: likes,
    productURL: producturl,
    productDescription: productdescription,
    liked: liked.toString(),
  };
  data = JSON.stringify(data);
  localStorage.setItem("dataGameView", data);
  console.log(`datos para el gameview ${data}`);
}
