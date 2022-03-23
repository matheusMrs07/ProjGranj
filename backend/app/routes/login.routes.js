module.exports = app => {
    const login = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all usuarios
    router.post("/login", login.get);
    router.get("/checkToken", login.checkToken);
    router.get("/destroyToken", login.destroyToken);
  
  
    app.use('/api', router);
  };