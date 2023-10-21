const express = require("express")
const app = express()
const port = 3001
const mongoose = require("mongoose");
const users = require("./controllers/users")
const profiles = require("./controllers/profiles") 
const login = require("./controllers/login")
 const router = express.Router()
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


// user.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// })





// app.get("/user", (req, res) => {
//       const id = req.params.id;
//       User.find({}).then((note) => {
//           res.json(note);
//         });
//       });

//     app.get("/profiles", (req, res) => {
//         const id = req.params.id;
//         Profile.find({}).then((note) => {
//             res.json(note);
//         });
//     }
// )
//     app.get("/profile/:id", (req, res) => {
//         const id = req.params.id;
//         Profile.find({id:id}).then((note) => {
//             if(note.length>0){
//                 res.json(note);
//             }
//             else{
//             res.status(404).send("Not Found");
//             }
//         }
//     );
//     }
// )

// app.patch("/profiles/:id", (req, res) => {

//     const id = req.params.id;
//     const body = req.body;
//     Profile.findOneAndUpdate({id:id},body,{new:true}).then((result) => {
//         res.json(result);
//     });
//     }
    
// )

        
// app.post("/user", (req, res) => {
//   const body = req.body;
//   const user = new User({
//     name: body.name,
//     email: body.email,
//     password: body.password,
//     Cpassword: body.Cpassword,
//     id: shortid.generate(),
//   });

//   user
//     .save()
//     .then((result) => {
//       console.log("User saved!");
//       res.json(result);
//     })
//     .catch((err) => {
//       console.error("User save error:", err);
//       res.status(400).json({ error: err.message }); // Return the error message
//     });
// });


// app.post("/profiles", (req, res) => {
//     const body = req.body;
//     const profile = new Profile({
//         username: body.username,
//         avatar: body.avatar,
//         email: body.email,
//         links: body.links,
//         card: body.card,
//         id: shortid.generate(),
//     });
//     profile.save().then((result) => {
//         console.log("profile saved!");
//     });
//     console.log(body);
//     res.json(body);
//     }
// )



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)