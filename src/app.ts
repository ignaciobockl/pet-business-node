import express from 'express';
import cors from 'cors';

// import helmet from 'helmet';
import userRoutes from './routes/userRoutes.ts';
import errorHandler from './middleware/errorHandler.ts';
import { testConnection } from './prisma.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
// TODO: revisar documentacion
app.use(cors());
// TODO: revisar documentacion
// app.use(helmet());

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  testConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
