module.exports = app => {
    const lote = require("../controllers/lote.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Propriedade
    router.post("/", lote.create);
  
    // Retrieve all Propriedades
    router.get("/", lote.findAll);
  
  
    // Retrieve a single Propriedade with id
    router.get("/:id", lote.findOne);
  
    // Update a Propriedade with id
    router.put("/:id", lote.update);
  
    // Delete a Propriedade with id
    router.delete("/:id", lote.delete);
  
    // Delete all Propriedades
    router.delete("/", lote.deleteAll);
  
    app.use('/api/lote', router);
  };
  