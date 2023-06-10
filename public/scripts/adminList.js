import { Get } from "../controller/UserApi.js"

const totalHistoric = document.getElementById('list')

Get('products').then(products => {
    products.forEach(entry => {
        const price = entry.price; // Obtains the price of the first product
        const gameName = entry.name; // Obtains the name of the first game
        const stock = entry.stock; // Obtains the stock xde
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
        historicContainer.appendChild(productLine)
        historicContainer.appendChild(productStock)
        historicContainer.appendChild(productBrand)
        totalHistoric.appendChild(historicContainer)

    });
});