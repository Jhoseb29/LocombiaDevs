import { Get } from "../controller/UserApi.js"

const totalHistoric = document.getElementById('list')

Get('historic').then(historic => {
    historic.forEach(entry => {
        const products = entry.products;
        const price = products[0].price; // Obtains the price of the first product
        const gameName = products[0].name; // Obtains the name of the first game
        const status = entry.status; // Obtains status of the purchase

        const historicContainer = document.createElement('div')

        const productName = document.createElement('h2')
        productName.textContent = gameName
        const productPrice = document.createElement('p')
        productPrice.textContent = price
        const productStatus = document.createElement('p')
        productStatus.textContent = status

        const productLine = document.createElement('hr')

        historicContainer.appendChild(productName)
        historicContainer.appendChild(productPrice)
        historicContainer.appendChild(productStatus)
        historicContainer.appendChild(productLine)
        totalHistoric.appendChild(historicContainer)

    });
});