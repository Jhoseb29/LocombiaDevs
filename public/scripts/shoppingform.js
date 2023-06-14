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
    .then(async function (result) {
      if (result.error) {
        errorElement.textContent = result.error.message;
      } else {
        // Send the payment method ID to your server
        let cards = await stripeTokenHandler(result.paymentMethod, event);
        let datainvoice = await createhistoric(cards[0],cards[1]);
        setTimeout(()=>{
          clearCart(iduser.id)
        },100)
        
        console.log("datainvoice",datainvoice)
        generarFacturaPDF(datainvoice)
        
        setTimeout(() => {
          window.location.href = './main_page.html'
        }, 1000);
      }
    });
});

async function stripeTokenHandler(paymentMethod, event) {
  // Insert the payment method ID into the form so it gets submitted to the server
  let form = document.getElementById("payment-form");
  let hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "paymentMethod");
  hiddenInput.setAttribute("value", paymentMethod.id);
  form.appendChild(hiddenInput);
  const last4card = paymentMethod.card.last4
  const cardbrand = paymentMethod.card.brand
  const arrow = document.getElementById("img_arrow_right");
  const circle = document.querySelector(".icon_container");
  arrow.style.display = "none";
  circle.style.display = "initial";
  showCircleAndCheckmark();
  return [last4card,cardbrand]
  event.preventDefault();
}

async function createhistoric(last4card,cardbrand) {
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
    const imgurl = element.querySelector("#product_imgurl").src
    const data = {productId:id, name:name, price:price, imgurl:imgurl}
    return data
  })
  
  //* acrualizar las unidades vendidas y el stock
  await updateProductsDatastockandsoldunits(productsarrayhtml);
  
  //* creamos array de productos

  const productsArray = cartuserproducts.map((item1) => {
    const item2 = namesproducts.find((item2) => item2.productId === item1.productId);
    return { productId: item1.productId, name: item2.name, quantity: item1.quantity, price: item2.price, imgurl:item2.imgurl };
  });
  console.log("productsArray:",productsArray)
  
  //* organisar los datos en la estrucuta correcta
  const data = {
    userId : cartuser.userId,
    date: formattedDate,
    products:productsArray,
    order: generarNumeroAleatorio().toString(),
    card: `**** **** **** ${last4card} ${cardbrand}`,
    status: generarEstadoAleatorio(),
  }

  //* crear estrutura de dato para la factura 
  const datainvoice ={
    firstname:iduser.firstname,
    lastname:iduser.lastname,
    cc:iduser.document,
    username: iduser.username,
    email:iduser.email,
    date: formattedDate,
    products:productsArray,
    order: generarNumeroAleatorio().toString(),
    card:`**** **** **** ${last4card} ${cardbrand}`,
  }
  //* llamamos a addHistoric para añadir ala base de datos
  await addHistoric(data)
  
  //* generamos la factura
  return datainvoice
}

function showCircleAndCheckmark() {
  setTimeout(function () {
    let iconContainer = document.querySelector(".circle");
    let check = document.querySelector(".checkmark");
    iconContainer.classList.add("active");
    check.classList.add("active");
  }, 100);
}

function hideCircleAndCheckmark() {
  let iconContainer = document.querySelector(".icon_container");
  iconContainer.classList.remove("active");
  iconContainer.style.display = "none";
}
function generarNumeroAleatorio() {
  const min = 100000000; // Valor mínimo de 9 dígitos (100,000,000)
  const max = 999999999; // Valor máximo de 9 dígitos (999,999,999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarEstadoAleatorio() {
  const estados = ["Success", "Failed"];
  const indiceAleatorio = Math.floor(Math.random() * estados.length);
  return estados[indiceAleatorio];
}

function generarFacturaPDF(data) {
  console.log("infofactura",data)
  const doc = new jsPDF();

  // Logo de la tienda
  const logoImg = new Image();
  logoImg.src = '../assets/images/logo.png';
  logoImg.onload = function () {
      doc.addImage(logoImg, 'PNG', 10, 10, 50, 20);

      // Información de la tienda
      doc.setFontSize(12);
      doc.text("LoCombia Gaming", 10, 40);
      doc.text(`correo electronico: ${data.email}`, 10, 50);

      // Título de la factura
      doc.setFontSize(18);
      doc.text("Factura", 10, 70);

      // Información del usuario
      doc.setFontSize(12);
      doc.text(`Cliente: ${data.firstname} ${data.lastname}`, 10, 80);
      doc.text(`document: ${data.cc}`, 10, 90);
      doc.text(`Fecha: ${data.date}`, 10, 100);
      

      // Información de los productos
      doc.setFontSize(14);
      doc.text("Productos:", 10, 120);
      let y = 130;
      let subtotal = 0;
      data.products.forEach((product, index) => {
        const productNameLines = doc.splitTextToSize((product.name).toUpperCase(), 60);
        doc.text(productNameLines, 10, y);
        doc.text(`Precio: ${(product.price / product.quantity).toFixed(2)}`, 80, y);
        doc.text(`Cantidad: ${product.quantity}`, 120, y);
        doc.text(`Total: ${product.price}`, 160, y);
        subtotal += product.price;
        y += (productNameLines.length * 10) + 10;
    });
      doc.text(`pagototal: ${subtotal.toFixed(2)}`,160,y);
      // Información del pedido y tarjeta
      doc.setFontSize(12);
      doc.text(`Número de pedido: ${data.order}`, 10, y + 10);
      doc.text(`Tarjeta: ${data.card}`, 10, y + 20);

      // lista de claves 
      doc.addPage();
      let y2=50;
      doc.setFontSize(14);
      doc.text("Keys:", 10, 30);
      data.products.forEach((product)=>{
        for(let i = 0; i<product.quantity;i++){
          if(y2>200){
            doc.addPage();
            y2=30;
          }
          doc.text(`${product.name} key${i+1} ${generateSteamKey()}`, 10, y2 );
          y2 = y2 +10
        }
      })

      // Guardar el PDF
      doc.save("factura.pdf");
  };
}

function generateSteamKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const keyLength = 10;
  let key = '';

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }

  return key;
}
