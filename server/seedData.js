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
    posterUrl: "https://picsum.photos/seed/avengers-endgame/500/750",
    releaseDate: "2019-04-26"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    genre: "Sci-Fi, Thriller",
    duration: 148,
    rating: "PG-13",
    posterUrl: "https://picsum.photos/seed/inception/500/750",
    releaseDate: "2010-07-16"
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    genre: "Drama, Thriller",
    duration: 132,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/parasite/500/750",
    releaseDate: "2019-05-30"
  },
  {
    title: "The Grand Budapest Hotel",
    description: "A writer encounters the owner of an aging high-class hotel, who recounts his early years serving as the hotel's concierge.",
    genre: "Comedy, Drama",
    duration: 99,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/grand-budapest/500/750",
    releaseDate: "2014-03-28"
  },
  {
    title: "The Lion King",
    description: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    genre: "Animation",
    duration: 88,
    rating: "G",
    posterUrl: "https://picsum.photos/seed/lion-king/500/750",
    releaseDate: "2019-07-19"
  },
  {
    title: "Joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    genre: "Drama",
    duration: 122,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/joker/500/750",
    releaseDate: "2019-10-04"
  },
  {
    title: "Spider-Man: Far From Home",
    description: "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.",
    genre: "Action",
    duration: 129,
    rating: "PG-13",
    posterUrl: "https://picsum.photos/seed/spiderman-far-from-home/500/750",
    releaseDate: "2019-07-02"
  },
  {
    title: "Frozen II",
    description: "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.",
    genre: "Animation",
    duration: 103,
    rating: "PG",
    posterUrl: "https://picsum.photos/seed/frozen-2/500/750",
    releaseDate: "2019-11-22"
  }
  ,
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre: "Sci-Fi, Action",
    duration: 136,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/the-matrix/500/750",
    releaseDate: "1999-03-31"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi, Drama",
    duration: 169,
    rating: "PG-13",
    posterUrl: "https://picsum.photos/seed/interstellar/500/750",
    releaseDate: "2014-11-07"
  },
  {
    title: "Mad Max: Fury Road",
    description: "In a post-apocalyptic wasteland, Max helps a rebellious woman and a group of female prisoners flee from a tyrant.",
    genre: "Action, Adventure",
    duration: 120,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/mad-max-fury-road/500/750",
    releaseDate: "2015-05-15"
  },
  {
    title: "La La Land",
    description: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.",
    genre: "Musical, Romance",
    duration: 128,
    rating: "PG-13",
    posterUrl: "https://picsum.photos/seed/la-la-land/500/750",
    releaseDate: "2016-12-09"
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    duration: 142,
    rating: "R",
    posterUrl: "https://picsum.photos/seed/shawshank-redemption/500/750",
    releaseDate: "1994-09-23"
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

// We'll generate showtimes programmatically after movies/theaters are created

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

    // Programmatically create showtimes for each movie at each theater
    const showtimesData = [];
    const times = ["13:00", "16:00", "19:30"]; // daily times

    // generate next 3 days' dates in YYYY-MM-DD
    const daysToCreate = 3;
    const dates = [];
    for (let d = 0; d < daysToCreate; d++) {
      const dt = new Date();
      dt.setDate(dt.getDate() + d);
      const yyyy = dt.getFullYear();
      const mm = String(dt.getMonth() + 1).padStart(2, '0');
      const dd = String(dt.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
    }

    for (let mi = 0; mi < movies.length; mi++) {
      for (let ti = 0; ti < theaters.length; ti++) {
        for (const date of dates) {
          for (const startTime of times) {
            const price = 8 + (ti * 2) + (mi % 3); // simple varying price
            showtimesData.push({
              movieId: movies[mi]._id,
              theaterId: theaters[ti]._id,
              startTime,
              date,
              price,
              availableSeats: theaters[ti].totalSeats
            });
          }
        }
      }
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
