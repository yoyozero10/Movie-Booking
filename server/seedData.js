import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

// Define Schema inline to avoid import issues
const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    duration: Number,
    rating: Number,
    posterUrl: String,
    releaseDate: Date,
    trailerUrl: String,
    director: String,
    cast: [String]
});

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    city: {
        type: String,
        default: "TP. Hồ Chí Minh",
        trim: true
    },
    totalSeats: {
        type: Number,
        required: true,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const showtimeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    startTime: { type: String, required: true }, // Format: "HH:mm"
    date: { type: String, required: true }, // Format: "YYYY-MM-DD"
    price: { type: Number, required: true, min: 0 },
    availableSeats: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
const Theater = mongoose.models.Theater || mongoose.model('Theater', theaterSchema);
const Showtime = mongoose.models.Showtime || mongoose.model('Showtime', showtimeSchema);

const movies = [
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        genre: "Sci-Fi",
        duration: 148,
        rating: 8.8,
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7admal4zlWH9uPE5q64yKtS.jpg",
        releaseDate: new Date("2010-07-16"),
        trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action",
        duration: 152,
        rating: 9.0,
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        releaseDate: new Date("2008-07-18"),
        trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genre: "Sci-Fi",
        duration: 169,
        rating: 8.6,
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        releaseDate: new Date("2014-11-07"),
        trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        duration: 142,
        rating: 9.3,
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        releaseDate: new Date("1994-09-23"),
        trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
        director: "Frank Darabont",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        genre: "Crime",
        duration: 154,
        rating: 8.9,
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        releaseDate: new Date("1994-10-14"),
        trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    },
    {
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        genre: "Sci-Fi",
        duration: 136,
        rating: 8.7,
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        releaseDate: new Date("1999-03-31"),
        trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
        director: "Lana Wachowski, Lilly Wachowski",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    },
    {
        title: "Forrest Gump",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
        genre: "Drama",
        duration: 142,
        rating: 8.8,
        posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        releaseDate: new Date("1994-07-06"),
        trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
        director: "Robert Zemeckis",
        cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
    },
    {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime",
        duration: 175,
        rating: 9.2,
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        releaseDate: new Date("1972-03-24"),
        trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"]
    },
    {
        title: "Parasite",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        genre: "Thriller",
        duration: 132,
        rating: 8.6,
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        releaseDate: new Date("2019-05-30"),
        trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        director: "Bong Joon-ho",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
    },
    {
        title: "Avengers: Endgame",
        description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        genre: "Action",
        duration: 181,
        rating: 8.4,
        posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        releaseDate: new Date("2019-04-26"),
        trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        director: "Anthony Russo, Joe Russo",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
    },
    {
        title: "Joker",
        description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
        genre: "Drama",
        duration: 122,
        rating: 8.4,
        posterUrl: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        releaseDate: new Date("2019-10-04"),
        trailerUrl: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
        director: "Todd Phillips",
        cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"]
    },
    {
        title: "Spider-Man: No Way Home",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
        genre: "Action",
        duration: 148,
        rating: 8.3,
        posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        releaseDate: new Date("2021-12-17"),
        trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
        director: "Jon Watts",
        cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"]
    }
];

const theaters = [
    {
        name: "CinemaVision Pro - Vincom Center",
        location: "72 Lê Thánh Tôn, Bến Nghé, Quận 1",
        region: "Quận 1",
        city: "TP. Hồ Chí Minh",
        totalSeats: 800
    },
    {
        name: "CinemaVision Pro - Crescent Mall",
        location: "101 Tôn Dật Tiên, Tân Phú, Quận 7",
        region: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalSeats: 650
    },
    {
        name: "CinemaVision Pro - Landmark 81",
        location: "720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh",
        region: "Bình Thạnh",
        city: "TP. Hồ Chí Minh",
        totalSeats: 900
    },
    {
        name: "CinemaVision Pro - Aeon Mall Tân Phú",
        location: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
        region: "Tân Phú",
        city: "TP. Hồ Chí Minh",
        totalSeats: 700
    },
    {
        name: "CinemaVision Pro - Gigamall Thủ Đức",
        location: "240-242 Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức",
        region: "Thủ Đức",
        city: "TP. Hồ Chí Minh",
        totalSeats: 750
    },
    {
        name: "CinemaVision Pro - Nowzone",
        location: "235 Nguyễn Văn Cừ, Nguyễn Cư Trinh, Quận 1",
        region: "Quận 1",
        city: "TP. Hồ Chí Minh",
        totalSeats: 600
    },
    {
        name: "CinemaVision Pro - Vivo City",
        location: "1058 Nguyễn Văn Linh, Tân Phong, Quận 7",
        region: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalSeats: 850
    },
    {
        name: "CinemaVision Pro - SC VivoCity",
        location: "1078 Nguyễn Văn Linh, Tân Phú, Quận 7",
        region: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalSeats: 720
    }
];

// Helper function to create showtimes for a movie
function createShowtimes(movieId, movieDuration, theatersList) {
    const showtimes = [];
    const today = new Date();

    // Create showtimes for the next 7 days
    for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() + day);

        // Format date as YYYY-MM-DD
        const dateStr = date.toISOString().split('T')[0];

        // Create showtimes at different theaters
        const times = ['10:00', '13:30', '16:00', '19:00', '21:30'];

        // Each movie shows at 2-3 random theaters per day
        const numTheaters = 2 + Math.floor(Math.random() * 2); // 2 or 3 theaters
        const selectedTheaters = [];

        // Randomly select theaters
        while (selectedTheaters.length < numTheaters) {
            const randomTheater = theatersList[Math.floor(Math.random() * theatersList.length)];
            if (!selectedTheaters.find(t => t._id.equals(randomTheater._id))) {
                selectedTheaters.push(randomTheater);
            }
        }

        selectedTheaters.forEach((theater) => {
            times.forEach((time, timeIndex) => {
                // Calculate seats per screen (total theater seats divided by number of screens)
                const seatsPerScreen = Math.floor(theater.totalSeats / 5); // 5 screens per theater

                showtimes.push({
                    movieId: movieId,
                    theaterId: theater._id,
                    startTime: time, // Format: "HH:mm"
                    date: dateStr, // Format: "YYYY-MM-DD"
                    price: 80000 + (timeIndex * 20000), // Prices from 80k to 160k VND
                    availableSeats: seatsPerScreen
                });
            });
        });
    }

    return showtimes;
}

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Movie.deleteMany({});
        await Theater.deleteMany({});
        await Showtime.deleteMany({});
        console.log('Cleared existing movies, theaters, and showtimes');

        // Insert theaters first
        const insertedTheaters = await Theater.insertMany(theaters);
        console.log(`Seeded ${insertedTheaters.length} theaters`);

        // Insert new movies
        const insertedMovies = await Movie.insertMany(movies);
        console.log(`Seeded ${insertedMovies.length} movies`);

        // Create showtimes for each movie
        const allShowtimes = [];
        insertedMovies.forEach(movie => {
            const showtimes = createShowtimes(movie._id, movie.duration, insertedTheaters);
            allShowtimes.push(...showtimes);
        });

        // Insert showtimes
        await Showtime.insertMany(allShowtimes);
        console.log(`Seeded ${allShowtimes.length} showtimes`);

        console.log('\n✅ Database seeded successfully!');
        console.log(`🎭 Total theaters: ${insertedTheaters.length}`);
        console.log(`📽️  Total movies: ${insertedMovies.length}`);
        console.log(`🎬 Total showtimes: ${allShowtimes.length}`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
