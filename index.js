class Cart {
  constructor() {
    this.products = []
  }

  addProduct(product) {
    this.products.push(product)
  }

  deleteProduct(id) {
    const products = this.products.filter(product => product.id !== id)
    this.products = products
  }

  calculateTotal() {
    let total = 0

    this.products.forEach(product => {
      total = total + parseFloat(product.price)
    })

    return total
  }

  productCounter(){
    let totalAmount = 0
  
    this.products.forEach(product => {
      
      totalAmount = totalAmount + parseInt(product.amount) ;
      console.log(totalAmount)

    })

    return totalAmount
      
  }
  
}

class Product {
  constructor(id, name, price, image, amount) {
    this.id = id
    this.name = name
    this.price = price
    this.image = image
    this.amount = amount;
  }
}

let cart = new Cart()

const products = document.querySelectorAll('.product')

products.forEach(product => {
  const button = product.querySelector('.button')
  const name = product.querySelector('.name').innerText
  const image = product.querySelector('.image').getAttribute('src')
  const price = product.querySelector('.price').innerText
  const id = product.querySelector('.id').getAttribute('value')
  const amount = product.querySelector('.amount').innerText

  
  
/**
   * Agregar producto al carrito y dibujar en el html
   */
  button.addEventListener('click', () => {
    const displayCart = document.getElementById('cart')

    const product = new Product(id, name, price, image, amount)
    cart.addProduct(product)
  

    const totalPrice = cart.calculateTotal()
    const totalPriceText = document.querySelector('.total-price')
    totalPriceText.innerText = totalPrice

    const amountTotal = cart.productCounter(product)

    // crear bloque html
    const articleContainer = document.createElement('article')
    const imgContainer = document.createElement('img')
    const dataContainer = document.createElement('div')
    const nameContainer = document.createElement('h2')
    const priceContainer = document.createElement('h3')
    const deleteButton = document.createElement('span')
    const amountContainer = document.createElement('h4')

    nameContainer.innerText = name
    priceContainer.innerText = '$' + price
    imgContainer.src = image
    deleteButton.innerText = 'x'
    amountContainer.innerText = 'x' + amountTotal

    const productList = document.querySelector('.products-list')

    articleContainer.appendChild(imgContainer)
    articleContainer.appendChild(dataContainer)
    dataContainer.appendChild(nameContainer)
    dataContainer.appendChild(priceContainer)
    dataContainer.appendChild(deleteButton)
    productList.appendChild(articleContainer)
    dataContainer.appendChild(amountContainer)
   

    const buttonAllDelete = document.querySelector('.buttonDeleteAll')
    buttonAllDelete.addEventListener('click', () => {
      articleContainer.remove()
      cart = new Cart()
      totalPriceText.innerText = 0
      
      

    })


    deleteButton.addEventListener('click', () => {
      cart.deleteProduct(id)
      articleContainer.remove()

      const totalPrice = cart.calculateTotal()
      const totalPriceText = document.querySelector('.total-price')
      totalPriceText.innerText = totalPrice
    })
  })
})
