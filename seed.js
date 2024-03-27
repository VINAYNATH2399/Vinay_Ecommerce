const Product = require("./models/Product")
const mongoose = require('mongoose')

const product = [
    {
        name : "Techno Phone",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmTCEPUUCpSp-1zntmAiAWlC6JjZxR20Gsog&usqp=CAU",
        price: 8000,
        desc : "It is a mobile"
  },
  {
      name : "Sumgsung Phone",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfdqqbDbaTxzbCg2i487TrwpBmjliCtswfw&usqp=CAU",
      price: 9000,
      desc : "My name is Sumgsung"
  },
  {
      name : "Redmi",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxOeowKYHexZHbhB2EgNOSJDOIo5Q8RLvag&usqp=CAU",
      price: 18000,
      desc : "my name is redmi"
  },
]

async function seedDB(){
    await Product.insertMany(product);
    console.log("Database seeded successfully");

}

module.exports = seedDB;



