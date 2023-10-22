const userRouter = require('express').Router();
const User = require('../models/user');
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const saltRounds = 10;



userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
}
);

userRouter.post("/", async (req, res) => {
try {
    const body = req.body;

  hashpass = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    email: body.email,
    password: hashpass, 
    id: shortid.generate(),
  });
  
  result = await user.save();
  res.status(201).json(result);
  console.log(user);
  
} catch (error) {
   console.error("User save error:", err);
      res.status(400).json({ error: err.message });
}

});





module.exports = userRouter;