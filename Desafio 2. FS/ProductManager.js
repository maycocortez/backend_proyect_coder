import {promises as fs} from 'fs'

class ProductManager {
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


await productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'http://ejemplo.com/imagen1.jpg', 'abc123', 100);
await productManager.addProduct('Producto 22', 'Descripción del producto 2', 11.99, 'http://ejemplo.com/imagen2.jpg', '123abc', 200);




let product = await productManager.getProductById(1);
console.log(product);

await productManager.deleteProductById(2);

await productManager.updateProducts({id: 1, title: 'Producto 1 actualizado', description: 'Descripción actualizada', price: 12.99, thumbnail: 'http://ejemplo.com/imagen1-actualizada.jpg', code: 'P001', stock: 150});

let productos = await productManager.getProducts();
console.log(productos);


