import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import fileUpload from "express-fileupload";
import cors from "cors";
const app = express();
app.use(cors());

import { clerkMiddleware } from "@clerk/express";

//routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

import { connectDb } from "./lib/db.js";
const __dirname = path.resolve();

app.use(clerkMiddleware()); // this will add auth to req.auth
app.use(express.json()); // parse req body
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"), // stores temp files in something like this C:\Users\as125\OneDrive\Desktop\Projects\BetterSpotify\backend\tmp
    createParentPath: true,
    limits: { fileSize: 15 * 1024 * 1024 }, //15 mb limit
  })
); // add req.files when file is uploaded

const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);
console.log(path.join(__dirname, "../frontend/dist")); //C:\Users\as125\OneDrive\Desktop\Projects\BetterSpotify\frontend\dist
console.log("Serving static from:", path.join(__dirname, "../frontend/dist"));
console.log(
  "Sending index.html from:",
  path.resolve(__dirname, "../frontend", "dist", "index.html")
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

//error handler
app.use((err, req, res, next) => {
  console.log("error", err);
  res.status(500).json({
    messagge:
      process.env.NODE_ENV == "production"
        ? "Internal Server Error"
        : err.messagge,
  });
});

app.listen(PORT, () => {
  console.log("App is Listeninng on port :" + PORT);
});
connectDb();
