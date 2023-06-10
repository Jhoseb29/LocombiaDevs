import { Get } from "../controller/UserApi.js";

// Función para obtener el carrito de un usuario por su ID
export function getCartProductsByUserId(userId) {
  return fetch(`http://localhost:3000/carts?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Carrito del usuario:", data);
      return data[0].products; // Devuelve los productos dentro de el carrito del usuario
    })
    .catch((error) => {
      console.log("Error:", error);
      return error; // Devuelve el error
    });
}

export function getCartByUserId(userId) {
  return fetch(`http://localhost:3000/carts?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Carrito del usuario:", data);
      return data[0]; // Devuelve  el carrito del usuario
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


//* crear historico */

export function addHistoric(data) {
  return fetch('http://localhost:3000/historic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Nuevo objeto agregado:', result);
    return result; // Puedes retornar el resultado si lo necesitas en otro lugar del código
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error si deseas manejarlo en el contexto que llame a esta función
  });
}

//* limpiar carrito

export function clearCart(userId) {
  // Primero, realizamos una solicitud GET para obtener el carrito del usuario específico
  fetch(`http://localhost:3000/carts?userId=${userId}`)
    .then(response => response.json())
    .then(carts => {
      // Verificamos si se encontró un carrito para el usuario
      if (carts.length > 0) {
        // Obtenemos el ID del carrito del primer elemento del array 'carts'
        const cartId = carts[0].id;
        
        // Creamos un objeto 'updatedCart' con el campo 'products' establecido como un array vacío
        const updatedCart = { 
          userId:userId,
          products: [] };
        
        // Realizamos una solicitud PUT para actualizar el carrito con el objeto 'updatedCart'
        fetch(`http://localhost:3000/carts/${cartId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedCart)
        })
          .then(response => {
            // Verificamos si la respuesta tiene un estado 'ok' para determinar si la actualización fue exitosa
            if (response.ok) {
              console.log(`Se borraron los productos del carrito del usuario ${userId}`);
            } else {
              console.error(`Error al borrar los productos del carrito del usuario ${userId}`);
            }
          })
          .catch(error => {
            console.error(`Error al realizar la solicitud PUT:`, error);
          });
      } else {
        console.log(`No se encontró un carrito para el usuario ${userId}`);
      }
    })
    .catch(error => {
      console.error(`Error al obtener el carrito del usuario ${userId}:`, error);
    });
}

export async function getStockProductById(productId){
  const product = await Get("products?id=" + productId)
  console.log(product)
  return product
}

// Función para actualizar el stock y las unidades vendidas de los productos
export async function updateProductsDatastockandsoldunits(products) {
  console.log('updateproductdata',products)

  for(const element of products){
    let productId = parseInt(element.id.split("-")[1])
    let quantity = parseInt(element.querySelector("#products-number").textContent)
    let stock = await getStock(productId)
    let soldUnits = await getSoldUnits(productId)
    let newstock = stock-quantity;
    let newsoldUnits = soldUnits+quantity;
    updateProductstockandsoldunits(productId,newsoldUnits,newstock)
  }
}

function updateProductstockandsoldunits(productId, soldUnits, stock) {
  // Realiza una solicitud HTTP PATCH a la API para actualizar las propiedades específicas del producto
  fetch(`http://localhost:3000/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      soldUnits: soldUnits,
      stock: stock,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Producto actualizado:', data);
    })
    .catch(error => {
      console.error('Error al actualizar el producto:', error);
    });
}

function getSoldUnits(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(data => {
      const soldUnits = data.soldUnits;
      return soldUnits;
    })
    .catch(error => {
      console.error('Error al obtener las unidades vendidas:', error);
      throw new Error("error al obtener las unidades vendidas"); // En caso de error, se retorna un valor predeterminado (0 en este caso)
    });
}

async function getStock(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(data => {
      const stock = data.stock;
      return stock;
    })
    .catch(error => {
      console.error('Error al obtener las unidades vendidas:', error);
      throw new Error("error al obtener las unidades vendidas"); // En caso de error, se retorna un valor predeterminado (0 en este caso)
    });
}