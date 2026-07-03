import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import app from "./app.js"



;((async() => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.on("error", (err) => {
      console.error("Express server error:", err);
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });


  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})());