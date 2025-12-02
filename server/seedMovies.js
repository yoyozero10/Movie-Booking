import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Movie from './models/Movie.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const moviesData = [
    {
        title: "Dune: Part Two",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
        genre: "Sci-Fi",
        duration: 166,
        rating: 8.8,
        releaseDate: "2024-03-01",
        posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
        director: "Denis Villeneuve",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"]
    },
    {
        title: "Oppenheimer",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A thrilling exploration of brilliance, ambition, and the moral dilemmas of scientific advancement.",
        genre: "Biography",
        duration: 180,
        rating: 8.5,
        releaseDate: "2023-07-21",
        posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
        director: "Christopher Nolan",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"]
    },
    {
        title: "The Marvels",
        description: "Carol Danvers, Kamala Khan, and Monica Rambeau swap places with each other every time they use their powers. Together, they must team up and figure out why they are swapping places, while battling a new threat to the universe.",
        genre: "Action",
        duration: 105,
        rating: 6.8,
        releaseDate: "2023-11-10",
        posterUrl: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=wS_qbDztgVY",
        director: "Nia DaCosta",
        cast: ["Brie Larson", "Teyonah Parris", "Iman Vellani", "Samuel L. Jackson", "Zawe Ashton"]
    },
    {
        title: "Poor Things",
        description: "The incredible tale of Bella Baxter, a young woman brought back to life by a brilliant scientist. As Bella embarks on a whirlwind adventure across continents, she is on a journey of self-discovery and liberation.",
        genre: "Comedy",
        duration: 141,
        rating: 8.2,
        releaseDate: "2023-12-08",
        posterUrl: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=RlbR5N6veqw",
        director: "Yorgos Lanthimos",
        cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe", "Ramy Youssef", "Christopher Abbott"]
    },
    {
        title: "Wonka",
        description: "Based on the extraordinary character at the center of Charlie and the Chocolate Factory, this film tells the story of how the world's greatest inventor, magician and chocolate-maker became the beloved Willy Wonka we know today.",
        genre: "Fantasy",
        duration: 116,
        rating: 7.2,
        releaseDate: "2023-12-15",
        posterUrl: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=otNh9bTjXWg",
        director: "Paul King",
        cast: ["Timothée Chalamet", "Olivia Colman", "Hugh Grant", "Keegan-Michael Key", "Rowan Atkinson"]
    },
    {
        title: "Godzilla x Kong: The New Empire",
        description: "The almighty Kong and the fearsome Godzilla face a colossal undiscovered threat hidden within our world, challenging their very existence – and our own. An epic new adventure that pits the two titans against each other.",
        genre: "Action",
        duration: 115,
        rating: 7.0,
        releaseDate: "2024-03-29",
        posterUrl: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=lV1OOlGwExM",
        director: "Adam Wingard",
        cast: ["Rebecca Hall", "Dan Stevens", "Brian Tyree Henry", "Kaylee Hottle", "Fala Chen"]
    },
    {
        title: "Inside Out 2",
        description: "Riley enters puberty and headquarters is undergoing a sudden demolition to make room for new Emotions! Joy, Sadness, Anger, Fear and Disgust aren't sure how to feel when new emotions like Anxiety and Envy arrive.",
        genre: "Animation",
        duration: 96,
        rating: 8.1,
        releaseDate: "2024-06-14",
        posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=LEjhY15eCx0",
        director: "Kelsey Mann",
        cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman", "Liza Lapira", "Tony Hale"]
    },
    {
        title: "Deadpool & Wolverine",
        description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy in an action-packed adventure filled with humor and heart.",
        genre: "Action",
        duration: 128,
        rating: 8.3,
        releaseDate: "2024-07-26",
        posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=73_1biulkYk",
        director: "Shawn Levy",
        cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Morena Baccarin", "Rob Delaney"]
    },
    {
        title: "A Quiet Place: Day One",
        description: "Experience the day the world went quiet. Follow a woman named Sam as she fights for survival during the initial invasion of Earth by mysterious creatures with ultra-sensitive hearing.",
        genre: "Horror",
        duration: 99,
        rating: 7.5,
        releaseDate: "2024-06-28",
        posterUrl: "https://image.tmdb.org/t/p/w500/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=YPY7J-flzE8",
        director: "Michael Sarnoski",
        cast: ["Lupita Nyong'o", "Joseph Quinn", "Alex Wolff", "Djimon Hounsou"]
    },
    {
        title: "Furiosa: A Mad Max Saga",
        description: "The origin story of renegade warrior Furiosa before she teamed up with Mad Max in Fury Road. A tale of survival, revenge, and redemption in the post-apocalyptic wasteland.",
        genre: "Action",
        duration: 148,
        rating: 7.8,
        releaseDate: "2024-05-24",
        posterUrl: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=XJMuhwVlca4",
        director: "George Miller",
        cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke", "Alyla Browne", "George Shevtsov"]
    },
    {
        title: "The Fall Guy",
        description: "A down-and-out stuntman must find the missing star of his ex-girlfriend's blockbuster film and uncover a conspiracy while trying to win back the love of his life.",
        genre: "Action",
        duration: 126,
        rating: 7.4,
        releaseDate: "2024-05-03",
        posterUrl: "https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=j7jPnwVGdZ8",
        director: "David Leitch",
        cast: ["Ryan Gosling", "Emily Blunt", "Aaron Taylor-Johnson", "Hannah Waddingham", "Stephanie Hsu"]
    },
    {
        title: "Wicked",
        description: "The story of how a green-skinned woman framed by the Wizard of Oz becomes the Wicked Witch of the West. A tale of friendship, love, and the choices that define us.",
        genre: "Musical",
        duration: 160,
        rating: 8.0,
        releaseDate: "2024-11-27",
        posterUrl: "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=6COmYeLsz4c",
        director: "Jon M. Chu",
        cast: ["Cynthia Erivo", "Ariana Grande", "Jonathan Bailey", "Michelle Yeoh", "Jeff Goldblum"]
    },
    {
        title: "Gladiator II",
        description: "Years after witnessing the death of the revered hero Maximus, Lucius is forced to enter the Colosseum after his home is conquered. With rage in his heart and the future of the Empire at stake, he must look to his past to find strength.",
        genre: "Action",
        duration: 148,
        rating: 7.9,
        releaseDate: "2024-11-22",
        posterUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=4rgYUipGJNo",
        director: "Ridley Scott",
        cast: ["Paul Mescal", "Pedro Pascal", "Denzel Washington", "Connie Nielsen", "Joseph Quinn"]
    },
    {
        title: "Moana 2",
        description: "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous waters for an adventure unlike anything she's ever faced.",
        genre: "Animation",
        duration: 100,
        rating: 7.6,
        releaseDate: "2024-11-27",
        posterUrl: "https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=hBxSx8ThqGo",
        director: "David Derrick Jr.",
        cast: ["Auli'i Cravalho", "Dwayne Johnson", "Temuera Morrison", "Nicole Scherzinger", "Rachel House"]
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. An epic journey across time and space that explores love, sacrifice, and the resilience of the human spirit.",
        genre: "Sci-Fi",
        duration: 169,
        rating: 8.7,
        releaseDate: "2014-11-07",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"]
    },
    {
        title: "The Shawshank Redemption",
        description: "Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion. A timeless tale of hope and perseverance.",
        genre: "Drama",
        duration: 142,
        rating: 9.3,
        releaseDate: "1994-09-23",
        posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
        director: "Frank Darabont",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"]
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action",
        duration: 152,
        rating: 9.0,
        releaseDate: "2008-07-18",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"]
    },
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
        genre: "Sci-Fi",
        duration: 148,
        rating: 8.8,
        releaseDate: "2010-07-16",
        posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Ken Watanabe"]
    },
    {
        title: "Parasite",
        description: "All unemployed, the Kim family takes peculiar interest in the wealthy Park family. When the Kims infiltrate the Parks' home, they uncover shocking secrets and set off a chain of events.",
        genre: "Thriller",
        duration: 132,
        rating: 8.5,
        releaseDate: "2019-05-30",
        posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        director: "Bong Joon-ho",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"]
    },
    {
        title: "Spirited Away",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts.",
        genre: "Animation",
        duration: 125,
        rating: 8.6,
        releaseDate: "2001-07-20",
        posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
        director: "Hayao Miyazaki",
        cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naito", "Yasuko Sawaguchi"]
    }
];

async function seedMovies() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing movies
        console.log('🗑️  Clearing existing movies...');
        await Movie.deleteMany({});
        console.log('✅ Existing movies cleared');

        // Insert new movies
        console.log('🎬 Inserting sample movies...');
        const movies = await Movie.insertMany(moviesData);
        console.log(`✅ Successfully inserted ${movies.length} movies!`);

        console.log('\n📊 Sample Movies:');
        movies.slice(0, 5).forEach(movie => {
            console.log(`   - ${movie.title} (${movie.genre}) - Rating: ${movie.rating}/10`);
        });
        console.log(`   ... and ${movies.length - 5} more!\n`);

        console.log('🎉 Seed data complete!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seedMovies();
