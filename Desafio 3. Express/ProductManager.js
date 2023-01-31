import {promises as fs} from 'fs'

export default class ProductManager {
  constructor() {
    this.path = './prueba.txt'
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
    let response = await this.readProducts()
    console.log(response)
    return response;
  }

  getProductById = async (id) => {
    let responseId = await this.readProducts()
   if( !responseId.find(product => product.id === id)) {
    console.log("Id not found")
   } else {
    console.log(responseId.find(product => product.id === id))
   }
   }

   deleteProductById = async (id)=> {

    let deleteById = await this.readProducts()
    let filterById = deleteById.filter(products => products.id !=id)
  
    await fs.writeFile(this.path,JSON.stringify(filterById))
    console.log("Producto eliminado")

   }

   updateProducts = async ({id, ...producto}) => {
 await this.deleteProductById(id)
    let productUpdate = await this.readProducts()
 
    let updateProd = [
      {...producto,id}, ...productUpdate]

      await fs.writeFile(this.path,JSON.stringify(updateProd))
        console.log("Producto Actualizado")

   }
}


const productManager = new ProductManager();

/*
await productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'http://ejemplo.com/imagen1.jpg', 'abc123', 100);
await productManager.addProduct('Producto 22', 'Descripción del producto 2', 11.99, 'http://ejemplo.com/imagen2.jpg', '123abc', 200);
await productManager.addProduct('Producto 33', 'Descripción del producto 3', 12.99, 'http://ejemplo.com/imagen3.jpg', '1234abc', 400);
await productManager.addProduct('Producto 44', 'Descripción del producto 4', 13.99, 'http://ejemplo.com/imagen4.jpg', '12345abc', 500);
await productManager.addProduct('Producto 5', 'Descripción del producto 5', 15.99, 'http://ejemplo.com/imagen5.jpg', '123456abc', 500);
await productManager.addProduct('Producto 6', 'Descripción del producto 6', 16.99, 'http://ejemplo.com/imagen6.jpg', '1234567abc', 600);
await productManager.addProduct('Producto 7', 'Descripción del producto 7', 17.99, 'http://ejemplo.com/imagen7.jpg', '12345678abc', 700);
await productManager.addProduct('Producto 8', 'Descripción del producto 8', 18.99, 'http://ejemplo.com/imagen8.jpg', '123456789abc', 800);
await productManager.addProduct('Producto 9', 'Descripción del producto 9', 19.99, 'http://ejemplo.com/imagen9.jpg', '123456789abc', 900);
await productManager.addProduct('Producto 10', 'Descripción del producto 10', 20.99, 'http://ejemplo.com/imagen4.jpg', '12345678910abc', 1000);
*/
