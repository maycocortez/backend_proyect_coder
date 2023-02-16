
import express from 'express'
import routerProd from './routes/product.js'
import routerCart from "./routes/cart.js"
import {__dirname} from './path.js'
import {engine}  from 'express-handlebars'
import * as path from 'path' //importame todo de el archivo path
import {Server} from 'socket.io' //importo sockets
import ProductManager from "./controllers/ProductManager.js";
import socketRouter from "./routes/socket.routes.js";




const app = express()
const PORT = 8080

const server = app.listen(PORT,()=> { 
    console.log (`server on port ${PORT}`) 
})

export const io = new Server(server) //guardo mi server en socket



//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.engine("handlebars",engine()) // para poder utilizar las handlebars que estan dentro de la carpeta view
app.set("view engine","handlebars") //defino que mis views son archivos handlebars
app.set('views',path.resolve(__dirname , './views')) //concateno 2 rutas


//routes


app.use('/static',express.static(__dirname + '/public')) 

app.use('/api/products',routerProd) 

app.use('/api/carts',routerCart)

app.use("/static/realTimeProducts", socketRouter);


const productAll = new ProductManager();

app.get('/static', async(req,res) => {
    
    let products = await productAll.readProducts();
    res.render('home', {products }
)})







