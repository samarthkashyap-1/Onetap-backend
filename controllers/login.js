const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("User login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = loginRouter;
