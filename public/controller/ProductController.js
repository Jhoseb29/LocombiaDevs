import { productData } from "./ProductData.js";

const API_URL = "http://localhost:3000/"

export const addPro = async (namePro, descriptionPro, brandPro, stockPro, pricePro, solidUnitsPro, genrePro, imagePro) =>{
    const name = namePro.value
    const brand = brandPro.value
    const description = descriptionPro.value
    const stock = stockPro.value
    const solidUnits = solidUnitsPro.value
    const price = pricePro.value
    const genre = genrePro.value
    const image = imagePro.value

    add(name, brand, description, stock, solidUnits, price, genre, image)
    
}

export const add = (name, brand, description, stock, solidUnits, price, genre, image) => {
  productData.name = name;
  productData.brand = brand;
  productData.description = description;
  productData.stock = stock;
  productData.solidUnits = solidUnits;
  productData.price = price;
  productData.genre = genre;
  productData.imgurl = image;

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