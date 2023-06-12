import { addPro } from "../controller/ProductController.js";

const product = document.getElementById('add-product');

product.addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('name');
    const brand = document.getElementById('brand');
    const description = document.getElementById('description');
    const stock = document.getElementById('stock');
    const price = document.getElementById('price');
    const genre = document.getElementById('genre');
    const categoryId = document.getElementById('categoryId');
    const developerId = document.getElementById('developerId')
    const image = document.getElementById('image');

    addPro(name, description, brand, stock, price, genre, categoryId, developerId, image)
    .then(function(){
        product.reset()
        swal('Congratulation', 'Your product was successfully uploaded', 'success');
    })
    .catch(function(error){
        alert("No se pudo completar la tarea");
    })
});