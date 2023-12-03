import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import authRoute from "./routes/auth.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello server");
});


// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};



app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  connectDB();
  console.log("server listening on port" + port);
});
