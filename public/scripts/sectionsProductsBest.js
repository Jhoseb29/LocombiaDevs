import { Get } from "../controller/UserApi.js";
import { getidproductsaves } from "../controller/productseccionController.js";
import { addToCart, removeFromCart, isProductInCart, getStock, createCart } from "../controller/shoppingCartController.js";
const products = document.querySelectorAll("#BestProduct")
const iduser = JSON.parse(localStorage.getItem("currentUser"));



Get("products?_sort=likes&_order=desc").then((productsDB)=>{
    const productssave = getidproductsaves();
    for(var i = 0; i<5;i++){
        const childrens = products[i].children;
        const producturl = productsDB[i].imgurl;
        const productname = productsDB[i].name;
        const productprice = productsDB[i].price;
        const productId = productsDB[i].id
        childrens[0].src = producturl
        childrens[1].textContent = productname
        childrens[2].textContent = productprice + "$" 
        let imgproducthtml = products[i].querySelector('img')
        // if(productssave.includes(productId.toString())){
        //     imgproducthtml.classList.add('agregado')
        // }
        // if(!productssave.includes(productId.toString())){
        //     imgproducthtml.classList.remove('agregado')
        // }
        imgproducthtml.addEventListener("click",async(event)=>{
            const cart = getidproductsaves();
            const elemt = event.target
            
            if(await createCart(iduser.id) == false){ //* SI NO tiene carrrito , se crea el carrito y me retorna algo diferente de false
                productvalidate(productId,elemt)
            }
            else{ //* en caso de que el usuario no tenga carrito
                createCart(iduser.id)
                productvalidate(productId,elemt)
            }
            
            //location.reload()
        })
    }
})

function productvalidate (productId,elemt) {
    isProductInCart(iduser.id,productId).then(async (response)=>{
        if(response == true){
            removeFromCart(iduser.id,productId)
            elemt.classList.remove('agregado')
        }
        else{
            const stockproduct = await getStock(productId)
            if(stockproduct > 0){
                addToCart(iduser.id,productId,1)
                elemt.classList.add('agregado')
            }
            
        }
    })
}