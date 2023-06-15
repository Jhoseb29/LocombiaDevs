import { Get } from "../controller/UserApi.js";
import { saveinfogameview } from "../controller/gameviewcontroller.js"
const products = document.querySelectorAll("#BestProduct")
const iduser = JSON.parse(localStorage.getItem("currentUser"));



Get("products?_sort=likes&_order=desc").then((productsDB)=>{
    for(var i = 0; i<5;i++){
        const childrens = products[i].children;
        const producturl = productsDB[i].imgurl;
        const productname = productsDB[i].name;
        const productprice = productsDB[i].price;
        const productId = productsDB[i].id;
        const productdescription = productsDB[i].description;
        const productgenre = productsDB[i].genre;
        const brand = productsDB[i].brand;
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
        imgproducthtml.addEventListener("click",async()=>{

            await saveinfogameview(iduser.id,productname,productprice,producturl,productId,productdescription,productgenre,brand)
            window.location.href = "../views/gameview.html";
            // const cart = getidproductsaves();
            // const elemt = event.target
            
            // if(await createCart(iduser.id) == false){ //* SI tiene carrrito
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
