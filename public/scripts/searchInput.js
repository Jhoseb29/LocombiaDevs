import { Get, getAllProducts } from "../controller/UserApi.js";
import { saveinfogameview } from "../controller/gameviewcontroller.js";

// Obtener referencia a los elementos HTML
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// Obtener todos los productos
let productsData = [];

getAllProducts()
  .then((products) => {
    productsData = products;
  })
  .catch((error) => {
    console.error(error);
  });

// Función para renderizar los productos filtrados en la sección de resultados
function renderProducts(products) {
  const fragment = [];

  products.forEach((product) => {
    const productElement = `<div class="search-div">${product.name}</div>`;
    //console.log(product)
    // productElement.addEventListener('click', async () => {
    //   //console.log(product)
    //   //await saveinfogameview(product.id,product.name,product.brand,product.description,product.stock,product.solidUnits,product.price,product.genre, product.categoryId, product.developerId, product.imgurl, product.likes)
    //   await saveinfogameview(currentUser.id, product.name ,product.price, product.imgurl, product.id, product.description, product.genre, product.developerId)
    //   window.location.href = "../views/gameview.html";

    // });
    fragment.push([productElement,product]);
  });
  resultsContainer.insertAdjacentHTML("afterbegin", fragment[0][0]);
  const product = fragment[0][1]
  resultsContainer.querySelector(".search-div").addEventListener("click",async()=>{
    await saveinfogameview(currentUser.id, product.name ,product.price, product.imgurl, product.id, product.description, product.genre, product.developerId)
    window.location.href = "../views/gameview.html";
  })
}

// Función para filtrar los productos según el término de búsqueda
function filterProducts(searchTerm) {
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  renderProducts(filteredProducts);
}

// Función para manejar el evento de entrada en la barra de búsqueda
function handleSearchInput() {
  const searchValue = searchInput.value;

  if (searchValue > -1) {
    resultsContainer.style.display = "none";
  } else {
    resultsContainer.style.display = "";
  }
  filterProducts(searchValue);
}

// Agregar el controlador de eventos al evento de entrada en la barra de búsqueda
searchInput.addEventListener("input", handleSearchInput);
