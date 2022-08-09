import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectURL from "./config/ConnectDB.js";
import UserRouter from "./routes/UserRouter.js";
import UserRouter2 from "./routes/UserRouter2.js";
import RoleRouter from "./routes/RoleRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/server/user", UserRouter);
app.use("/server/role", RoleRouter);
app.use("/server/auth", UserRouter2);

const Port = process.env.PORT || 7070;

ConnectURL();

app.listen(Port, () => {
  console.log(`Server is running on : ${Port}`);
});
