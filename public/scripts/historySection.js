import { Get } from "../controller/UserApi.js"

const historyContainer = document.querySelector('#historyContainer')
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userId = currentUser.id



Get(`historic?userId=${userId}`).then(historic => { 
    historic.forEach(entry => {
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
            const productImg = product.img
            const productName = product.name
            const productPrice = ` $ ${product.price}`
            const productDate = purchaseDate
            const userCardType = cardType
            const productOrder = orderNum

            //creación de los elementos de los atributos
            const gameImg = document.createElement('img')
            gameImg.classList.add("game-img")
            gameImg.src = productImg

            const gameTitle = document.createElement('h2')
            gameTitle.classList.add("game-title")
            gameTitle.textContent = productName

            const gameDate = document.createElement('p')
            gameDate.classList.add("game-date")
            gameDate.textContent =  productDate

            const userCard = document.createElement('p')
            userCard.classList.add("user-card")
            userCard.textContent =  userCardType

            const gamerOrder = document.createElement('p')
            gamerOrder.classList.add("game-order")
            gamerOrder.textContent = productOrder

            const gamerPrice = document.createElement('p')
            gamerPrice.classList.add("game-price")
            gamerPrice.textContent = productPrice
            // Agrega las etiquetas y componentes HTML al documento 
            productContainer.appendChild(gameImg)
            productContainer.appendChild(gameTitle)
            productContainer.appendChild(gameDate)
            productContainer.appendChild(gamerOrder)
            productContainer.appendChild(userCard)
            productContainer.appendChild(gamerPrice)
            historyContainer.appendChild(productContainer)
        

        })




        /*
        //Imprimir imagen del juego
        const productImg = products.map(product => product.img)
        const gameImg = document.createElement("img")
        gameImg.classList.add("game-img")
        
        productImg.forEach(img => gameImg.src = img)
        gameImg.src = productImg
        historyContainer.appendChild(gameImg)

        console.log(productImg)


        //Imprimir nombre del juego
        const productName = products.map(product => product.name)
        const gameTitle = document.createElement("h1")
        productName.forEach(Name => gameTitle.textContent = Name)
        historyContainer.appendChild(gameTitle)





/*
        const gameContainer= document.createElement("div")
        gameContainer.classList.add("game-container")
        /*

        const dateElement = document.createElement("p")
        entryContainer.classList.add("game-title")
        dateElement.textContent = `Date: ${date}`
        entryContainer.appendChild(dateElement)
        /*
        products.forEach(product =>{
            const productId = product.id
            const productName = product.name
            const productImgUrl= product.imgurl
        })

        const productContainer = document.createElement("div")
        productContainer.classList.add("product");

        const productNameElement = document.createElement("p")
        productNameElement.textContent = `Product: ${products.forEach(product => {product.name})}`

        productContainer.appendChild(productNameElement);


        const productImgElement = document.createElement("img")
        productImgElement.classList.add("product-img")
        productImgElement.src = products.forEach(product => {product.imgurl})
        
        productContainer.appendChild(productImgElement);

        entryContainer.appendChild(productContainer);


        */

    }) 
})



