import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if data already exists
    const existingMovies = await ctx.db.query("movies").collect();
    if (existingMovies.length > 0) {
      return { message: "Data already exists" };
    }

    // Add theaters
    const theater1 = await ctx.db.insert("theaters", {
      name: "Grand Cinema",
      location: "Downtown Plaza",
      totalSeats: 80,
    });

    const theater2 = await ctx.db.insert("theaters", {
      name: "Starlight Theater",
      location: "Westside Mall",
      totalSeats: 80,
    });

    const theater3 = await ctx.db.insert("theaters", {
      name: "Royal Cineplex",
      location: "City Center",
      totalSeats: 80,
    });

    // Add movies
    const movie1 = await ctx.db.insert("movies", {
      title: "The Quantum Paradox",
      description: "A mind-bending sci-fi thriller about a physicist who discovers a way to manipulate time, but each change creates dangerous ripples across reality.",
      genre: "Sci-Fi",
      duration: 142,
      rating: "PG-13",
      posterUrl: "",
      releaseDate: "2024-03-15",
    });

    const movie2 = await ctx.db.insert("movies", {
      title: "Echoes of Tomorrow",
      description: "In a dystopian future, a group of rebels fights against an AI-controlled government to restore human freedom and dignity.",
      genre: "Action",
      duration: 128,
      rating: "R",
      posterUrl: "",
      releaseDate: "2024-03-20",
    });

    const movie3 = await ctx.db.insert("movies", {
      title: "Moonlight Serenade",
      description: "A heartwarming romantic drama about two musicians who find love while competing in an international music competition.",
      genre: "Romance",
      duration: 115,
      rating: "PG",
      posterUrl: "",
      releaseDate: "2024-03-10",
    });

    const movie4 = await ctx.db.insert("movies", {
      title: "The Last Guardian",
      description: "An epic fantasy adventure following a young warrior's quest to protect the last dragon from those who seek to exploit its power.",
      genre: "Fantasy",
      duration: 156,
      rating: "PG-13",
      posterUrl: "",
      releaseDate: "2024-03-25",
    });

    const movie5 = await ctx.db.insert("movies", {
      title: "Laugh Out Loud",
      description: "A hilarious comedy about a struggling comedian who accidentally becomes an internet sensation after a disastrous performance goes viral.",
      genre: "Comedy",
      duration: 98,
      rating: "PG-13",
      posterUrl: "",
      releaseDate: "2024-03-18",
    });

    const movie6 = await ctx.db.insert("movies", {
      title: "Dark Waters",
      description: "A gripping horror thriller about a marine biologist who discovers a terrifying secret lurking in the depths of the ocean.",
      genre: "Horror",
      duration: 105,
      rating: "R",
      posterUrl: "",
      releaseDate: "2024-03-22",
    });

    // Add showtimes for today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    const todayStr = formatDate(today);
    const tomorrowStr = formatDate(tomorrow);

    // Showtimes for The Quantum Paradox
    await ctx.db.insert("showtimes", {
      movieId: movie1,
      theaterId: theater1,
      startTime: "2:00 PM",
      date: todayStr,
      price: 12.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie1,
      theaterId: theater1,
      startTime: "5:30 PM",
      date: todayStr,
      price: 14.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie1,
      theaterId: theater2,
      startTime: "7:00 PM",
      date: todayStr,
      price: 13.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie1,
      theaterId: theater1,
      startTime: "3:00 PM",
      date: tomorrowStr,
      price: 12.99,
    });

    // Showtimes for Echoes of Tomorrow
    await ctx.db.insert("showtimes", {
      movieId: movie2,
      theaterId: theater2,
      startTime: "1:30 PM",
      date: todayStr,
      price: 13.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie2,
      theaterId: theater3,
      startTime: "4:00 PM",
      date: todayStr,
      price: 14.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie2,
      theaterId: theater2,
      startTime: "8:30 PM",
      date: todayStr,
      price: 15.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie2,
      theaterId: theater3,
      startTime: "6:00 PM",
      date: tomorrowStr,
      price: 14.99,
    });

    // Showtimes for Moonlight Serenade
    await ctx.db.insert("showtimes", {
      movieId: movie3,
      theaterId: theater1,
      startTime: "12:00 PM",
      date: todayStr,
      price: 11.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie3,
      theaterId: theater3,
      startTime: "2:30 PM",
      date: todayStr,
      price: 12.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie3,
      theaterId: theater1,
      startTime: "5:00 PM",
      date: tomorrowStr,
      price: 11.99,
    });

    // Showtimes for The Last Guardian
    await ctx.db.insert("showtimes", {
      movieId: movie4,
      theaterId: theater2,
      startTime: "3:30 PM",
      date: todayStr,
      price: 15.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie4,
      theaterId: theater3,
      startTime: "6:30 PM",
      date: todayStr,
      price: 16.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie4,
      theaterId: theater2,
      startTime: "4:30 PM",
      date: tomorrowStr,
      price: 15.99,
    });

    // Showtimes for Laugh Out Loud
    await ctx.db.insert("showtimes", {
      movieId: movie5,
      theaterId: theater1,
      startTime: "1:00 PM",
      date: todayStr,
      price: 10.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie5,
      theaterId: theater3,
      startTime: "7:30 PM",
      date: todayStr,
      price: 12.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie5,
      theaterId: theater1,
      startTime: "8:00 PM",
      date: tomorrowStr,
      price: 11.99,
    });

    // Showtimes for Dark Waters
    await ctx.db.insert("showtimes", {
      movieId: movie6,
      theaterId: theater2,
      startTime: "9:00 PM",
      date: todayStr,
      price: 13.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie6,
      theaterId: theater3,
      startTime: "9:30 PM",
      date: todayStr,
      price: 14.99,
    });

    await ctx.db.insert("showtimes", {
      movieId: movie6,
      theaterId: theater2,
      startTime: "10:00 PM",
      date: tomorrowStr,
      price: 13.99,
    });

    return {
      message: "Sample data loaded successfully! 🎬",
      counts: {
        movies: 6,
        theaters: 3,
        showtimes: 24,
      },
    };
  },
});
