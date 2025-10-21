import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';

try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const { default: Movie } = await import('./models/Movie.js');

  const newMovie = new Movie({
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genre: 'Drama',
    duration: 142,
    rating: 'R',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmRhMC00ZDJlLWFmNTEtODM1ZTk2YzU3ODk2XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
    releaseDate: '1994-09-23'
  });

  const saved = await newMovie.save();
  console.log('✅ Inserted movie:', saved.title, 'id:', saved._id.toString());

} catch (err) {
  console.error('❌ Error inserting movie:', err);
} finally {
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
}
