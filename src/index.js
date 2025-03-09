import dotenv from "dotenv";
import express from "express";
import dbConnect from "./db/dbConnection.js";
import schoolRouter from "./routes/router.js";

const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());

app.use("/api/v1/schools", schoolRouter);

const port = process.env.PORT;
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.log("MySql connection failed !!!", err);
  });