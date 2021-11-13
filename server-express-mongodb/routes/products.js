var express = require("express");
var router = express.Router();
var ProdModel = require("../models/products");

router.get("/", function(req, res, next) {
  ProdModel.find().then(prods => res.json(prods));
});

router.post("/", function(req, res, next) {
  let newProd = new ProdModel();
  newProd.name = req.body.name;
  newProd.complete = req.body.complete;
  newProd.save().then(prod => res.json(prod));
});

router.delete("/:id", function(req, res, next) {
  ProdModel.findByIdAndRemove(req.params.id, (err, prod) => {
    if (err) return res.status(400).send(err);
    res.send(prod);
  });
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
