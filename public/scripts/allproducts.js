import { Get } from "../controller/UserApi.js";
import { saveinfogameview } from "../controller/gameviewcontroller.js";

const productsPerPage = 14; // Número de productos por página
let currentPage = 1; // Página actual

// Obtener todos los productos (debe reemplazarlo con su base de datos o API)
const products = await Get('products')

// Función para renderizar los productos en la página actual
function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';

  // Calcular el índice de inicio y fin de los productos en la página actual
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Obtener los productos de la página actual
  const productsToShow = products.slice(startIndex, endIndex);

  // Renderizar cada producto en la cuadrícula
  productsToShow.forEach(product => {

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.imgurl;
    productImage.alt = product.name;

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price}`;

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    productGrid.appendChild(productCard);
    console.log(product)
    productImage.addEventListener("click",async(event)=>{
      const iduser = JSON.parse(localStorage.getItem("currentUser"));
      await saveinfogameview(iduser.id,product.name,product.price,product.imgurl,product.id,product.description,product.genre,product.developerId)
      window.location.href = "../views/gameview.html";
    })
  });
}

// Función para generar la paginación
function generatePagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Crear los botones de paginación
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      renderProducts();
      generatePagination();
    });
    pagination.appendChild(button);
  }
}

// Renderizar los productos en la página actual y generar la paginación
renderProducts();
generatePagination();