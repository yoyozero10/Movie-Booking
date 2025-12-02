import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie_booking';

const migrateUsers = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Update all users to have default role 'user' if missing
        const result = await User.updateMany(
            { role: { $exists: false } },
            { $set: { role: 'user' } }
        );
        console.log(`Updated ${result.modifiedCount} users with default role 'user'`);

        // 2. Set specific user as admin
        const adminEmail = 'thnhctdxhbt@gmail.com';

        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            { $set: { role: 'admin' } },
            { new: true }
        );

        if (admin) {
            console.log(`✅ Successfully promoted ${adminEmail} to ADMIN`);
        } else {
            console.log(`⚠️ User ${adminEmail} not found`);
        }

        console.log('🎉 Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrateUsers();
