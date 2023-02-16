import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import { io } from "../app.js";

const socketRouter = Router();
const productAll = new ProductManager();




socketRouter.get("/", async (req, res) => {
 
  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('addProduct', async ({ title, price,thumbnail,code,stock }) => {
        await productAll.addProduct(title, '', price, '', thumbnail,'',code,'',stock,'');
        const products = await productAll.getProducts();
        
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (id) => {
        await productAll.deleteProductById(id);
        const products = await productAll.getProducts();
        io.emit('updateProducts', products);
    });
});

  //Render 
  const products = await productAll.readProducts();
  res.render('realTimeProducts', { products })


})







export default socketRouter;