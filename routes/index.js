import express from "express";
const router = express.Router();
import AuthController from "../controller/auth.controller";

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
// #region authentication
router.post("/login", AuthController.signUp);

// #endregion
module.exports = router;
