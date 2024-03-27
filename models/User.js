const { string } = require('joi');
const mongoose =  require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  
   email:{
    type:String,
    require : true,
    trim: true,
   },
   role : {
    type:String,
    default: "buyer"
   },
   gender:{
    type: String,
    require: true,
    trim: true,
   },
   wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
       }
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

})


userSchema.plugin(passportLocalMongoose); // always apply on schema

let User = mongoose.model('User' , userSchema);
module.exports = User;