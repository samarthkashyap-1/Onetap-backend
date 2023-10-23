const contactRoute = require("express").Router()
const Contactus = require("../models/contactus")

contactRoute.post("/", async(req, res)=>{
  try {
      const data = new Contactus({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      await data.save()
      res.send("Successfully saved")
    
    
  } catch (error) {
    res,send(error)
  }
})

module.exports = contactRoute