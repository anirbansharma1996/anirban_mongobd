const express = require("express");
const { default: mongoose } = require("mongoose");
const Usermodel = require("./Models/user.model");
require("dotenv").config();
const port = process.env.PORT;
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const cors = require("cors");
const Jobsmodel = require("./Models/job.model");
const { query } = require("express");
//////////////////////////////////////////////////////
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("connect"));
///////////// SIGN UP ///////////////////
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await argon2.hash(password);
  try {
    const user = new Usermodel({ name, email, password: hash });
    await user.save();
    res.status(201).send({ Message: "Signup Successful", id: user._id });
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error);
  }
});

//////////// LOGIN //////////////
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Usermodel.findOne({ email });
  if (user) {
    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        "ANIRBAN1234",
        { expiresIn: "7 days" }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        "REFRESHTOKEN",
        { expiresIn: "28 days" }
      );
      return res.send({ message: "Login Successful", token, refreshToken });
    }
  }
  return res.status(401).send("Invalid User");
});

////////////////////// single-user-login ///////////////////
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  //------------------------------------------
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  //-----------------------------------------------
  try {
    const verification = jwt.verify(token, "ANIRBAN1234");
    if (verification) {
      const user = await Usermodel.findOne({ _id: id });
      return res.send(user);
    }
  } catch (e) {
    return res.send(e.message);
  }
});
app.post("/admin/postjobs", async (req, res) => {
  const { company, position, contract, location,ctc } = req.body;
  try {
    const jobs = new Jobsmodel({ company, position, contract, location ,ctc});
    await jobs.save();
    res.status(201).send({ message: "Job created Successfully", jobs });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//////////////////////////////////////////////////////////////
app.get("/admin/getjobs", async (req, res) => {
  try {
    const joblist = await Jobsmodel.find({});
    res.status(201).send(joblist);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//////////////////////////////////////////////////////
app.delete("/delete/:id", async (req, res) => {
   const {id}= req.params
  try {
    const joblist = await Jobsmodel.findByIdAndDelete({_id:id});
    res.status(201).send("deleted successfully");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.patch("/update/:id", async (req, res) => {
  const {id}= req.params
  const {ctc}=req.body
 try {
   const joblist = await Jobsmodel.findByIdAndUpdate({_id:id},{ctc});
   res.status(201).send(joblist);
 } catch (error) {
   res.status(404).send(error.message);
 }
});
app.post("/logout", async (req, res) => {
  const token = req.headers.authorization;
  blacklist.push(token);
  return res.send("Logout Successfully");
});


//////////////////////////////////// https://mock-data-mongodb.onrender.com //////////////////////

const connect = async () => {
  return new mongoose.connect(
    "mongodb+srv://anirban:anirban2022@cluster0.pdsxni8.mongodb.net/revision"
  );
};
app.listen(port, async () => {
  await connect()
    .then(() => {
      console.log("connected with db");
    })
    .catch((err) => {
      console.log("not connected", err);
    });
  console.log("server started on 8080");
});
