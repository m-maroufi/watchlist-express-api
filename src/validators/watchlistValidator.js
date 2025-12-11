import { z } from "zod";

export const addWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      errorMap: () => ({
        message: `status must be one of : "PLANNED", "WATCHING", "COMPLETED", "DROPPED"`,
      }),
    })
    .optional(),
  rating: z
    .preprocess(
      (val) => {
        // اگر رشته خالی اومد، به undefined تبدیل کن تا optional حفظ بشه
        if (typeof val === "string") {
          const s = val.trim();
          if (s === "") return undefined;
          const n = Number(s);
          return Number.isNaN(n) ? val : n;
        }
        return val;
      },
      z
        .number({
          invalid_type_error: "rating must be a number",
        })
        .int("rating must be integer")
        .min(1, "rating must be between 1 and 10")
        .max(10, "rating must be between 1 and 10")
    )
    .optional(),
  note: z.string().optional(),
});
