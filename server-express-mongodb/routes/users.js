var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
var CartModel = require('../models/cart');
var OrderModel = require('../models/order');
var ProductsModel = require('../models/products');

const bcrypt = require('bcrypt');
var authService = require('../services/auth');
router.get("/", async function(req, res, next) {

    let token = req.cookies.jwt;
    if (!token){
      res.status(401);
      res.send('Must be logged in');
      return
    }

    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){
        UserModel.find().then(users => res.json(users));
    }
    else {
        res.status(401);
        res.send('Must be an admin.');
      }
  
});

router.post("/signup", async function(req, res, next) {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Name, email, username, and password are required.");
    }
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    if (name === undefined || email === undefined || password === undefined || username ===undefined){
        return res.status(400).send("Name, email, username, and password are required.");
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    
    let newUser = new UserModel();
    newUser.name = name;
    newUser.email = email;
    newUser.password = passwordHash;
    newUser.username = username;

    try {
        let user = await newUser.save();
        const token = authService.signUser(user);
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite:true
        });
        return res.json({user, message: "User created"});
    } catch (error) {
        let key = Object.keys(error.keyValue)[0];
        let value = error.keyValue[key];
        return res.status(400).send(`The ${key} ${value} is taken.`);
    }
    
});
router.post("/login", async function(req, res, next) {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Username and password are required.");
    }
    let password = req.body.password;
    let username = req.body.username;
    if (password === undefined || username ===undefined){
        return res.status(400).send("Username and password are required.");
    }
    let user = await UserModel.findOne({ username: req.body.username }).exec();
    if (user === null){
        return res.status(400).send(`Username ${username} does not exist.`);
    }
    let passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch){
        const token = authService.signUser(user);
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite:true
        });
        return res.send('Login successful');
    }
    else {
         
        return res.status(400).send('Wrong password');
          
    }
});

router.get("/profile", async function(req,res,next){
    let token = req.cookies.jwt;
    if (!token){
        return res.status(401).send('Must be logged in.')
    }

    let user = await authService.verifyUser(token);
    if (user){
        res.send(JSON.stringify(user));
      }
      else {
        res.status(401);
        res.send('Must be logged in');
      }

});

router.get('/logout', function(req, res, next){
    res.cookie('jwt', '', {expires: new Date(0)});
    res.send('logged out');
  });

router.post('/addtocart', async function(req, res, next){
  let token = req.cookies.jwt;
  if (!token){
      return res.status(401).send('Must be logged in.')
  }
  let products = req.body.products;

  if (products === undefined){
    return res.status(401).send('Products are required.');
  }
  
  let user = await authService.verifyUser(token);
    if (user){
      let cart = await CartModel.findOneAndUpdate({userId: user.id}, {$push: {products: products}}, {upsert: true, new: true});
      return res.send(cart)
    }
    else {
      res.status(401);
      res.send('Must be logged in');
    }
});

router.post('/removefromcart', async function(req, res, next){
  let token = req.cookies.jwt;
  if (!token){
      return res.status(401).send('Must be logged in.')
  }
  let products = req.body.products;

  if (products === undefined){
    return res.status(401).send('Products are required.');
  }
  
  let user = await authService.verifyUser(token);
    if (user){
      let cart = await CartModel.findOneAndUpdate({userId: user.id}, {$pullAll: {products: products  }}, {upsert: true, new: true});
      return res.send(cart)
    }
    else {
      res.status(401);
      res.send('Must be logged in');
    }
});
router.post('/createorder', async function(req,res,next){
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

router.get('/orders', async function(req, res, next){
  let token = req.cookies.jwt;
  if (!token){
      return res.status(401).send('Must be logged in.')
  }
  let user = await authService.verifyUser(token);
  if (user){
    OrderModel.find({userId: user.id}).then(orders => res.json(orders));
  }
  else {
    res.status(401);
    res.send('Must be logged in');
  }
})
router.get('/order/:id', async function(req, res, next){
  let token = req.cookies.jwt;
  if (!token){
      return res.status(401).send('Must be logged in.')
  }
  let user = await authService.verifyUser(token);
    if (user){
      try {
        var order = (await OrderModel.findById(req.params.id).exec()).toObject();
        const productIds = order.products.map(product => product.productId);
        let products = await ProductsModel.find().where('_id').in(productIds).exec();
        var productItems = order.products.map(p => {
          let product = products.find(elem => elem._id == p.productId);
          console.log(JSON.stringify(product));
          return {...p, product};
        });
        order.products = productItems;
        return res.json(order)
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
router.get('/userID/:id', async function(req, res, next){

    let token = req.cookies.jwt;
    if (!token){
      res.status(401);
      res.send('Must be logged in');
      return
    }

    let user = await authService.verifyUser(token);
    if (user && user.isAdmin){
        try {
            let requestedUser = await UserModel.findById(req.params.id).exec();
            if (requestedUser){
                res.send(JSON.stringify(requestedUser));
            }
            else {
                res.status(404);
                res.send('User does not exist.');
            }
        }
        catch (err){
            return res.status(404).send("User does not exist.");
        }
    }
    else {
        res.status(401);
        res.send('Must be an admin.');
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
      UserModel.findByIdAndRemove(req.params.id, (err, task) => {
        if (err) return res.status(400).send(err);
        res.send({task, message:`Deleted Task: ${req.params.id} ID`});
      });
    }
    else {
        res.status(401);
        res.send('Must be an admin.');
      }
  
});

// router.put("/:id", function(req, res, next) {
//   TaskModel.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       complete: req.body.complete
//     },
//     { new: true },
//     (err, task) => {
//       if (err) return res.status(400).send(err);
//       res.send(task);
//     }
//   );
// });

module.exports = router;
