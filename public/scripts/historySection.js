import { Get } from "../controller/UserApi.js"

const historyContainer = document.querySelector('#historyContainer')
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userId = currentUser.id



Get(`historic?userId=${userId}`).then(historic => {
    const historicoordenado = historic.reverse(); //? para que se muestren las ultimas compras de primero
    historicoordenado.forEach(entry => {
        const products = entry.products
        const purchaseDate = entry.date
        const cardType = `User card: ${entry.card}` 
        const orderNum = `Order Number: ${entry.order}`

        //iterar en los valores de los productos comprados por el usuario

        products.forEach(product =>{
            //contenedores de los productos
            const productContainer = document.createElement('div')
            productContainer.classList.add('product-container')
            
            //atributos de los productos
            const productImg = product.imgurl
            const productName = product.name
            const productPrice = `$ ${product.price}`
            const productDate = purchaseDate
            const userCardType = cardType
            const productOrder = orderNum

            const productInfoDiv = document.createElement('div')
            productInfoDiv.classList.add("game-info-div")
            

            //creación de los elementos de los atributos
            //imagen del producto
            const imgDiv = document.createElement('div')
            imgDiv.classList.add('img-div')

            const gameImg = document.createElement('img')
            gameImg.classList.add("game-img")
            gameImg.src = productImg

            imgDiv.appendChild(gameImg)
            productContainer.appendChild(imgDiv)

            //Titulo, tipo de tarjeta, numero de orden
            const titleDiv = document.createElement('div')
            titleDiv.classList.add('title-div')

            const gameTitle = document.createElement('h2')
            gameTitle.classList.add("game-title")
            gameTitle.textContent = productName

            const userCard = document.createElement('p')
            userCard.classList.add("user-card")
            userCard.textContent =  userCardType

            const gameOrder = document.createElement('p')
            gameOrder.classList.add("game-order")
            gameOrder.textContent = productOrder


            
            titleDiv.appendChild(gameTitle)
            titleDiv.appendChild(userCard)
            titleDiv.appendChild(gameOrder)

            productInfoDiv.appendChild(titleDiv)
            

            //fecha y precio del producto
            const dateDiv = document.createElement('div')
            dateDiv.classList.add('date-div')

            const gameDate = document.createElement('p')
            gameDate.classList.add("game-date")
            gameDate.textContent =  productDate

            const gamePrice = document.createElement('p')
            gamePrice.classList.add("game-price")
            gamePrice.textContent = productPrice

            dateDiv.appendChild(gameDate)
            dateDiv.appendChild(gamePrice)

            
            productInfoDiv.appendChild(dateDiv)
            productContainer.appendChild(productInfoDiv)
            historyContainer.appendChild(productContainer)
            
        })


    }) 
})


