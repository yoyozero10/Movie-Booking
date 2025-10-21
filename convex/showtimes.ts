import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByMovie = query({
  args: { movieId: v.id("movies") },
  handler: async (ctx, args) => {
    const showtimes = await ctx.db
      .query("showtimes")
      .withIndex("by_movie", (q) => q.eq("movieId", args.movieId))
      .collect();
    
    const showtimesWithDetails = await Promise.all(
      showtimes.map(async (showtime) => {
        const theater = await ctx.db.get(showtime.theaterId);
        return {
          ...showtime,
          theater,
        };
      })
    );
    
    return showtimesWithDetails;
  },
});

export const get = query({
  args: { showtimeId: v.id("showtimes") },
  handler: async (ctx, args) => {
    const showtime = await ctx.db.get(args.showtimeId);
    if (!showtime) return null;
    
    const theater = await ctx.db.get(showtime.theaterId);
    const movie = await ctx.db.get(showtime.movieId);
    
    return {
      ...showtime,
      theater,
      movie,
    };
  },
});

export const addShowtime = mutation({
  args: {
    movieId: v.id("movies"),
    theaterId: v.id("theaters"),
    startTime: v.string(),
    date: v.string(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db.insert("showtimes", {
      movieId: args.movieId,
      theaterId: args.theaterId,
      startTime: args.startTime,
      date: args.date,
      price: args.price,
    });
  },
});
