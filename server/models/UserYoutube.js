import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 50,
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserYB", UserSchema);
