const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  status: {
    type: string,
    required: true,
    enum: {
      values: ["ignore", "interested", "accepted", "rejected"],
      message: "{VALUE} is incorrect status type",
    },
  },
},{timestamps:true});

const ConnectionRequest= new mongoose.model("ConnectionRequest",connectionRequestSchema,"ConnectionRequests");

module.exports=ConnectionRequest;
