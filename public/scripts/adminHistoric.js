import { Get } from "../controller/UserApi.js"

const totalHistoric = document.getElementById('historic')

Get('historic').then(historic => {
    historic.forEach(entry => {
        const products = entry.products;
        const userId = `User ID: ${entry.userId}`; // Obtains the user ID
        const date = entry.date; // Obtains the date
        const status = entry.status; // Obtains status of the purchase

        products.forEach(product => {
            const price = product.price; // Obtains the price of the first product
            const gameName = product.name; // Obtains the name of the first game

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
});