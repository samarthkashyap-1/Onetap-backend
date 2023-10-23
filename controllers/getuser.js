const userRouter = require('express').Router();
const Profile = require('../models/profile');
const {signAccessToken, verifyAccessToken} = require('../helper/jwt_helper');

userRouter.get('/:username', async (req, res) => {
   try {
     const profile = await Profile.findOne({ username: req.params.username });
     if (profile) {
       res.json(profile);
     } else {
       res.status(404).end();
     }
   } catch (error) {
        console.error("User login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
   }
}
);

module.exports = userRouter;