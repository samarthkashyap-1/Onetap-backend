const userRouter = require('express').Router();
const User = require('../models/user');
const shortid = require("shortid");

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
}
);

userRouter.post("/", (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    Cpassword: body.Cpassword,
    id: shortid.generate(),
  });

  user
    .save()
    .then((result) => {
      console.log("User saved!");
      res.json(result);
    })
    .catch((err) => {
      console.error("User save error:", err);
      res.status(400).json({ error: err.message }); // Return the error message
    });
});





module.exports = userRouter;