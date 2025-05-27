// AI-Hint Component: [Database Config] [MongoDB connection management] [Mongoose setup, error handling]

import mongoose from 'mongoose';
import { config } from '@/config/environment';
import { logger } from '@/utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(config.database.uri, config.database.options);
    logger.info('✅ MongoDB connected successfully');
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}; 