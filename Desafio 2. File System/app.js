import {promises as fs} from 'fs'

class ProductManager {
  constructor() {
    this.path = './prueba'
    this.products = []
  }
  static id = 0

  addProduct = async (title,description,price,thumbnail,code,stock) => {
    ProductManager.id++

      let newProduct = {title,description,price,thumbnail,code,stock,id:ProductManager.id}
      this.products.push(newProduct)

    await fs.writeFile(this.path,JSON.stringify(this.products))
  }

readProducts = async () => {
  let resultado = await fs.readFile(this.path,'utf-8')
  return JSON.parse(resultado)

}

  getProducts = async () => {
    let respuesta2 = await this.readProducts()
return console.log(respuesta2)
  }

  getProductById = async (id) => {
    let respuesta3 = await this.readProducts()
   if( !respuesta3.find(product => product.id === id)) {
    console.log("No se encontro el producto")
   } else {
    console.log(respuesta3.find(product => product.id === id))
   }
   }

   deleteProductById = async (id)=> {

    let respuesta4 = await this.readProducts()
    let productFilter = respuesta4.filter(products => products.id !=id)
  
    await fs.writeFile(this.path,JSON.stringify(productFilter))
    console.log("Producto eliminado")

   }

   updateProducts = async ({id, ...producto}) => {
 await this.deleteProductById(id)
    let productOld = await this.readProducts()
 
    let productModif = [
      {...producto,id}, ...productOld]

      await fs.writeFile(this.path,JSON.stringify(productModif))


   }
}

const newProducts = new ProductManager 




newProducts.addProduct("producto prueba","este es un producto de prueba",25,"sin imagen","abc123",5)
newProducts.addProduct("producto prueba 1","este otro producto de prueba",35,"sin imagen 1","abc1234",15)

newProducts.getProducts()

newProducts.getProductById(1)

newProducts.updateProducts( {
  title: 'producto prueba',
  description: 'este es un producto de prueba actualizado',
  price: 100,
  thumbnail: 'sin imagen',
  code: 'abc123',
  stock: 5,
  id: 1
})


newProducts.deleteProductById(1)

/*
//newProducts.getProducts()
//newProducts.getProductById(1)

//newProducts.deleteProductById(1)

newProducts.updateProducts( {
  title: 'producto prueba',
  description: 'este es un producto de prueba actualizado',
  price: 100,
  thumbnail: 'sin imagen',
  code: 'abc123',
  stock: 5,
  id: 1
})*/