var express = require("express");
var router = express.Router();
var OrderModel = require("../models/order");
var CartModel = require('../models/cart');
var ProductsModel = require("../models/products");
var authService = require('../services/auth');


router.get("/", async function(req, res, next) {
    let token = req.cookies.jwt;
    if (!token){
        return res.status(401).send('Must be logged in.')
    }
    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){
      OrderModel.find().then(orders => res.json(orders));
    }
    else {
      res.status(401);
      res.send('Must be logged in and be admin');
    }
});
router.get('/userorders', async function(req,res,next){
  let token = req.cookies.jwt;
if (!token){
    return res.status(401).send('Must be logged in.')
}
let user = await authService.verifyUser(token);
  if (user){
    OrderModel.find({userId: user.id}).sort({createdAt: -1}).then(orders => res.json(orders));

}
else {
  res.status(401);
  res.send('Must be logged in');
}
})
router.get('/:id', async function(req,res,next){
    let token = req.cookies.jwt;
  if (!token){
      return res.status(401).send('Must be logged in.')
  }
  let user = await authService.verifyUser(token);
    if (user){
      try {
        var order = (await OrderModel.findById(req.params.id).exec()).toObject();
        if (order.userId === user._id || user.isAdmin){
            const productIds = order.products.map(product => product.productId);
            let products = await ProductsModel.find().where('_id').in(productIds).exec();
            var productItems = order.products.map(p => {
            let product = products.find(elem => elem._id == p.productId);
            return {...p, product};
            });
            order.products = productItems;
            return res.json(order)
        }
        return res.status(402).send("You don't own this order");
    }
    catch (err){
        return res.status(401).send("Couldn't find order: "+err);
    }
  }
  else {
    res.status(401);
    res.send('Must be logged in');
  }
})

router.post('/create', async function(req,res,next){
    let token = req.cookies.jwt;
    if (!token){
        return res.status(401).send('Must be logged in.')
    }

    let address = req.body.address;

    if (address === undefined){
      return res.status(401).send('Address is required.');
    }

    let user = await authService.verifyUser(token);
    if (user){
      let cart = await CartModel.findOne({userId: user.id}).exec();
      if (cart){
          if (cart.products.length === 0){
            return res.status(401).send("No items in cart");
          }

          const productIds = cart.products.map(product => product.productId);
          let products = await ProductsModel.find().where('_id').in(productIds).exec();
          
          let amount = cart.products.map(product => {
            return product.quantity * products.find(elem => elem._id == product.productId).price
          }).reduce((a, b) => a+b);


          let newOrder = new OrderModel();
          newOrder.userId = user.id;
          newOrder.products = cart.products;
          newOrder.address = address;
          newOrder.amount = amount;

          try {
            let order = await newOrder.save();
            await CartModel.findOneAndUpdate({userId: user.id}, {products: []}, {upsert: true, new: true});
            return res.json({order, message: "New order created"});
        } catch (error) {
            return res.status(400).send(JSON.stringify(error));
        }

          
      }
      else{
        return res.status(401).send("No items in cart");
      }
    }
    else {
      res.status(401);
      res.send('Must be logged in');
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
      OrderModel.findByIdAndRemove(req.params.id, (err, prod) => {
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

module.exports = router;
