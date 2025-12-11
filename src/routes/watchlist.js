import express from "express";
import {
  addToWatchList,
  deleteWatchlist,
  updateWatchlistItem,
} from "../controllers/watchList.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { addWatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", validateRequest(addWatchlistSchema), addToWatchList);
router.delete("/:id", deleteWatchlist);
router.put("/:id", updateWatchlistItem);
export default router;
