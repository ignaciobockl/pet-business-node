import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.ts';
import { testConnection } from './prisma.ts';
import userRoutes from './routes/userRoutes.ts';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// TODO: revisar documentacion
app.use(cors());

// ! esta es la configuracion por defecto
// TODO: personalizar segun necesidades
app.use(helmet());

app.use(morgan('combined'));

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  testConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
