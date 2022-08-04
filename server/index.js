import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const Port = process.env.PORT || 7070;

app.listen(Port, () => {
  console.log(`Server is running on : ${Port}`);
});
