import { Get } from "../controller/UserApi.js";
import { producthtml } from "../controller/productcartTemplate.js";
import { getidproductsaves } from "../controller/productseccionController.js";
import { getCartProductsByUserId, updateCartItemQuantity, getStockProductById } from "../controller/shoppingCartController.js";
import { removeFromCart } from "../controller/shoppingCartController.js";

const cartproductscontainer = document.getElementById("cart_products__container");
const userImg = document.getElementById("avatar_user");
const Subtotal = document.getElementById("Subtotal");
const totaltaxes = document.getElementById("total");
const totalbtn = document.getElementById("totalbtn");
const iduser = JSON.parse(localStorage.getItem("currentUser"));
const productsavesincart = await getCartProductsByUserId(iduser.id);


const Createproducthtml = async (productocontainer) => {
    const idsaves = [] ;
    productsavesincart.forEach((producto)=>{
        idsaves.push(producto.productId);
    })

    let prices = [];
    let arrayElementhtml = []
    const productPromises = idsaves.map((id,index) =>
        Get("products?id=" + id).then((product) => {
        let gameimgurl = product[0].imgurl;
        let price = product[0].price;
        let gamename = product[0].name;
        prices.push(price);
        productocontainer.insertAdjacentHTML("beforeend",producthtml(gameimgurl, gamename, price,id,productsavesincart[index].quantity));
        arrayElementhtml.push(productocontainer.querySelector("#producto-"+(id)))
         
        }) 
    );
    
    await Promise.all(productPromises); //** esperamos a que las promesas de el map se resuelvan */
    deleteProduct(arrayElementhtml);
    addProduct(arrayElementhtml,prices);
    resduceProducts(arrayElementhtml,prices);
    actualizarTotales(document.querySelectorAll('.price'));
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
            let cartitemid = parseInt(producthtml.id.split("-")[1])
            removeFromCart(iduser.id,cartitemid)
            producthtml.remove()
            const priceshtml = document.querySelectorAll('.price')
            let arrayprices = document.querySelectorAll('.price')
            // priceshtml.forEach((element)=>{
            //     let string = element.textContent
            //     let numericString = string.replace("$", "").replace(",", ".");
            //     arrayprices.push(parseFloat(numericString))
            // })
            actualizarTotales(arrayprices)
        })
    })
}

function addProduct(arrayhtmlelements,productsprices){
    
    arrayhtmlelements.forEach((element,index) => {
        
        let addbutton = element.querySelectorAll('.add')
        
        addbutton.forEach((element)=>{
            let productquantity = element.parentElement.previousElementSibling;
            let productpricehtml = productquantity.parentElement.nextElementSibling
            const productprice = productsprices[index]
            
            
            element.addEventListener("click",async (event)=>{
                const product = await getStockProductById(productquantity.parentElement.parentElement.id.split("-")[1]);
                const prodoctstock = product[0].stock;
                
                let newpriceproduct = document.querySelectorAll('.price');
                let quantity = parseInt(productquantity.textContent)
                if(quantity <= prodoctstock-1){
                productquantity.textContent = quantity+1
                productpricehtml.textContent = "$"+(productprice*(quantity+1)).toFixed(2)
                
                actualizarTotales(newpriceproduct)
                let cartitemid = parseInt(productquantity.parentElement.parentElement.id.split("-")[1])
                let newQuantity = quantity+1
                updateCartItemQuantity(cartitemid,iduser.id,newQuantity)}
            })
        })
        
    })
}


function resduceProducts (arrayhtmlelements,productsprices){

    arrayhtmlelements.forEach((element,index) => {
        
        let addbutton = element.querySelectorAll('.remove')
        
        addbutton.forEach((element)=>{
            let productquantity = element.parentElement.previousElementSibling;
            let productpricehtml = productquantity.parentElement.nextElementSibling
            const productprice = productsprices[index]
            
            
            element.addEventListener("click",(event)=>{
                let newpriceproduct = document.querySelectorAll('.price')
                let quantity = parseInt(productquantity.textContent)
                if(quantity-1>=1){
                    productquantity.textContent = quantity-1
                    productpricehtml.textContent = "$"+(productprice*(quantity-1)).toFixed(2)
                    actualizarTotales(newpriceproduct)
                    let cartitemid = parseInt(productquantity.parentElement.parentElement.id.split("-")[1])
                    let newQuantity = quantity-1
                    updateCartItemQuantity(cartitemid,iduser.id,newQuantity)
                }else if (quantity-1==0){
                    productquantity.textContent = quantity-1
                    productpricehtml.textContent = "$"+(productprice*(quantity-1)).toFixed(2)
                    actualizarTotales(newpriceproduct)
                    let cartitemid = parseInt(productquantity.parentElement.parentElement.id.split("-")[1])
                    removeFromCart(iduser.id,cartitemid)
                }
            })
        })
        
    })
}

        
function actualizarTotales(lista) {
    let prices = []
    
    lista.forEach((price)=>{
        
        prices.push(parseFloat(price.textContent.replace("$", "").replace(",", ".")))
    })
    
    const subtotal = calcularTotal(prices);
    const total = calcularTotaltax(subtotal);
    
    Subtotal.textContent = "$" + subtotal.toFixed(4);
    totaltaxes.textContent = "$" + total.toFixed(4);
    totalbtn.textContent = "$" + total.toFixed(4);
}
  
Createproducthtml(cartproductscontainer);

