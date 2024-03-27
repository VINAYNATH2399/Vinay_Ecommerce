const express = require("express")
const mongoose = require("mongoose")
const path = require("path");
const productRoutes = require('./route/product')
const reviewRoutes = require('./route/review')
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");
const authRoutes = require("./route/auth");
const productApi = require("./route/api/productApi");
const cartRoutes = require("./route/cart")
const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local')
const app = express()


mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => {console.log("DB connected vinay");})
.catch((err) => {console.log(err);});


app.set("view engine" , "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
  res.render("home");
});


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }
  app.use(session(configSession));
  app.use(flash())
  

 
  app.use(passport.initialize()) //pass
  app.use(passport.session()) //pass
  
  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(User.serializeUser()); //pass
  passport.deserializeUser(User.deserializeUser()); //pass
  
  // use static authenticate method of model in LocalStrategy
  passport.use(new LocalStrategy(User.authenticate())); //pass 


  app.use((req,res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


//router
app.use(productRoutes)
app.use(reviewRoutes)
app.use(authRoutes)
app.use(productApi)
app.use(cartRoutes)



const port = 3000
app.listen(port , ()=>{
    console.log(`Server is connected in port ${port}`);
})

