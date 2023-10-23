const profileRoute = require('express').Router();
const Profile = require('../models/profile');
const User = require('../models/user');
const shortid = require("shortid");

const {verifyAccessToken} = require("../helper/jwt_helper")


profileRoute.get('/', async (req, res) => {
    const profiles = await Profile.find({});
    res.json(profiles);
});


profileRoute.get("/user", verifyAccessToken,async (req, res) => {
  const users = await Profile.find({});
  res.json(users);
});




profileRoute.put("/:id",verifyAccessToken,async (req, res) => {
 try {
   const id = req.params.id;
   const body = req.body;
   const result = await Profile.findOneAndUpdate({ id: id }, body, { new: true })
   res.json(result)
  //  const user = await Profile.findOne({ id: id });
  //  console.log(user);
  //  res.send(user)
  
 } catch (error) {
  console.log(error)
 }
  
});


profileRoute.post("/", verifyAccessToken,async (req, res) => {
  const body = req.body;
  const profile = new Profile({
    username: body.username,
    avatar: body.avatar,
    email: body.email,
    links: body.links,
    card: body.card,
    id: shortid.generate(),
  });
  profile.save().then((result) => {
    console.log("profile saved!");
  });
  console.log(body);
  res.json(body);
});

// profileRoute.get("/secure", async (req, res)=>{
//   const users = await User.find({})
//   res.json(users)
// })





module.exports = profileRoute;