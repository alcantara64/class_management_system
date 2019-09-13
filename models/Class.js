import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  student: {
    type: String
  },
  teacher: [
    {
      type: string
    }
  ]
});

export default mongoose.model("Class", ClassSchema);
