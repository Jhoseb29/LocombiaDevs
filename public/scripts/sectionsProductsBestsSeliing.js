import { Get } from "../controller/UserApi.js";
import { getidproductsaves } from "../controller/productseccionController.js";

const products = document.querySelectorAll("#productBestselling")
const btn = document.getElementById('btns')




Get("products?_sort=soldUnits&_order=desc").then((productsDB)=>{
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
        imgproducthtml.addEventListener("click",(event)=>{
            const cart = getidproductsaves();
            const elemt = event.target;
            if(cart.includes(productId.toString())){
                localStorage.removeItem(`producto-${productId}`)
                elemt.classList.remove('agregado')
            }
            else{
                localStorage.setItem(`producto-${productId}`, productId)
                elemt.classList.add('agregado')
            }

            //location.reload()
        })
    }
})