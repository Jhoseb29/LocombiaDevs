import { Get } from "../controller/UserApi.js"
const totalHistoric = document.getElementById('list')
Get('products').then(products => {
    products.forEach(entry => {
        const price = entry.price;
        const gameName = entry.name;
        const stock = entry.stock;
        const brand = entry.brand;

        const historicContainer = document.createElement('div')
        const productName = document.createElement('h2')
        productName.textContent = gameName
        const productPrice = document.createElement('p')
        productPrice.textContent = price
        const productStock = document.createElement('p')
        productStock.textContent = stock
        const productBrand = document.createElement('p')
        productBrand.textContent = brand

        const productLine = document.createElement('hr')

        historicContainer.appendChild(productName)
        historicContainer.appendChild(productPrice)
        historicContainer.appendChild(productStock)
        historicContainer.appendChild(productBrand)
        historicContainer.appendChild(productLine)
        totalHistoric.appendChild(historicContainer)
    });
});