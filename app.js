//creo mi clase la cual solo constara de un array vacio
class ProductManager {
  constructor() {
      this.products = [];
      
  }
    static id = 0
  
    //agrego el metodo addProduct que se encargara de pushear el objeto al array
  addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++
    this.products.push({title,description,price,thumbnail,code,stock,id:ProductManager.id})

    //confirmo que todos los campos esten ocupados
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('todos los campos son necesarios');
    }

  
}

//creo el metodo para verificar que productos existen en mi array
getProducts() {
    return this.products
}


//agrego metodo para verificar si existe el producto por su id
getProductById(id) {
    let product = this.products.find(product => product.id === id);
    if (!product) {
        console.log("Not found");
        return;
    }
    return product;
}

}

const newProducts = new ProductManager

//Verifico que el array esta vacio
console.log(newProducts.getProducts())



//añado productos con el metodo addProduct
newProducts.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
newProducts.addProduct("producto prueba 1","Este es otro producto prueba",300,"Sin imagen","123abc",30)


//verifico que se hayan agregado los productos de manera satisfactoria al array , y que contengan su id auntoincrementable
console.log(newProducts.getProducts())

//Envio un id inexistente para que me notifique por consola un "not found"
newProducts.getProductById(3)