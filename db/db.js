'use server'

import mongoose from 'mongoose';

const mongoUri = 'mongodb+srv://barveanish310:YlBgLXzvKzrn4JY5@cluster0.cdjm1mm.mongodb.net/aidatabase';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Connection error:', error);
    throw error; // Re-throw the error after logging it
  }
};

export default connectToDatabase;
