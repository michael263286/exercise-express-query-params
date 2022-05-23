const http = require('http');
const express = require('express')

const port = 3000
const hostname = 'localhost'

const app = express()
const server = http.createServer(app)

const productsService = require('./services/products')

app.get('/', (req, res) => res.send('Build the API!'))

// Build Routes
app.get("/api/v1/products",(req,res) =>{
  const sortBy = req.query.sort || 'id'
  const order = req.query.order || 'ASC'
  res.json(productsService.findAll(sortBy,order))
} )



app.get("/api/v1/products/search",(req,res)=>{
  const key = req.query.key
  const value = req.query.value
  const sortBy = req.query.sort || 'id'
  const order = req.query.order || 'ASC'
  
    if(!key||!value) {(res.status(404).json({error: "Not a valid search query"}))
  }
  const searched = productsService.search(key,value,sortBy,order)
  res.json(searched)
})


app.get("/api/v1/products/:productID", (req,res) => {
  const productID = parseInt(req.params.productID)
  if (!productID) {
    (res.status(404).json({ error: "could not find product with id: " + productID }))
  return
}
  res.json(productsService.findOneById(productID))
})



app.get('*', (req, res) => res.status(404).send('Page not found'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})