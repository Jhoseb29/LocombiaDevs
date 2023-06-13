import { toggleLike } from "../controller/UserApi.js";

window.addEventListener("load", function () {
  const likebutton = document.getElementById("likebtn");
  const iduser = JSON.parse(localStorage.getItem("currentUser"));
  const likes = this.document.getElementById("likecount")
  likebutton.addEventListener("click", () => {
    const dataGameView = JSON.parse(localStorage.getItem("dataGameView"));
    toggleLike(iduser.id, dataGameView.productId, likebutton.querySelector("path"),likes);
    
  });
});
