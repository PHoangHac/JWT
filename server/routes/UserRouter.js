import express from "express";
import authController from "../controllers/AuthCL.js";
import {
  getAllUser,
  getOneUser,
  // CreateUser,
  DeleteUser,
} from "../controllers/UserCL.js";
import middlewaresController from "../middlewares/middleware.js";

const Router = express.Router();

Router.get("/", middlewaresController.verifyToken, getAllUser)
  .post("/refresh", authController.requestRefreshToken)
  .post(
    "/logout",
    middlewaresController.verifyToken,
    authController.userLogout
  );

Router.delete(
  "/:id",
  middlewaresController.verifyTokenAndAdminAuth,
  DeleteUser
).get("/:id", getOneUser);

export default Router;
