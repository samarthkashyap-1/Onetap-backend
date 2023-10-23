const userRouter = require('express').Router();
const User = require('../models/user');
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const {signAccessToken, verifyAccessToken} = require('../helper/jwt_helper');

const saltRounds = 10;



userRouter.get('/', async (req, res) => {
   try {
     const users = await User.find({});
     res.json(users);
   } catch (error) {
    res.status(500).send("Internal Error")
   }
}
);

userRouter.post("/", async (req, res) => {


try {
    const body = req.body;
    const alreadyexist = await User.findOne({ email: body.email });
    if (alreadyexist) {
      return res.status(400).json({ error: "email already exists" });
    }

  hashpass = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    email: body.email,
    password: hashpass, 
    id: shortid.generate(),
  });
  
  result = await user.save();
  const accesstoken = await signAccessToken(result.id);

  result = {
    token:accesstoken,
    email: result.email,
  }
  res.status(201).json(result);
  console.log(user);
  
} catch (error) {
   console.error("User save error:", error);
      res.status(400).json({ error: error.message });
}
});





module.exports = userRouter;