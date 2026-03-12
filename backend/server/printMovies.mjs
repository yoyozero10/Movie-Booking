import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const { default: Movie } = await import('./models/Movie.js');

  const docs = await Movie.find().limit(5).lean();
  if (!docs || docs.length === 0) {
    console.log('No movie documents found.');
  } else {
    console.log(`Printing ${docs.length} movie documents:`);
    docs.forEach((d, i) => {
      console.log('---');
      console.log(`#${i + 1}`);
      console.log(JSON.stringify(d, null, 2));
    });
  }

} catch (err) {
  console.error('❌ Error fetching movies:', err);
} finally {
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
}
