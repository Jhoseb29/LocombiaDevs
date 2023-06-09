// Función para obtener el carrito de un usuario por su ID
export function getCartByUserId(userId) {
  return fetch(`http://localhost:3000/carts?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Carrito del usuario:", data);
      return data[0].products; // Devuelve el carrito del usuario
    })
    .catch((error) => {
      console.log("Error:", error);
      return error; // Devuelve el error
    });
}
export function addToCart(userId, productId, quantity) {
  fetch("http://localhost:3000/carts")
    .then((response) => response.json())
    .then((carts) => {
      // Buscar el carrito del usuario en la base de datos
      const cart = carts.find((cart) => cart.userId === userId);

      // Verificar si el usuario tiene un carrito existente
      if (cart) {
        // Buscar el producto en el carrito
        const cartProduct = cart.products.find(
          (item) => item.productId === productId
        );

        // Verificar si el producto ya está en el carrito
        if (cartProduct) {
          // Actualizar la cantidad del producto existente
          cartProduct.quantity += quantity;
        } else {
          // Agregar un nuevo producto al carrito
          cart.products.push({ productId, quantity });
        }
      } else {
        // Crear un nuevo carrito para el usuario
        const newCart = {
          id: carts.length + 1,
          userId,
          products: [{ productId, quantity }],
        };
        carts.push(newCart);
      }

      // Actualizar el carrito en la base de datos
      return fetch(`http://localhost:3000/carts/${cart.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
    })
    .then(() => {
      console.log("Producto agregado al carrito con éxito.");
    })
    .catch((error) => {
      console.error("Error al agregar el producto al carrito:", error);
    });
}

export function removeFromCart(userId, productId) {
  fetch("http://localhost:3000/carts")
    .then((response) => response.json())
    .then((carts) => {
      // Buscar el carrito del usuario en la base de datos
      const cart = carts.find((cart) => cart.userId === userId);

      // Verificar si el usuario tiene un carrito existente
      if (cart) {
        // Buscar el producto en el carrito
        const index = cart.products.findIndex(
          (item) => item.productId === productId
        );

        // Verificar si el producto está en el carrito
        if (index !== -1) {
          // Remover el producto del carrito
          cart.products.splice(index, 1);

          // Actualizar el carrito en la base de datos
          return fetch(`http://localhost:3000/carts/${cart.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
          });
        } else {
          console.log("El producto no está en el carrito.");
        }
      } else {
        console.log("El usuario no tiene un carrito.");
      }
    })
    .then(() => {
      console.log("Producto removido del carrito con éxito.");
    })
    .catch((error) => {
      console.error("Error al remover el producto del carrito:", error);
    });
}

//** */
export async function updateCartItemQuantity(productId, userId, newQuantity) {
  const cartUrl = `http://localhost:3000/carts?userId=${userId}`;
  const response = await fetch(cartUrl);
  const cartData = await response.json();

  // Buscar el carrito del usuario por su ID de usuario
  const userCart = cartData.find((cart) => cart.userId === userId);

  if (userCart) {
    // Buscar el índice del producto en el carrito del usuario
    const productIndex = userCart.products.findIndex(
      (product) => product.productId === productId
    );

    if (productIndex !== -1) {
      // Actualizar la cantidad del producto
      userCart.products[productIndex].quantity = newQuantity;

      // Realizar la petición PUT para actualizar el carrito en la base de datos
      const updateUrl = `http://localhost:3000/carts/${userCart.id}`;
      await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCart),
      });

      console.log("Cantidad del producto actualizada exitosamente.");
    } else {
      console.log("El producto no se encontró en el carrito.");
    }
  } else {
    console.log("El carrito del usuario no se encontró.");
  }
}

export async function isProductInCart(userId, productId) {
  return fetch(`http://localhost:3000/carts?userId=${userId}`)
    .then((response) => response.json())
    .then((cart) => {
        let listaproductos = cart[0].products
        //busco el producto en la lista de productos
        let retorno = listaproductos.some(objeto => objeto.productId === productId);
        return retorno
    })
    .catch((error) => {
      console.error(
        "Error al verificar si el producto está en el carrito:",
        error
      );
      return false;
    });
}

