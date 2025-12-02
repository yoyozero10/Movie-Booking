import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  rating: {
    type: Number, // Rating score (0-10)
    required: true,
    min: 0,
    max: 10
  },
  posterUrl: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  trailerUrl: {
    type: String,
    required: false
  },
  director: {
    type: String,
    required: false,
    trim: true
  },
  cast: {
    type: [String],
    required: false,
    default: []
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

// Update the updatedAt field before saving
movieSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Movie', movieSchema);
