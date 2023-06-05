import { Get } from "../controller/UserApi.js";

const products = document.querySelectorAll("#productBestselling")
const btn = document.getElementById('btns')

Get("products?_sort=soldUnits&_order=desc").then((productsDB)=>{
    for(var i = 0; i<5;i++){
        
        const childrens = products[i].children;
        const producturl = productsDB[i].imgurl;
        const productname = productsDB[i].name;
        const productprice = productsDB[i].price;
        const productId = productsDB[i].id
        childrens[0].src = producturl
        childrens[1].textContent = productname
        childrens[2].textContent = productprice + "$" 
        products[i].addEventListener("click",(event)=>{
            localStorage.setItem(`producto-${productId}`, productId)
        })
    }
})

//? para el carrito obtener la id de los productos que el user dio click

export const getidproductsaves = ()=>{
    // Obtén todas las keys almacenadas en el local storage
    const keys = Object.keys(localStorage);

    // Filtra las keys que corresponden a las IDs de los productos
    const ids = keys.filter(key => key.startsWith('producto-'));

    // Obtén los valores correspondientes a las IDs filtradas
    const idValues = ids.map(id => localStorage.getItem(id));

    console.log(idValues);
}