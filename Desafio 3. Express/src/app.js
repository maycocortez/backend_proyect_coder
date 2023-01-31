///INICIAR CON NPM START , y ABRIR LA APP EN EL PUERTO 8080


import express from 'express'

import ProductManager from '../ProductManager.js'

const app = express()
app.use(express.urlencoded({extended:true}))
const PORT = 8080


const productManager = new ProductManager();

const products = productManager.readProducts()

app.get('/', (req,res) => {
    res.send("Bienvenido!")
})

app.get('/products', async (req,res)=> {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send( await products)
    let allProducts = await products
    let productLimit = allProducts.slice(0,limit)
    res.send(productLimit)
})

app.get('/products/:id', async (req,res) => {
let id = parseInt(req.params.id)
let allProducts = await products
let findId = allProducts.find(products => products.id === id)
if(!findId) return res.send({error: "PRODUCT NOT FOUND"})
res.send(findId)
})



const server = app.listen(PORT,()=> { 
    console.log (`server on port ${PORT}`) })