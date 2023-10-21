const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  Cpassword: String,
  id: String,
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
    });

module.exports = User;