import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import helmet from 'helmet';
import userRoutes from './routes/userRoutes.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
// TODO: revisar documentacion
app.use(cors());
// TODO: revisar documentacion
// app.use(helmet());
// TODO: revisar documentacion
app.use(morgan('combined'));

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
