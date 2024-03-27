const express = require("express");
const { isloggedIn } = require("../middleware");
const User = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

router.get("/user/cart", isloggedIn, async (req, res) => {
    let userId = req.user._id;
    let user = await User.findById(userId).populate("cart");
  
    let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  
  
    res.render("cart/cart", { user, totalAmount });
  });
  
  router.post("/user/:productId/add",isloggedIn, async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId);
 
    let product = await Product.findById(productId);
    user.cart.push(product);
    await user.save();
    res.redirect("/user/cart");
  });

  router.post("/cart/:id/delete", async (req,res)=>{
    let {id} = req.params;
    await User.findByIdAndUpdate(req.user._id, {$pull: {cart:id}})
    res.redirect("/user/cart")
})
  
  module.exports = router;
