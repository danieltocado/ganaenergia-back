const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User.js");

const UserController = {

  async register(req, res) {
    try {
      const hash = await bcrypt.hash(req.body.password, 8);
      req.body.password = hash;

      const user = await User.create(req.body);
      res.send({
        user,
        message: "User created succesfull.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Problem creating user.",
        error,
      });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
        
      });

      if (!user) {
        return res.status(400).send({
          message: "Wrong credentials.",
        });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({
          message: "Wrong credentials!",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "SECRET"
      );

      await User.findByIdAndUpdate(user._id, {
        $push: {
          tokens: token,
        },
      });

      res.send({
        message: "Login succesfull.",
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Problem logging in.",
        error,
      });
    }
  },

  async logout(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          tokens: req.headers.authorization,
        },
      });

      res.send({message: "Te has deslogeado con éxito.", user});
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un error al deslogear el usuario.",
        error,
      });
    }
  },

}

module.exports = UserController;