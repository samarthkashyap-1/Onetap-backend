const profileRoute = require('express').Router();
const Profile = require('../models/profile');
const User = require('../models/user');
const shortid = require("shortid");
profileRoute.get('/', async (req, res) => {
    const profiles = await Profile.find({});
    res.json(profiles);
});

profileRoute.get('/:id', async (req, res) => {
    const profile = await Profile.findOne({ id: req.params.id });
    if (profile) {
        res.json(profile);
    } else {
        res.status(404).end();
    }
}
);

profileRoute.patch("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Profile.findOneAndUpdate({ id: id }, body, { new: true }).then((result) => {
    res.json(result);
  });
});

profileRoute.post("/", (req, res) => {
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

module.exports = profileRoute;