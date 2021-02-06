const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Sylva Online Shop')
})

app.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (error) {
      next(error)
  } 
})

app.post('/products', async (req, res, next) => {
   try {
    const data = req.body
    const product = await Product.create(data)

    res.send(product)
   } catch (error) {
     next(error)
   }
})

app.get('/products/:id', async (req, res, next) => {
   try {
    const {id} = req.params;
    const product = await Product.findOne({_id: id})
    res.send(product)
   } catch (error) {
       next(error)
   }
})

app.patch('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
    const data = req.body;

    const product = await Product.findOneAndUpdate({_id: id}, data, {new: true})

    res.send(product)
    } catch (error) {
        next(error)
    }
})

app.delete('/products/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
    const product = await Product.findByIdAndDelete({_id: id})

    res.send(product)
    } catch (error) {
        next(error)
    }
})

mongoose.connect('mongodb+srv://Sylvasam18:3RjOyf2b7Qe2IoZc@cluster0.pivgx.mongodb.net/introtomongo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB conected')
    app.listen('9000', () => {
        console.log('server running')
        
    })
})