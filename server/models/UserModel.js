import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new mongoose.Schema({
  street: { type: String, require: true },
  code: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
});

const infomationSchema = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  identification: { type: String, require: true },
  gmail: { type: String, require: true },
  gender: { type: String, require: true },
});

const UserSchema = new Schema(
  {
    _id: { type: String, require: true }, // String is shorthand for {type: String}
    username: { type: String, require: true },
    password: { type: String, require: true },
    address: addressSchema,
    infomation: infomationSchema,
    role: { type: Schema.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
