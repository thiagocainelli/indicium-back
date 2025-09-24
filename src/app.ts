import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

console.log('🚀 Starting application...');

// Swagger
import { setupSwagger } from './_core/swagger';

// Routes
import userRoutes from './users/users.routes';
import authRoutes from './_core/auth/auth.routes';
import sragRoutes from '@/srag/srag.routes';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API is running!' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/srag', sragRoutes);

setupSwagger(app);

export default app;
