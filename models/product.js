const { request } = require("express");

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true},
    desc: String,
    price:  {
        type: Number,
        required: true},
    cat: {
        type: String,
        required: true},
    image: String,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product