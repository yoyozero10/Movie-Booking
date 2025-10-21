import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("theaters").collect();
  },
});

export const addTheater = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    totalSeats: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db.insert("theaters", {
      name: args.name,
      location: args.location,
      totalSeats: args.totalSeats,
    });
  },
});
