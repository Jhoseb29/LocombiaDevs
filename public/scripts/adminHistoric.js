import { Get } from "../controller/UserApi.js"

const totalHistoric = document.getElementById('historic')

Get('historic').then(historic => {
    historic.forEach(entry => {
        const products = entry.products;
        const price = products[0].price; // Obtains the price of the first product
        const date = entry.date; // Obtains the date
        const gameName = products[0].name; // Obtains the name of the first game
        const userId = entry.userId; // Obtains the user ID
        const status = entry.status; // Obtains status of the purchase

        const historicContainer = document.createElement('div')

        const productName = document.createElement('h2')
        productName.textContent = gameName
        const productPrice = document.createElement('p')
        productPrice.textContent = price
        const productDate = document.createElement('p')
        productDate.textContent = date
        const productStatus = document.createElement('p')
        productStatus.textContent = status
        const username = document.createElement('p')
        username.textContent = userId

        const productLine = document.createElement('hr')

        historicContainer.appendChild(productName)
        historicContainer.appendChild(productPrice)
        historicContainer.appendChild(productDate)
        historicContainer.appendChild(productStatus)
        historicContainer.appendChild(username)
        historicContainer.appendChild(productLine)
        totalHistoric.appendChild(historicContainer)

    });
});