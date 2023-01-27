const { model, Schema } = require("mongoose");

const PlaySchema = new Schema({
  name: String,
  score: {
    total: 0,
    scores: [],
  },
});
const PlayModel = model("mock14", PlaySchema);
module.exports = PlayModel;
