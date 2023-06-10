import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import auth from "./routes/auth.route.js";
import question from "./routes/question.route.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
  
const PORT = process.env.PORT || 5000;
// const URI = "mongodb+srv://learn_mongo:123456789asdf@cluster0.ex784n3.mongodb.net/test?retryWrites=true&w=majority";
const URI = process.env.DATABASE_URL;
app.use("/api", auth);
app.use("/api", question);

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
