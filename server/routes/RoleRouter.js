import express from "express";
import {
  getAllRole,
  getoneRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/RoleCL.js";

const Router = express.Router();

Router.get("/", getAllRole).post("/", createRole);

Router.put("/:id", updateRole)
  .delete("/:id", deleteRole)
  .get("/:id", getoneRole);

export default Router;
