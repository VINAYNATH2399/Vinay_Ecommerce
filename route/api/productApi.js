const express = require('express');
const { isloggedIn } = require('../../middleware');
const User = require('../../models/User');

const router = express.Router();


router.post('/products/:productId/like',isloggedIn, async(req,res)=>{
    let {productId}= req.params;
    let user = req.user;
    const isLiked = user.wishlist.includes(productId);

    if(isLiked){
        await User.findByIdAndUpdate(req.user._id , {$pull: {wishlist : productId} })
    }else{
        await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist : productId} })
    }
     res.status(201).send('ok');

})




module.exports = router;