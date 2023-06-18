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
      return likesCount;
    })
    .catch((error) => console.error(error));
}



export async function saveinfogameview(
  userid,
  productname,
  productprice,
  producturl,
  productId,
  productdescription,
  productgenre,
  brand
) 
{
  let likes = await getProductLikes(productId);
  let liked;
  if (await hasUserLikedProduct(userid, productId)) {
    liked = "like";
  } else {
    liked = "nolike";
  }
  // Guardar los valores en el almacenamiento local

  let data = {
    productId:productId,
    productName: productname,
    productPrice: productprice,
    brand: brand,
    productGenre: productgenre,
    likes: likes,
    productURL: producturl,
    productDescription: productdescription,
    liked: liked.toString(),
  };
  data = JSON.stringify(data);
  localStorage.setItem("dataGameView", data);
}
