const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require("bcrypt");
const {signAccessToken, verifyAccessToken} = require('../helper/jwt_helper');
const jwt = require("jsonwebtoken")

const transporter = require("../config/nodemail")



loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    // console.log(user);
    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
      const accesstoken = await signAccessToken(user.id);
      const result = {
        token:accesstoken,
        email: user.email,
      }
      res.json(result);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("User login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


loginRouter.post("/forgotpassword",async (req,res)=>{
 try {
  
   const {email} = req.body

  if(!email) return res.status(400).send("Email is not valid")
  const user= await User.findOne({email:email})
  if (!user) return res.status(404).send("Email is not registered")
  const payload={
email: user.email,
id: user.id
}
const secret = process.env.ACCESS_TOKEN_SECRET + user.password; 
  const resettoken = jwt.sign(payload,secret,{
    expiresIn: "15m"
  });

  const encode = encodeURIComponent(resettoken)
 
  const link = `https://onetap-jet.vercel.app/resetpassword/${user.id}/${encode}`;

 var mailOptions = {
   from: `ONETAP <pressfishere@gmail.com>`,
   to: `${user.email}`,
   subject: "Password Reset Link",
   html: `<h1>Password Reset for ONETAP account</h1> <span>To change password</span>
   <a href=${link} >Click here </a>  
   <p>Link will be valid for 10 minutes only</p>
   `,
 };

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error:", error);
    return res.status(500).send("Internal Error");
  } else {
    console.log("Email sent: " + info.response);
    return res.status(200).send("Email sent successfully");
  }
});



 } catch (error) {
  console.log(error)
 }
})


module.exports = loginRouter;
