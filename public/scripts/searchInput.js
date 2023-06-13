import { getAllProducts } from "../controller/UserApi.js";

// Obtener referencia a los elementos HTML
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

// Obtener todos los productos
let productsData = [];

getAllProducts()
  .then(products => {
    productsData = products;
  })
  .catch(error => {
    console.error(error);
  });



// Función para renderizar los productos filtrados en la sección de resultados
function renderProducts(products) {

  
    const fragment = document.createDocumentFragment();
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.textContent = product.name;
      productElement.addEventListener('click', () => {
        const gameId = product.id; // Obtener el ID del juego o cualquier otra información necesaria
        window.location.href = `http://localhost:3000/products/${gameId}`; // Redirigir a la página personalizada con el ID del juego
      });
      fragment.appendChild(productElement);
    });
  
    resultsContainer.appendChild(fragment);
  }

// Función para filtrar los productos según el término de búsqueda
function filterProducts(searchTerm) {
  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  renderProducts(filteredProducts);
}

// Función para manejar el evento de entrada en la barra de búsqueda
function handleSearchInput() {
  const searchValue = searchInput.value;
  filterProducts(searchValue);
}

// Agregar el controlador de eventos al evento de entrada en la barra de búsqueda
searchInput.addEventListener('input', handleSearchInput);


