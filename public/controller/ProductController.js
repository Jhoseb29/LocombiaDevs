import { productData } from "./ProductData.js";

const API_URL = "http://localhost:3000/"

export const addPro = async (namePro, descriptionPro, brandPro, stockPro, pricePro, genrePro, categoryIdPro, developerIdPro, imagePro) =>{
    const name = namePro.value
    const brand = brandPro.value
    const description = descriptionPro.value
    const stock = parseInt(stockPro.value)
    const soldUnits = 0
    const price = parseFloat(pricePro.value) 
    const genre = genrePro.value
    const categoryId = parseInt(categoryIdPro.value)
    const developerId = parseInt(developerIdPro.value)
    const image = imagePro.value
    const likes = []

    add(name, brand, description, stock, soldUnits, price, genre, categoryId, developerId, image, likes)
    
}

export const add = (name, brand, description, stock, soldUnits, price, genre,categoryId, developerId, image, likes) => {
  productData.name = name;
  productData.brand = brand;
  productData.description = description;
  productData.stock = stock;
  productData.soldUnits = soldUnits;
  productData.price = price;
  productData.genre = genre;
  productData.categoryId = categoryId;
  productData.developerId = developerId;
  productData.imgurl = image;
  productData.likes = likes;

  return fetch(API_URL + "products", {
      method: "POST",
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
  })
  .then(response => {
      if(!response.ok){
          
          throw new Error("Error al guardar datos")
      }
  })
}