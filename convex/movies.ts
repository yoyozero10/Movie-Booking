import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("movies").collect();
  },
});

export const get = query({
  args: { movieId: v.id("movies") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.movieId);
  },
});

export const addMovie = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    genre: v.string(),
    duration: v.number(),
    rating: v.string(),
    posterUrl: v.string(),
    releaseDate: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db.insert("movies", {
      title: args.title,
      description: args.description,
      genre: args.genre,
      duration: args.duration,
      rating: args.rating,
      posterUrl: args.posterUrl,
      releaseDate: args.releaseDate,
    });
  },
});
