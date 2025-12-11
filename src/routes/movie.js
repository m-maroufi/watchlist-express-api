import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  return res.json({
    message: " welcome to movie wish list :)",
  });
});

export default router;
