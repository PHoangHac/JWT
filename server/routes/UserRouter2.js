import express from "express";
import authController from "../controllers/AuthCL.js";

const RouterYb = express.Router();

RouterYb.post("/signup", authController.registerUser).post(
  "/signin",
  authController.loginUser
);

// RouterYb.delete("/:id", DeleteUser).get("/:id", getOneUser);

export default RouterYb;
