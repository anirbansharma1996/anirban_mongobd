const { Schema, model } = require("mongoose");

const JobsSchema = new Schema({
  company: String,
  position: String,
  contract: String,
  location: String,
});
const Jobsmodel = model("jobs", JobsSchema);
module.exports = Jobsmodel;
