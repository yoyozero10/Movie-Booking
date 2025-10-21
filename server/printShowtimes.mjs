import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const { default: Showtime } = await import('./models/Showtime.js');
  const docs = await Showtime.find().limit(50).lean();
  if (!docs || docs.length === 0) {
    console.log('No showtime documents found.');
  } else {
    console.log(`Printing ${docs.length} showtime documents:`);
    docs.forEach((d, i) => {
      console.log('---');
      console.log(`#${i + 1}`);
      console.log(JSON.stringify(d, null, 2));
    });
  }

} catch (err) {
  console.error('❌ Error fetching showtimes:', err);
} finally {
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
}
