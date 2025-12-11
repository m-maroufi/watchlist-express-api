import { config } from "dotenv";
import express from "express";

import { connectDB, disconnectDB } from "./config/db.js";

import authRouter from "./routes/auth.js";
import movieRouter from "./routes/movie.js";
import watchlistRouter from "./routes/watchlist.js";

const app = express();
config();
connectDB();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(movieRouter);
app.use("/auth", authRouter);
app.use("/watchlist", watchlistRouter);

const server = app.listen(PORT, () => {
  console.log(`server running in http://localhost:3000/`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error unhandledRejection:  ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("uncaughtException", async (err) => {
  console.error(`Error uncaughtException:  ${err.message}`);
  await disconnectDB();
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
