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

    let title = req.body.title;
    let desc = req.body.desc;
    let img = req.body.img;
    let price = req.body.price;
    let categories = req.body.categories;

    if (title === undefined || desc === undefined || img === undefined || price ===undefined){
        return res.status(400).send("Title, description, image, and price are required.");
    }

    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){

      let newProd = new ProdModel();
      newProd.title = title;
      newProd.desc = desc;
      newProd.img = img;
      newProd.price = price;
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

router.put("/:id", function(req, res, next) {
  ProdModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      complete: req.body.complete
    },
    { new: true },
    (err, prod) => {
      if (err) return res.status(400).send(err);
      res.send(prod);
    }
  );
});

module.exports = router;
