import { Get, getAllProducts } from "../controller/UserApi.js";
import { saveinfogameview } from "../controller/gameviewcontroller.js"

// Obtener referencia a los elementos HTML
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
      productElement.classList.add('search-div')
      productElement.textContent = product.name;
      console.log(product)
      productElement.addEventListener('click', async () => {
        console.log(product)
        //await saveinfogameview(product.id,product.name,product.brand,product.description,product.stock,product.solidUnits,product.price,product.genre, product.categoryId, product.developerId, product.imgurl, product.likes)
        await saveinfogameview(currentUser.id, product.name ,product.price, product.imgurl, product.id, product.description, product.genre, product.developerId)
        window.location.href = "../views/gameview.html";
        
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

  if(searchValue > -1){
    resultsContainer.style.display = "none"
  }else{
    resultsContainer.style.display = ""
  }
  filterProducts(searchValue);
}

// Agregar el controlador de eventos al evento de entrada en la barra de búsqueda
searchInput.addEventListener('input', handleSearchInput);


