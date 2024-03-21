var mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema({
  dId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const UserToken = mongoose.model("DoctorToken", TokenSchema);

module.exports = UserToken;