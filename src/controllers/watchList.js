import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, note } = req.body;
  // verify movie exist

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({
      error: "movie not found :(",
    });
  }
  // check already added
  const existingInWatchList = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchList) {
    return res.status(400).json({
      error: "movie already in the watchlist.",
    });
  }
  //   add movie in watchlist
  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId: movieId,
      status: status || "PLANNED",
      rating: rating,
      note: note,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

const deleteWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchlistItem) {
    res.status(404).json({
      error: "watchlist item not found",
    });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};
/**
 * Update watchlist item
 * Updates status, rating, or notes
 * Ensures only owner can update
 * Requires protect middleware
 */
const updateWatchlistItem = async (req, res) => {
  const { status, rating, note } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (note !== undefined) updateData.note = note;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};
export { addToWatchList, deleteWatchlist, updateWatchlistItem };
