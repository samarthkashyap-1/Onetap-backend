const express = require("express")
const app = express()
const port = 3001
const mongoose = require("mongoose");
const users = require("./controllers/users")
const profiles = require("./controllers/profiles") 
const login = require("./controllers/login")
const userRouter = require("./controllers/getuser")
const resetPass = require("./controllers/resetpass")
const Contactus = require("./controllers/contactus")
app.use(express.json())
require("dotenv").config()
const cors = require("cors")
app.use(cors())



const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false)
mongoose
  .connect(url)
  .then(() => {
   console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });


const Mymiddleware = (req, res, next) => {

    next();
}


app.use(Mymiddleware)
app.use("/user", users)
app.use("/profiles", profiles)
app.use("/login", login)
app.use("/",userRouter)
app.use("/resetpassword",resetPass)
app.use("/contactus", Contactus)





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)