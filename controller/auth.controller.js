import config from "../config/db";
import User from "../models/User";
const jwt = require("jsonwebtoken");

class Auth {
  signUp(req, res) {
    const { email, password, lastName, firstName, type } = req.body;
    if (!email || !password) {
      res.json({ success: false, msg: "Please pass username and password." });
    } else {
      var newUser = new User({
        lastName: lastName,
        firstName: firstName,
        email: email,
        type: type,
        password: password
      });
      // save the user
      newUser.save(err => {
        if (err) {
          res.status(400).send({
            error: err
          });
          return res.json({ success: false, msg: err });
        }
        res.json({ success: true, msg: "Successful created new user." });
      });
    }
  }
  signIn(req, res) {
    const { email, password } = req.body;
    User.findOne(
      {
        email: email
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. User not found."
          });
        } else {
          // check if password matches
          user.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: "30m"
              });
              // return the information including token as JSON
              res.json({ success: true, token: "JWT " + token });
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  }
}

export default new Auth();
