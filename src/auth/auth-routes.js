const { Router } = require("express");
const {
  LoginFunction,
  SignUpAuth,
  SignUpAuth2,
  RequestOtp,
  verifyOtp,
  nameUpdateFunction,
} = require("./auth-controller");
const routes = Router();

routes.post("/login", LoginFunction);
routes.post("/register", SignUpAuth);
routes.post("/register2", SignUpAuth2);
routes.post("/request-otp", RequestOtp);
routes.post("/verify-otp", verifyOtp);
routes.post("/update-name", nameUpdateFunction);

module.exports = routes;
