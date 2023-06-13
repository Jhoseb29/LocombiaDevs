import { Get } from "../controller/UserApi.js";
import { getidproductsaves } from "../controller/productseccionController.js";
import { addToCart, isProductInCart, createCart ,removeFromCart,  getStock} from "../controller/shoppingCartController.js";
import { saveinfogameview } from "../controller/gameviewcontroller.js";

const products = document.querySelectorAll("#productBestselling")
const btn = document.getElementById('btns')
const iduser = JSON.parse(localStorage.getItem("currentUser"));


Get("products?_sort=soldUnits&_order=desc").then((productsDB)=>{
    // const productssave = getidproductsaves();
    for(var i = 0; i<5;i++){
        const childrens = products[i].children;
        const producturl = productsDB[i].imgurl;
        const productname = productsDB[i].name;
        const productprice = productsDB[i].price;
        const productId = productsDB[i].id;
        const productdescription = productsDB[i].description;
        const productgenre = productsDB[i].genre;
        const developerID = productsDB[i].developerId;
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
        imgproducthtml.addEventListener("click",async (event)=>{
            console.log(iduser.id,productname,productprice,producturl,productId,productdescription,productgenre,developerID)
            await saveinfogameview(iduser.id,productname,productprice,producturl,productId,productdescription,productgenre,developerID)
            window.location.href = "../views/gameview.html";
            
            // const cart = getidproductsaves();
            // const elemt = event.target;
            
            // if(await createCart(iduser.id) == false){ 
            //     productvalidate(productId,elemt)
            // }
            // else{ //* en caso de que el usuario no tenga carrito
            //     createCart(iduser.id)
            //     productvalidate(productId,elemt)
            // }

            //location.reload()
        })
    }
})

