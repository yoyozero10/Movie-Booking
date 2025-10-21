import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getBookedSeats = query({
  args: { showtimeId: v.id("showtimes") },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_showtime", (q) => q.eq("showtimeId", args.showtimeId))
      .filter((q) => q.eq(q.field("status"), "confirmed"))
      .collect();
    
    const bookedSeats = bookings.flatMap((booking) => booking.seats);
    return bookedSeats;
  },
});

export const myBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const showtime = await ctx.db.get(booking.showtimeId);
        if (!showtime) return null;
        
        const movie = await ctx.db.get(showtime.movieId);
        const theater = await ctx.db.get(showtime.theaterId);
        
        return {
          ...booking,
          showtime,
          movie,
          theater,
        };
      })
    );
    
    return bookingsWithDetails.filter((b) => b !== null);
  },
});

export const createBooking = mutation({
  args: {
    showtimeId: v.id("showtimes"),
    seats: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    const showtime = await ctx.db.get(args.showtimeId);
    if (!showtime) {
      throw new Error("Showtime not found");
    }
    
    // Check if seats are already booked
    const existingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_showtime", (q) => q.eq("showtimeId", args.showtimeId))
      .filter((q) => q.eq(q.field("status"), "confirmed"))
      .collect();
    
    const bookedSeats = existingBookings.flatMap((booking) => booking.seats);
    const conflictingSeats = args.seats.filter((seat) => bookedSeats.includes(seat));
    
    if (conflictingSeats.length > 0) {
      throw new Error(`Seats already booked: ${conflictingSeats.join(", ")}`);
    }
    
    const totalPrice = showtime.price * args.seats.length;
    
    return await ctx.db.insert("bookings", {
      userId,
      showtimeId: args.showtimeId,
      seats: args.seats,
      totalPrice,
      bookingDate: Date.now(),
      status: "confirmed",
    });
  },
});

export const cancelBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }
    
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    
    if (booking.userId !== userId) {
      throw new Error("Not authorized");
    }
    
    await ctx.db.patch(args.bookingId, { status: "cancelled" });
  },
});
