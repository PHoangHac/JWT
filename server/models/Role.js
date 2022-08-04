import mongoose from "mongoose";
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    _id: { type: String, require: true }, // String is shorthand for {type: String}
    ket: { type: Number, require: true },
    rolename: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
