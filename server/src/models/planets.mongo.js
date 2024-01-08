const mongoose = require("mongoose");

// const planetSchema = new mongoose.Schema({
//   keplerName: {
//     type: "string",
//     required: true,
//   },
// });

// module.exports = mongoose.model("Planet", planetSchema);

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
  image: String, // Field to store base64-encoded image
});
module.exports = mongoose.model("Planet", planetSchema);
