const express = require("express")
const app = express()
const port = 3001
const mongoose = require("mongoose");
const password = encodeURIComponent("onetap@samarth");
app.use(express.json())
require("dotenv").config()
const cors = require("cors")
app.use(cors())

const shortid = require("shortid");

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

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  Cpassword: String,
  id: String,
});
const profileSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  email: String,
  links: [
    {
      platform: String,
      link: String,
      id: String,
    },
  ],
  card: Number,
  id: String,
});

const Profile = mongoose.model("Profile", profileSchema);

const User = mongoose.model("User", userSchema);


userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

profileSchema.set("toJSON", {
  transform: (doc, ret) => {
    
     
    ret.links = ret.links.map((link) => ({
      platform: link.platform,
      link: link.link,
      id: link.id,
    }));
    delete ret._id;
    delete ret.__v;
  },
});

// user.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// })





app.get("/user", (req, res) => {
      const id = req.params.id;
      User.find({}).then((note) => {
          res.json(note);
        });
      });

    app.get("/profiles", (req, res) => {
        const id = req.params.id;
        Profile.find({}).then((note) => {
            res.json(note);
        });
    }
)
    app.get("/profile/:id", (req, res) => {
        const id = req.params.id;
        Profile.find({id:id}).then((note) => {
            if(note.length>0){
                res.json(note);
            }
            else{
            res.status(404).send("Not Found");
            }
        }
    );
    }
)

app.patch("/profile/:id", (req, res) => {

    const id = req.params.id;
    const body = req.body;
    Profile.findOneAndUpdate({id:id},body,{new:true}).then((result) => {
        res.json(result);
    });
    }
    
)

        
app.post("/user", (req, res) => {
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


app.post("/profiles", (req, res) => {
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
    }
)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
)