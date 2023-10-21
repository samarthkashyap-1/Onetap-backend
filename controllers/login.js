const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const users = await User.find({ email: email, password: password });
  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = loginRouter;
