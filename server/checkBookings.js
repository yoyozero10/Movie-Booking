import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models properly
import './models/User.js';
import './models/Showtime.js';
import './models/Movie.js';
import './models/Theater.js';
const Booking = (await import('./models/Booking.js')).default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkBookings() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const bookings = await Booking.find()
            .limit(5)
            .populate('userId', 'name email');

        console.log('\n📊 Sample Bookings:');
        console.log('Total bookings:', await Booking.countDocuments());

        bookings.forEach((booking, index) => {
            console.log(`\n${index + 1}. Booking ID: ${booking._id}`);
            console.log(`   User ID: ${booking.userId?._id || 'MISSING'}`);
            console.log(`   User Name: ${booking.userId?.name || 'NO USER LINKED'}`);
            console.log(`   User Email: ${booking.userId?.email || 'N/A'}`);
            console.log(`   Total Price: ${booking.totalPrice}`);
            console.log(`   Status: ${booking.status}`);
        });

        // Check if any bookings have userId
        const bookingsWithUser = await Booking.countDocuments({ userId: { $exists: true, $ne: null } });
        const bookingsWithoutUser = await Booking.countDocuments({ userId: { $exists: false } })
            + await Booking.countDocuments({ userId: null });

        console.log('\n📈 Statistics:');
        console.log(`   Bookings WITH userId: ${bookingsWithUser}`);
        console.log(`   Bookings WITHOUT userId: ${bookingsWithoutUser}`);

        if (bookingsWithoutUser > 0) {
            console.log('\n⚠️  WARNING: Some bookings are missing userId!');
            console.log('   This is why "Unknown User" is displayed.');
            console.log('   Bookings need to be created by logged-in users.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkBookings();
