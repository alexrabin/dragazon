var express = require("express");
var router = express.Router();
var ProdModel = require("../models/products");
var UserModel = require("../models/users");
var authService = require('../services/auth');


router.get("/", function(req, res, next) {
  ProdModel.find().then(prods => res.json(prods));
});

router.post("/", async function(req, res, next) {
  let token = req.cookies.jwt;
    if (!token){
      res.status(401);
      res.send('Must be logged in');
      return
    }
    console.log(req.body);
    let title = req.body.title;
    let desc = req.body.desc;
    let img = req.body.img;
    let price = req.body.price;
    let categories = req.body.categories;
    let inStock = req.body.inStock;

    if (title === undefined || desc === undefined || img === undefined || price ===undefined, inStock === undefined){
        return res.status(400).send("Title, description, image, in stock and price are required.");
    }

    if (title.replace(' ','') === "" || desc.replace(' ','') === "" || img.replace(' ','') === "" || price.replace(' ','') ===""){
      return res.status(400).send("Title, description, image, in stock and price are required.");
  }

    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){

      let newProd = new ProdModel();
      newProd.title = title;
      newProd.desc = desc;
      newProd.img = img;
      newProd.price = price;
      newProd.inStock = inStock;
      newProd.categories = categories ? categories.replace(' ','').split(',') : []
      newProd.save().then(prod => res.json(prod));

    }
    else {
      res.status(401);
      res.send('Must be an admin to create products.');
    }

  
});

router.delete("/:id", async function(req, res, next) {

  let token = req.cookies.jwt;
    if (!token){
      res.status(401);
      res.send('Must be logged in');
      return
    }
    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){
      ProdModel.findByIdAndRemove(req.params.id, (err, prod) => {
        if (err) return res.status(400).send(err);
        res.send(prod);
      });
    }
    else {
      res.status(401);
      res.send('Must be an admin to delete products.');
    }
  
});

router.put("/:id", async function(req, res, next) {

  let token = req.cookies.jwt;
    if (!token){
      res.status(401);
      res.send('Must be logged in');
      return
    }
    if (Object.keys(req.body).length === 0){
      return res.status(400).send("Title, description, image, categories, price and in stock are required.");
  }
    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){

      let title = req.body.title;
      let desc = req.body.desc;
      let img = req.body.img;
      let price = parseInt(req.body.price);
      let inStock = req.body.inStock;
      let categories = req.body.categories ? req.body.categories.replace(' ','').split(',') : []
      if (title === undefined || desc === undefined || img === undefined || price ===undefined, inStock === undefined){
        return res.status(400).send("Title, description, image, in stock and price are required.");
      }
      ProdModel.findByIdAndUpdate(
        req.params.id,
        {
          title: title,
          desc: desc,
          img: img,
          price: price,
          inStock: inStock,
          categories: categories
        },
        { new: true },
        (err, prod) => {
          if (err) return res.status(400).send(err);
          res.send(prod);
        }
      );
    }
    else {
      res.status(401);
      res.send('Must be an admin to update products.');
    }

  
});

router.get('/:id', async function(req,res,next){
  try {
    const prod = await ProdModel.findById(req.params.id).exec();
    return res.json(prod); 
  }
  catch (err){
      return res.status(401).send(`Couldn't find product: ${err}`);
  }

})
module.exports = router;
