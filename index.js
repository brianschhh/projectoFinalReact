class Cart {
  constructor() {
    this.products = []
  }

  addProduct(product) {
    const isRepeat = this.products.findIndex(item => item.id === product.id)
    if (isRepeat >= 0) {
      this.products[isRepeat] = {
        ...product,
        quantity: this.products[isRepeat].quantity + 1
      }
    } else {
      this.products.push(product)
    }
  }

  deleteProduct(id) {
    const products = this.products.filter(product => product.id !== id)
    this.products = products
  }

  calculateTotal() {
    let total = 0

    this.products.forEach(product => {
      total = total + parseFloat(product.price) * parseInt(product.quantity)
    })

    return total
  }
}

class Product {
  constructor(id, name, price, image) {
    this.id = id
    this.name = name
    this.price = price
    this.image = image
    this.quantity = 1
  }
}

const cart = new Cart()

const products = document.querySelectorAll('.product')

products.forEach(product => {
  const button = product.querySelector('.button')
  const name = product.querySelector('.name').innerText
  const image = product.querySelector('.image').getAttribute('src')
  const price = product.querySelector('.price').innerText
  const id = product.querySelector('.id').getAttribute('value')

  /**
   * Agregar producto al carrito y dibujar en el html
   */
  button.addEventListener('click', () => {
    const product = new Product(id, name, price, image)
    cart.addProduct(product)

    const totalPrice = cart.calculateTotal()
    const totalPriceText = document.querySelector('.total-price')
    totalPriceText.innerText = totalPrice

    const productList = document.querySelector('.products-list')
    productList.innerHTML = ''

    cart.products.forEach(item => {
      // crear bloque html
      const articleContainer = document.createElement('article')
      const imgContainer = document.createElement('img')
      const dataContainer = document.createElement('div')
      const nameContainer = document.createElement('h2')
      const priceContainer = document.createElement('h3')
      const deleteButton = document.createElement('span')

      nameContainer.setAttribute('id', 'item-' + item.id)

      nameContainer.innerText = item.name + 'x' + item.quantity
      priceContainer.innerText = '$' + item.price
      imgContainer.src = item.image
      deleteButton.innerText = 'x'

      articleContainer.appendChild(imgContainer)
      articleContainer.appendChild(dataContainer)
      dataContainer.appendChild(nameContainer)
      dataContainer.appendChild(priceContainer)
      dataContainer.appendChild(deleteButton)
      productList.appendChild(articleContainer)

      

      

      deleteButton.addEventListener('click', () => {
        cart.deleteProduct(item.id)
        articleContainer.remove()

        const totalPriceText = document.querySelector('.total-price')
        totalPriceText.innerText = cart.calculateTotal()
      })
    })
  })
})


