///INICIAR CON NPM START , y ABRIR LA APP EN EL PUERTO 8080


import express from 'express'
import routerProd from './routes/product.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import routerCart from "./routes/cart.js"
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename) 



const app = express()
const PORT = 8080

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 

//routes
app.use('/static',express.static(__dirname + '/public')) 

app.use('/api/products',routerProd) 

app.use('/api/carts',routerCart)



const server = app.listen(PORT,()=> { 
    console.log (`server on port ${PORT}`) })