const express = require("express");
const { default: mongoose } = require("mongoose");
const Usermodel = require("./Models/user.model");
//////////////////////////////////////////////////////
require('dotenv').config()
const port = process.env.PORT ;
const MONGOURL = process.env.MONGOURL;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("hello"));
///////////// SIGN UP ///////////////////
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new Usermodel({ name, email, password });
    await user.save();
    return res.status(201).send("Signup Successful");
  } catch (error) {
    console.log(error.message);
    return res.status(404).send(error.message);
  }
});
app.get("/signup",async(req,res)=>{
    const user= await Usermodel.find()
    res.send(user)
})


//////////// LOGIN //////////////
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const present = await Usermodel.findOne({ email, password });
    if (present) {
      return res.status(201).send({ message: "login Successful", present });
    } else {
      return res.status(404).send("Signup First");
    }
  } catch (error) {
    console.log(error);
    res.send("Invalid Information");
  }
});

////////////////////////////////////https://mock-data-mongodb.onrender.com//////////////////////
const connect = async () => {
  return new mongoose.connect(MONGOURL);
};
app.listen(port, async () => {
  await connect()
    .then(() => {
      console.log("connected with db");
    })
    .catch((err) => {
      console.log("not connected");
    });
  console.log("server started on 8080");
});
