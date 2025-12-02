import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function migrateMovies() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Drop the movies collection to remove old schema
        console.log('🗑️  Dropping old movies collection...');
        await mongoose.connection.db.dropCollection('movies').catch(() => {
            console.log('ℹ️  Movies collection does not exist (this is OK)');
        });
        console.log('✅ Movies collection dropped');

        console.log('✅ Migration complete! You can now create movies with numeric ratings.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateMovies();
