const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Sylva Online Shop')
})

app.get('/products', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

app.post('/products', async (req, res) => {
   try {
    const data = req.body
    const product = await Product.create(data)

    res.send(product)
   } catch (error) {
       res.send(error.message)
   }
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findOne({_id: id})
    res.send(product)
})

app.patch('/products/:id', async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    const product = await Product.findOneAndUpdate({_id: id}, data, {new: true})

    res.send(product)
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete({_id: id})

    res.send(product)
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