import UserYB from "../models/UserYoutube.js";
import mongoose from "mongoose";

export const getAllUser = async (req, res) => {
  try {
    const all = await UserYB.find();
    if (typeof all !== "undefined" && all.length === 0)
      return res.status(400).json({ msg: `Can't find data !` });
    res.status(200).json({ all });
  } catch (err) {
    console.log({ msg: err });
  }
};

export const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const one = await UserYB.findById(userId);
      return res.status(200).json({ one });
    } else {
      return res.status(400).json({ msg: `This Id: '${userId}' not valid` });
    }
  } catch (err) {
    console.log({ msg: err });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const newuser = new User({
      ...req.body,
    });
    const result = await newuser.save();
    return res.status(200).json(`user has been create !`);
  } catch (err) {
    console.log({ msg: err });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const all = await UserYB.find();
    if (all === null || all === undefined)
      return res.status(400).json({ msg: `can't find any thing !` });
    res.status(200).json({ all });
  } catch (err) {
    console.log({ msg: err });
  }
};

export const DeleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const deleteUser = await UserYB.findByIdAndDelete(userId);
      return res.status(200).json({ msg: `Delete user successfull !` });
    } else {
      return res.status(400).json({ msg: `This Id: '${userId}' not valid` });
    }
  } catch (err) {
    console.log({ msg: err });
  }
};
