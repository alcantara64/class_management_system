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
  }
});

export default mongoose.model("Role", RoleSchema);
