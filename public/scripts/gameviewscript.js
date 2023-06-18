import { productsviewtemplate } from "../controller/gameviewtemplate.js";
import {
  addToCart,
  removeFromCart,
  isProductInCart,
  getStock,
  createCart,
} from "../controller/shoppingCartController.js";

const container = document.getElementById("container");
const iduser = JSON.parse(localStorage.getItem("currentUser"));
window.addEventListener("load", function () {
  createviewproduct();
  console.log("La página se ha cargado");
});

export async function createviewproduct() {
  const dataGameView = JSON.parse(localStorage.getItem("dataGameView"));
  console.log(dataGameView);
  container.insertAdjacentHTML(
    "beforeend",
    productsviewtemplate(
      dataGameView.productName,
      dataGameView.productPrice,
      dataGameView.brand,
      dataGameView.productGenre,
      dataGameView.likes,
      dataGameView.productURL,
      dataGameView.productDescription,
      dataGameView.liked
    )
  );
  if ((await createCart(iduser.id)) == false) {
    productvalidate(
      dataGameView.productId,
      container.querySelector(".addbtn"),
      1
    );
  }
  container
    .querySelector(".addbtn")
    .addEventListener("click", async (event) => {
      if ((await createCart(iduser.id)) == false) {
        //* SI tiene carrrito
        productvalidate(
          dataGameView.productId,
          container.querySelector(".addbtn"),
          0
        );
      } else {
        //* en caso de que el usuario no tenga carrito
        createCart(iduser.id);
        productvalidate(
          dataGameView.productId,
          container.querySelector(".addbtn"),
          0
        );
      }
    });

  container
    .querySelector(".buybtn")
    .addEventListener("click", (event) => {
      isProductInCart(iduser.id, dataGameView.productId).then(
        async (response) => {
          if (response == true) {
            window.location.href = "./cart.html";
          } else if(response == false) {
            const stockproduct = await getStock(dataGameView.productId);
            if (stockproduct > 0) {
              addToCart(iduser.id, dataGameView.productId, 1);
              setTimeout(()=>{
                window.location.href = "./cart.html";
              },500)
             
            } else {
              container.querySelector(".errorms").style.display = "initial";
            }
          }
        }
      );
    });
}

function productvalidate(productId, elemt, option) {
  if (option == 0) {
    console.log(typeof productId);
    isProductInCart(iduser.id, productId).then(async (response) => {
      if (response == true) {
        removeFromCart(iduser.id, productId);
        elemt.classList.remove("agregado");
      } else {
        const stockproduct = await getStock(productId);
        if (stockproduct > 0) {
          addToCart(iduser.id, productId, 1);
          elemt.classList.add("agregado");
        } else {
          container.querySelector(".errorms").style.display = "initial";
        }
      }
    });
  } else if (option == 1) {
    isProductInCart(iduser.id, productId).then(async (response) => {
      if (response == true) {
        elemt.classList.add("agregado");
      }
    });
  }
}
