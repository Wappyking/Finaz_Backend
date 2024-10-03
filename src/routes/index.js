const { Router } = require("express");
const routes = Router();

routes.use("/auth", require("../auth/auth-routes"));

routes.use("/maths", require("../maths/math-routes"));
routes.use("/transaction", require("../transaction/transaction-routes"));
routes.use("/notification", require("../notification/notification-routes"));
routes.use("/user", require("../user/user-routes"));

module.exports = routes;
