import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  movies: defineTable({
    title: v.string(),
    description: v.string(),
    genre: v.string(),
    duration: v.number(), // in minutes
    rating: v.string(),
    posterUrl: v.string(),
    releaseDate: v.string(),
  }),
  
  theaters: defineTable({
    name: v.string(),
    location: v.string(),
    totalSeats: v.number(),
  }),
  
  showtimes: defineTable({
    movieId: v.id("movies"),
    theaterId: v.id("theaters"),
    startTime: v.string(),
    date: v.string(),
    price: v.number(),
  })
    .index("by_movie", ["movieId"])
    .index("by_theater", ["theaterId"])
    .index("by_date", ["date"]),
  
  bookings: defineTable({
    userId: v.id("users"),
    showtimeId: v.id("showtimes"),
    seats: v.array(v.string()),
    totalPrice: v.number(),
    bookingDate: v.number(),
    status: v.string(), // "confirmed", "cancelled"
  })
    .index("by_user", ["userId"])
    .index("by_showtime", ["showtimeId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
