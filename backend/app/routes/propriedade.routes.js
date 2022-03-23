module.exports = app => {
  const propriedade = require("../controllers/propriedade.controller.js");

  var router = require("express").Router();

  // Create a new Propriedade
  router.post("/", propriedade.create);

  // Retrieve all Propriedades
  router.get("/", propriedade.findAll);


  // Retrieve a single Propriedade with id
  router.get("/:id", propriedade.findOne);

  // Update a Propriedade with id
  router.put("/:id", propriedade.update);

  // Delete a Propriedade with id
  router.delete("/:id", propriedade.delete);

  // Delete all Propriedades
  router.delete("/", propriedade.deleteAll);

  app.use('/api/propriedade', router);
};
