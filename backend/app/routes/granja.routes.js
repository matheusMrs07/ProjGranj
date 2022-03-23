module.exports = app => {
  const granja = require("../controllers/granja.controller.js");

  var router = require("express").Router();

  // Create a new Propriedade
  router.post("/", granja.create);

  // Retrieve all Propriedades
  router.get("/", granja.findAll);


  // Retrieve a single Propriedade with id
  router.get("/:id", granja.findOne);

  // Update a Propriedade with id
  router.put("/:id", granja.update);

  // Delete a Propriedade with id
  router.delete("/:id", granja.delete);

  // Delete all Propriedades
  router.delete("/", granja.deleteAll);

  app.use('/api/granja', router);
};
