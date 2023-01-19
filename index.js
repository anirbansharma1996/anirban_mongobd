const express = require("express");
const { default: mongoose } = require("mongoose");
const Usermodel = require("./Models/user.model");
//////////////////////////////////////////////////////
require('dotenv').config()
const port = process.env.PORT ;
const jwt = require("jsonwebtoken");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("connect"));
///////////// SIGN UP ///////////////////
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
     const user = new Usermodel({ name, email, password });
     await user.save();
    //  await Usermodel.create({name, email, password})
     res.status(201).send("Signup Successful");
  } catch (error) {

    console.log(error.message);
     res.status(404).send(error);
  }
});
/////////////////////////////////////////////
app.get("/signup",async(req,res)=>{
    const user= await Usermodel.find()
    res.send(user)
})
//////////// LOGIN //////////////
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email, password });
    if (user) {
      let token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        "MINIMUM1234",
        {
          expiresIn: "7 Days",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        "MAXIMUM1234",
        {
          expiresIn: "28 days",
        }
      );
      return res
        .status(200)
        .send({ message: "Login successful", token, refreshToken });
    }
    return res.status(401).send("Try Again");
  });

//////////////////////////////////// https://mock-data-mongodb.onrender.com //////////////////////

const connect = async () => {
  return new mongoose.connect("mongodb+srv://anirban:anirban2022@cluster0.pdsxni8.mongodb.net/revision");
};
app.listen(port, async () => {
  await connect()
    .then(() => {
      console.log("connected with db");
    })
    .catch((err) => {
      console.log("not connected",err);
    });
  console.log("server started on 8080");
});
