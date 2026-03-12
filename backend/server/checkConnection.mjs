import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';

console.log('Using MONGODB_URI:', MONGODB_URI.startsWith('mongodb+srv') ? '(Atlas SRV) ' + MONGODB_URI : MONGODB_URI);

try {
  await mongoose.connect(MONGODB_URI, { dbName: 'movie_booking' });
  console.log('✅ Connected to MongoDB');

  // Import Movie model dynamically to reuse schema
  const { default: Movie } = await import('./models/Movie.js');

  const movieCount = await Movie.countDocuments();
  console.log(`🎞️ Movies count: ${movieCount}`);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('🗂️ Collections in DB:', collections.map(c => c.name).join(', ') || '(none)');

} catch (err) {
  console.error('❌ MongoDB connection error:', err);
} finally {
  try {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  } catch (e) {
    // ignore
  }
}
