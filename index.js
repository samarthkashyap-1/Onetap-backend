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
const morgan = require("morgan");
const cors = require("cors");

const allowedOrigins = ['https://onetap-jet.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If you need to support cookies or other credentials
};

app.use(cors(corsOptions));
app.use(morgan("dev"))



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

app.get("/cronservice", (req, res) => {
    res.send("Hello World!")
}
)

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
