const resetRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const saltRounds = 10

resetRouter.get("/:id/:token", async (req,res)=>{
 try {
    const {id , token } = req.params
    if(!id || !token) return res.status(400).send("invalid")
    const user = await User.findOne({id:id})
    if (!user) return res.status(400).send("invalid")
    // res.send(user)

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET + user.password
        const payload = jwt.verify(token,secret)
        res.send(payload)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

 } catch (error) {
    res.status(400)
 }
})

resetRouter.put("/:id/:token", async(req,res)=>{
    try {
      const { id, token } = req.params;
      const {password} = req.body 
      if (!id || !token) return res.status(400).send("invalid");
      const olduser = await User.findOne({ id: id });
      if (!olduser) return res.status(400).send("invalid");
    //   // res.send(user)

      try {
        const secret = process.env.ACCESS_TOKEN_SECRET + olduser.password;
        const payload = jwt.verify(token, secret);
        hashpass = await bcrypt.hash(password, saltRounds);
        const user = await User.findOneAndUpdate({id:id}, {
           password: hashpass,
         });

         if (!user) {
           return res.status(404).json({ message: "User not found" });
         }
        // user.password = hashpass
        // user.save()
        res.send(user)
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    } catch (error) {
      res.status(400);
    }
})


module.exports = resetRouter