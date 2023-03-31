const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;
exports.register = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.userId||
      !req.body.password 
    ) {
      return res
        .status(400)
        .send({ message: "Name, email,userId and password are required" });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      userId: req.body.userId,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await user.save();
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ message: "Email already exists" });
    }
    console.log(err);
    return res.status(500).send({ message: "some internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      if (!isMatch) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user._id, name: user.name }, secret, {
        expiresIn: "1h",
      });
      res.send({ message: "Login User successful!", token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "some internal server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Token is missing and some error" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token some error" });
      }
      req.userId = decoded.id;
      req.name=decoded.name;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "some internal server error" });
  }
};
