const express = require("express");
const Product = require("../models/Product");
const Review = require("../models/Review");
const { validateReview, isloggedIn} = require("../middleware");


const router = express.Router()

router.post('/products/:productId/rating',isloggedIn, validateReview, async (req,res)=>{
    try{
        let {productId} = req.params;
        let {rating, comment} = req.body;
        const product = await Product.findById(productId)
        const review = new Review({rating, comment})
    
        product.reviews.push(review);
        await product.save()
        await review.save()

        req.flash('success', 'Comment added sucessfully')
        res.redirect(`/products/${productId}`)
        
    }
    catch(err){
        res.render('error', {err :e.message})
    }
})

router.delete('/products/:productId/reviews/:reviewId', isloggedIn, async (req, res) => {
    try {
      const { productId, reviewId } = req.params;
      
      const product = await Product.findById(productId);
      const review =  await Review.findByIdAndDelete(reviewId)
  
      
      await product.save();
  
      res.redirect(`/products/${productId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;