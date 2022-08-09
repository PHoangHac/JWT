import mongoose from "mongoose";
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    key: { type: Number, require: true },
    rolename: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Role", RoleSchema);
