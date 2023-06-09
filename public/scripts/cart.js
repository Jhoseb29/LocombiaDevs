import { Get } from "../controller/UserApi.js";
import { producthtml } from "../controller/productTemplate.js";
import { getidproductsaves } from "../controller/productseccionController.js";

const cartproductscontainer = document.getElementById("cart_products__container");
const userImg = document.getElementById("avatar_user");
const Subtotal = document.getElementById("Subtotal");
const totaltaxes = document.getElementById("total");
const totalbtn = document.getElementById("totalbtn")
const Createproducthtml = async (productocontainer) => {
    const idsaves = getidproductsaves();
    let prices = [];
    let arrayElementhtml = []
    const productPromises = idsaves.map((id,index) =>
        Get("products?id=" + id).then((product) => {
        let gameimgurl = product[0].imgurl;
        let price = product[0].price;
        let gamename = product[0].name;
        prices.push(price);
        productocontainer.insertAdjacentHTML("beforeend",producthtml(gameimgurl, gamename, price,id));
        arrayElementhtml.push(productocontainer.querySelector("#producto-"+(id)))
        
        }) 
    );
    
    await Promise.all(productPromises); //** esperamos a que las promesas de el map se resuelvan */
    deleteProduct(arrayElementhtml)
    addProduct(arrayElementhtml)
    actualizarTotales(prices)
};

function calcularTotal(prices) {
    let sumatoria = 0;
    for (let i = 0; i < prices.length; i++) {
        if (typeof prices[i] === "number") {
        sumatoria += prices[i];
        }
    }

    return sumatoria;
}

function calcularTotaltax (subtotal){
    return (subtotal+(subtotal*0.19))
}


function deleteProduct (arrayElementhtml){

    arrayElementhtml.forEach((element) => {
        let deletebtnelement = element.querySelector('.delete-product')
        deletebtnelement.addEventListener("click", (event) => {
            let producthtml =deletebtnelement.parentNode
            localStorage.removeItem(producthtml.id)
            producthtml.remove()
            const priceshtml = document.querySelectorAll('.price')
            let arrayprices = []
            priceshtml.forEach((element)=>{
                let string = element.textContent
                let numericString = string.replace("$", "").replace(",", ".");
                arrayprices.push(parseFloat(numericString))
            })
            actualizarTotales(arrayprices)
        })
    })
}

function addProduct(arrayhtmlelements){
    arrayhtmlelements.forEach((element) => {
        let addbutton = element.querySelectorAll('.add')
    })
}

        
function actualizarTotales(prices) {
    const subtotal = calcularTotal(prices);
    const total = calcularTotaltax(subtotal);
    
    Subtotal.textContent = "$" + subtotal.toFixed(4);
    totaltaxes.textContent = "$" + total.toFixed(4);
    totalbtn.textContent = "$" + total.toFixed(4);
}
  
Createproducthtml(cartproductscontainer);
