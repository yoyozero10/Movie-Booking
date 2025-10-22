import mongoose from 'mongoose';
import Movie from './models/Movie.js';
import Theater from './models/Theater.js';
import Showtime from './models/Showtime.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sample data
const sampleMovies = [
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genre: "Action",
    duration: 181,
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    releaseDate: "2019-04-26"
  },
  {
    title: "The Lion King",
    description: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    genre: "Animation",
    duration: 88,
    rating: "G",
    posterUrl: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300&h=450&fit=crop",
    releaseDate: "2019-07-19"
  },
  {
    title: "Joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    genre: "Drama",
    duration: 122,
    rating: "R",
    posterUrl: "https://images.unsplash.com/photo-1489599735147-7f8a39c1ba1d?w=300&h=450&fit=crop",
    releaseDate: "2019-10-04"
  },
  {
    title: "Spider-Man: Far From Home",
    description: "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
    genre: "Action",
    duration: 129,
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop",
    releaseDate: "2019-07-02"
  },
  {
    title: "Frozen II",
    description: "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.",
    genre: "Animation",
    duration: 103,
    rating: "PG",
    posterUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    releaseDate: "2019-11-22"
  }
];

const sampleTheaters = [
  {
    name: "Cineplex Downtown",
    location: "123 Main Street, Downtown",
    totalSeats: 200
  },
  {
    name: "Mega Cinema Mall",
    location: "456 Shopping Mall, City Center",
    totalSeats: 300
  },
  {
    name: "Classic Theater",
    location: "789 Heritage District",
    totalSeats: 150
  }
];

const sampleShowtimes = [
  // Avengers: Endgame showtimes
  {
    movieId: null, // Will be set after movies are created
    theaterId: null, // Will be set after theaters are created
    startTime: "14:00",
    date: "2026-01-01",
    price: 12.50
  },
  {
    movieId: null,
    theaterId: null,
    startTime: "19:30",
    date: "2026-01-01",
    price: 15.00
  },
  {
    movieId: null,
    theaterId: null,
    startTime: "16:00",
    date: "2026-01-02",
    price: 12.50
  },
  // The Lion King showtimes
  {
    movieId: null,
    theaterId: null,
    startTime: "13:00",
    date: "2026-01-01",
    price: 10.00
  },
  {
    movieId: null,
    theaterId: null,
    startTime: "15:30",
    date: "2026-01-02",
    price: 10.00
  },
  // More showtimes...
];

// Seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

  // Connect to MongoDB (use fallback for local development)
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';
  await mongoose.connect(MONGODB_URI);
  console.log(`✅ Connected to MongoDB (${MONGODB_URI.startsWith('mongodb+srv') ? 'Atlas (SRV)' : 'standard'})`);

    // Clear existing data
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await Showtime.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert movies
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✅ Inserted ${movies.length} movies`);

    // Insert theaters
    const theaters = await Theater.insertMany(sampleTheaters);
    console.log(`✅ Inserted ${theaters.length} theaters`);

    // Create showtimes with references
    const showtimesData = [];
    for (let i = 0; i < sampleShowtimes.length; i++) {
      const movieIndex = i % movies.length;
      const theaterIndex = i % theaters.length;

      showtimesData.push({
        ...sampleShowtimes[i],
        movieId: movies[movieIndex]._id,
        theaterId: theaters[theaterIndex]._id,
        availableSeats: theaters[theaterIndex].totalSeats
      });
    }

    const showtimes = await Showtime.insertMany(showtimesData);
    console.log(`✅ Inserted ${showtimes.length} showtimes`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Movies: ${movies.length}`);
    console.log(`   Theaters: ${theaters.length}`);
    console.log(`   Showtimes: ${showtimes.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seed if this file is executed directly
import { fileURLToPath } from 'url';

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  // don't await here so the script can run as a standalone process
  seedDatabase();
}

export default seedDatabase;
