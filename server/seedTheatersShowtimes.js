import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Theater from './models/Theater.js';
import Showtime from './models/Showtime.js';
import Movie from './models/Movie.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Theaters data with diverse locations in Vietnam
const theatersData = [
    // District 1 - Downtown
    {
        name: "CinemaVision IMAX Saigon Center",
        location: "65 Lê Lợi, Quận 1",
        region: "Quận 1",
        city: "TP. Hồ Chí Minh",
        totalSeats: 300
    },
    {
        name: "CinemaVision Gold Diamond Plaza",
        location: "34 Lê Duẩn, Quận 1",
        region: "Quận 1",
        city: "TP. Hồ Chí Minh",
        totalSeats: 250
    },

    // District 3
    {
        name: "CinemaVision Landmark 81",
        location: "208 Nguyễn Hữu Cảnh, Quận 3",
        region: "Quận 3",
        city: "TP. Hồ Chí Minh",
        totalSeats: 350
    },

    // District 7 - South Saigon
    {
        name: "CinemaVision Crescent Mall",
        location: "101 Tôn Dật Tiên, Quận 7",
        region: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalSeats: 280
    },
    {
        name: "CinemaVision Vivo City",
        location: "1058 Nguyễn Văn Linh, Quận 7",
        region: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalSeats: 320
    },

    // Binh Thanh District
    {
        name: "CinemaVision Vincom Bình Thạnh",
        location: "72 Lê Văn Việt, Bình Thạnh",
        region: "Bình Thạnh",
        city: "TP. Hồ Chí Minh",
        totalSeats: 260
    },

    // Thu Duc
    {
        name: "CinemaVision Gigamall",
        location: "240-242 Phạm Văn Đồng, Thủ Đức",
        region: "Thủ Đức",
        city: "TP. Hồ Chí Minh",
        totalSeats: 290
    },
    {
        name: "CinemaVision The Garden Mall",
        location: "190 Hồng Bàng, Thủ Đức",
        region: "Thủ Đức",
        city: "TP. Hồ Chí Minh",
        totalSeats: 240
    },

    // Tan Binh
    {
        name: "CinemaVision Lotte Cộng Hòa",
        location: "20 Cộng Hòa, Tân Bình",
        region: "Tân Bình",
        city: "TP. Hồ Chí Minh",
        totalSeats: 300
    },

    // District 10
    {
        name: "CinemaVision Thủ Đô Plaza",
        location: "436 Lê Hồng Phong, Quận 10",
        region: "Quận 10",
        city: "TP. Hồ Chí Minh",
        totalSeats: 220
    }
];

// Helper function to generate dates for next 7 days
function getNextDays(numDays = 7) {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
}

// Various showtimes throughout the day
const timeSlots = [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00", "22:30"
];

// Different price tiers based on time and day
function getPrice(time, dayOfWeek) {
    const hour = parseInt(time.split(':')[0]);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

    // Morning shows (before 12pm)
    if (hour < 12) {
        return 65000;
    }
    // Afternoon shows (12pm - 5pm)
    else if (hour < 17) {
        return isWeekend ? 95000 : 85000;
    }
    // Prime time (5pm - 8pm)
    else if (hour < 20) {
        return isWeekend ? 120000 : 110000;
    }
    // Late shows (after 8pm)
    else {
        return isWeekend ? 105000 : 95000;
    }
}

async function seedTheatersAndShowtimes() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get all movies
        const movies = await Movie.find({});
        if (movies.length === 0) {
            console.log('❌ No movies found! Please run seedMovies.js first.');
            process.exit(1);
        }
        console.log(`📽️  Found ${movies.length} movies`);

        // Clear and seed theaters
        console.log('\n🏢 Seeding theaters...');
        await Theater.deleteMany({});
        const theaters = await Theater.insertMany(theatersData);
        console.log(`✅ Created ${theaters.length} theaters`);

        // Clear existing showtimes
        console.log('\n🎬 Clearing old showtimes...');
        await Showtime.deleteMany({});

        // Generate showtimes
        console.log('📅 Generating showtimes...');
        const dates = getNextDays(7); // Next 7 days
        const showtimes = [];

        // For each theater, create showtimes
        for (const theater of theaters) {
            // Each theater shows 5-8 different movies
            const numMovies = 5 + Math.floor(Math.random() * 4);
            const selectedMovies = movies
                .sort(() => Math.random() - 0.5)
                .slice(0, numMovies);

            for (const movie of selectedMovies) {
                // Each movie has 2-4 showtimes per day in each theater
                const showtimesPerDay = 2 + Math.floor(Math.random() * 3);

                for (const date of dates) {
                    const dateObj = new Date(date);
                    const dayOfWeek = dateObj.getDay();

                    // Select random time slots for this movie
                    const selectedSlots = timeSlots
                        .sort(() => Math.random() - 0.5)
                        .slice(0, showtimesPerDay);

                    for (const time of selectedSlots) {
                        const price = getPrice(time, dayOfWeek);

                        showtimes.push({
                            movieId: movie._id,
                            theaterId: theater._id,
                            startTime: time,
                            date: date,
                            price: price,
                            availableSeats: theater.totalSeats
                        });
                    }
                }
            }
        }

        console.log(`💾 Inserting ${showtimes.length} showtimes...`);
        await Showtime.insertMany(showtimes);
        console.log(`✅ Created ${showtimes.length} showtimes!`);

        // Statistics
        console.log('\n📊 Summary:');
        console.log(`   🏢 Theaters: ${theaters.length}`);
        console.log(`   🎬 Movies: ${movies.length}`);
        console.log(`   📅 Showtimes: ${showtimes.length}`);
        console.log(`   📆 Days covered: ${dates.length}`);
        console.log(`   💰 Price range: 65,000₫ - 120,000₫`);

        console.log('\n🎯 Sample Theater Coverage:');
        const sampleTheater = theaters[0];
        const sampleShowtimes = showtimes.filter(
            st => st.theaterId.equals(sampleTheater._id) && st.date === dates[0]
        );
        console.log(`   ${sampleTheater.name}`);
        console.log(`   ${sampleShowtimes.length} showtimes on ${dates[0]}`);

        console.log('\n🎉 Seed complete! Your cinema is ready for business!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seedTheatersAndShowtimes();
