import { addHistoric, clearCart, getCartByUserId, getCartProductsByUserId, updateProductsDatastockandsoldunits } from "../controller/shoppingCartController.js";

const iduser = JSON.parse(localStorage.getItem("currentUser"));
const clave =
  "pk_test_51NGoMYKHK5Lj2B4WPYtfPdUSEo9KfTbC2I8csrudR3a7evmHClOtfSGwGO8HGfVeIHshA1zfJHq5JS645SajXsZj002wp9a5kT";

const stripe = Stripe(clave);
const elements = stripe.elements();

const style = {
  base: {
    color: "#000000", // Modifica el color del texto del placeholder
    "::placeholder": {
      color: "#C4C4C4", // Modifica el color del placeholder
    },
  },
};

const cardNumberElement = elements.create("cardNumber", { style });
cardNumberElement.mount("#card-number-element");

const cardExpiryElement = elements.create("cardExpiry", { style });
cardExpiryElement.mount("#card-expiry-element");

const cardCvcElement = elements.create("cardCvc", { style });
cardCvcElement.mount("#card-cvc-element");

const form = document.getElementById("payment-form");
const errorElement = document.getElementById("error-message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const cartProducts = await getCartProductsByUserId(iduser.id);
  if (cartProducts.length === 0) {
    // El carrito está vacío, mostrar un mensaje de error
    errorElement.textContent = "No tiene productos en el carrito.";
    return; // Salir de la función para evitar la solicitud a Stripe
  }

  stripe
    .createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: document.getElementById("usernme").value,
      },
    })
    .then(function (result) {
      if (result.error) {
        errorElement.textContent = result.error.message;
      } else {
        // Send the payment method ID to your server
        console.log(result);
        stripeTokenHandler(result.paymentMethod, event);
      }
    });
});

function stripeTokenHandler(paymentMethod, event) {
  // Insert the payment method ID into the form so it gets submitted to the server
  var form = document.getElementById("payment-form");
  var hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "paymentMethod");
  hiddenInput.setAttribute("value", paymentMethod.id);
  form.appendChild(hiddenInput);
  console.log("sd", paymentMethod);
  console.log(event);
  const arrow = document.getElementById("img_arrow_right");
  const circle = document.querySelector(".icon_container");
  arrow.style.display = "none";
  circle.style.display = "initial";
  showCircleAndCheckmark();
  createhistoric();
  clearCart(iduser.id);
  setTimeout(() => {
    window.location.href = './main_page.html'
  }, 2000);

  event.preventDefault();
  // Submit the form
  //form.submit();

  // Redirect to index.html
}

async function createhistoric() {
  //* sacar fecha
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  //* sacar carrito del usuario
  const cartuser = await getCartByUserId(iduser.id) //? espero que se resuelva
  const cartuserproducts = cartuser.products //* array que contiene id 
  console.log("cartproduts:",cartuserproducts)
  
  const productsarrayhtml = Array.from(document.querySelectorAll(".product"));
  console.log("productsArrrrray",productsarrayhtml)

  
 //*
  let namesproducts = productsarrayhtml.map((element)=>{
    const name = element.querySelector('.title').textContent
    const id = parseInt(element.id.split("-")[1])
    const price = parseFloat(element.querySelector('.price').textContent.replace(/[^0-9.-]+/g,""))
    const data = {productId:id, name:name, price:price}
    return data
  })

  //* acrualizar las unidades vendidas y el stock
  updateProductsDatastockandsoldunits(productsarrayhtml);
  //* creamos array de productos

  const productsArray = cartuserproducts.map((item1) => {
    const item2 = namesproducts.find((item2) => item2.productId === item1.productId);
    return { productId: item1.productId, name: item2.name, quantity: item1.quantity, price: item2.price };
  });
  console.log("productsArray:",productsArray)
  //* organisar los datos en la estrucuta correcta
  const data = {
    userId : cartuser.userId,
    date: formattedDate,
    products:productsArray,
    order: generarNumeroAleatorio().toString(),
    status: generarEstadoAleatorio(),
  }
  //* llamamos a addHistoric para añadir ala base de datos
  addHistoric(data)
}

function showCircleAndCheckmark() {
  setTimeout(function () {
    var iconContainer = document.querySelector(".circle");
    let check = document.querySelector(".checkmark");
    iconContainer.classList.add("active");
    check.classList.add("active");
  }, 100);
}

function hideCircleAndCheckmark() {
  var iconContainer = document.querySelector(".icon_container");
  iconContainer.classList.remove("active");
  iconContainer.style.display = "none";
}
function generarNumeroAleatorio() {
  const min = 100000000; // Valor mínimo de 9 dígitos (100,000,000)
  const max = 999999999; // Valor máximo de 9 dígitos (999,999,999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarEstadoAleatorio() {
  const estados = ["exitoso", "pendiente", "reclamo"];
  const indiceAleatorio = Math.floor(Math.random() * estados.length);
  return estados[indiceAleatorio];
}