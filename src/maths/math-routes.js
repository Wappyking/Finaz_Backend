const { Router } = require("express");
const { Add, Subtract, Multiply, Divide } = require("./math-controller");
const routes = Router();

routes.post("/add", Add);
routes.post("/subtract", Subtract);
routes.post("/multiply", Multiply);
routes.post("/divide", Divide);

module.exports = routes;
