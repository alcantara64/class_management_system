import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  _permissions: {
    type: [
      {
        type: String
      }
    ]
  }
});

export default mongoose.model("Role", RoleSchema);
