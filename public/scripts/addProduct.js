import { addPro } from "../controller/ProductController.js";

const product = document.getElementById('add-product');

product.addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const brand = document.getElementById('brand');
    const stock = document.getElementById('stock');
    const price = document.getElementById('price');
    const solidUnits = document.getElementById('solidUnits');
    const genre = document.getElementById('genre');
    const image = document.getElementById('image');

    addPro(name, description, brand, stock, price, solidUnits, genre, image)
    .then(function(){
        alert("si jalo")
    })
    .catch(function(error){
        alert("no jalo");
    })
});