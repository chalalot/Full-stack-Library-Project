const express = require("express");
const { Product } = require("./../models/product");
const mongoose = require("./../config/db");
const router = express.Router();
const products = require("./../config/products.json");



router.get("/products", async(req,res) =>{
    try {
        const page = parseInt(req.query.page)-1 || 0;
        const limit = parseInt(req.query.limit)||5;
        const search = req.query.search||"";
        let sort = req.query.sort || "price";

        req.query.sort ? (sort=req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        //define product
        const products = await Product.find({name: {$regex:search, $options:"i"}}).sort(sortBy).skip(page*limit);
        // $regex pattern matching string s in query
        //option is 'i' because it matches every letter doesn't matter it's capital or small 

        const total = await Product.countDocuments({
            name:{ $regex: search, $options: "i"},
        });

        const reponse = {
            error: false,
            total,
            page: page + 1,
            limit,
            products,
        }
        res.status(200).json(reponse);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:true, message:"Internal Server Error"})
    }
})

//inser object for testing
// const insertProduct = async() => {
//     try{
//         const docs = await Product.insertMany(products);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// insertProduct()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err));

module.exports = router;
