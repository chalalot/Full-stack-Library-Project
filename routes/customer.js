const express = require("express");
const product = require("./../models/product");
const mongoose = require("./../config/db");
const router = express.Router();

let products = [];

const tool = new product({
    Seller:1,
    name:'tool',
    description:'a new tool',
    price:12,
});

tool.save()
.then(() => console.log("Document saved"))
.catch((error) => console.log(error.message))


router.get("/search", () => {
    product.find()
    .then( (data) => {
    products = data.map( product =>{
        const card = ProductCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = product.name;
        body.textContent = product.description;
        ProductCardContainer.append(product);
        console.log(product);
        return { name: product.name, description: product.description, element: card };
        })
    })
    .catch((error) => {
    // Handle any errors
    console.error('Error fetching products:', error);
})
})



module.exports = router;
