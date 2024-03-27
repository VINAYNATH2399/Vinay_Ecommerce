const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { validateProduct, isloggedIn, isSeller, isProductAuthor} = require("../middleware");
const Joi = require('joi');
const router = express.Router()


// displaying all the products
router.get('/products', async (req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index', {products})

    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

// adding a form for a new product
router.get("/products/new", isloggedIn, isSeller, (req,res)=>{
    try{
        res.render("products/new")
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

// actually adding a product in a DB 
router.post('/products',isloggedIn, isSeller, validateProduct, async (req,res)=>{
    try{
    let {name, img, price, desc} = req.body;
    await Product.create({name, img, price, desc, author:req.user._id})
    req.flash('success', "product added sucessfully")
    res.redirect ('/products')
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

// show particular product
router.get("/products/:id",isloggedIn, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundproduct = await Product.findById(id).populate('reviews');
        res.render("products/show", {foundproduct, msg: req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

// Edit Form
router.get("/products/:id/edit",isloggedIn, isSeller,isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundproduct = await Product.findById(id)
        res.render("products/edit", {foundproduct})
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

router.patch('/products/:id',isloggedIn, isSeller,isProductAuthor, validateProduct, async(req,res)=>{
    try{
        let {id} = req.params;
        let {name , img , price , desc} = req.body;
        await Product.findByIdAndUpdate(id , {name , img , price , desc} );
        req.flash('success', "product edited sucessfully")
        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

router.delete('/products/:id' ,isloggedIn,isSeller,isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        const product = await Product.findById(id);

        for(let id of product.reviews){
            await Review.findByIdAndDelete(id);
        }        
        await Product.findByIdAndDelete(id);
        req.flash('success' , 'Product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err :e.message})
    }
})

module.exports = router;