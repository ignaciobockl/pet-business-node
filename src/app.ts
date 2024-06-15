/// <reference path="./types/express.d.ts" />

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.ts';
import { testConnection } from './prisma.ts';
import userRoutes from './routes/userRoutes.ts';
import logger from './utils/logger.ts';

const app = express();

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: '.env.production',
  });
} else {
  dotenv.config();
}

// Middlewares
app.use(express.json());
// TODO: revisar documentacion
app.use(cors());
// ! esta es la configuracion por defecto
// TODO: personalizar segun necesidades
app.use(helmet());
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use((req, res, next) => {
  req.log = logger;
  next();
});

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Handling unhandled errors and promise rejections
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Excepción no controlada');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'Promesa no manejada');
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  testConnection();
  logger.info(`Server is running on http://localhost:${PORT}`);
});
