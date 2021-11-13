var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
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
        res.cookie('jwt', token);
        return res.json({user, message: "User created"});
    } catch (error) {
        let key = Object.keys(error.keyValue)[0];
        let value = error.keyValue[key];
        return res.status(400).send(`The ${key} ${value} is taken.`);
        // console.log("Creating user error:",JSON.stringify(error));
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
        res.cookie('jwt', token);
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

router.delete("/:id", function(req, res, next) {
  TaskModel.findByIdAndRemove(req.params.id, (err, task) => {
    if (err) return res.status(400).send(err);
    res.send(task);
  });
});

router.put("/:id", function(req, res, next) {
  TaskModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      complete: req.body.complete
    },
    { new: true },
    (err, task) => {
      if (err) return res.status(400).send(err);
      res.send(task);
    }
  );
});

module.exports = router;
