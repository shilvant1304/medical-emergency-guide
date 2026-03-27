import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import diseaseRoutes from './routes/diseases';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/diseases', diseaseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`  - GET  /api/health - Health check`);
  console.log(`  - GET  /api/diseases - Get all diseases`);
  console.log(`  - GET  /api/diseases/:id - Get disease by ID`);
  console.log(`  - POST /api/auth/register - Register user`);
  console.log(`  - POST /api/auth/login - Login user`);
  console.log(`  - GET  /api/auth/me - Get current user`);
  console.log(`  - POST /api/diseases - Create disease (Admin)`);
  console.log(`  - PUT  /api/diseases/:id - Update disease (Admin)`);
  console.log(`  - DELETE /api/diseases/:id - Delete disease (Admin)`);
  console.log(`  - GET  /api/admin/users - Get all users (Admin)`);
  console.log(`  - GET  /api/admin/stats - Get dashboard stats (Admin)`);
});
