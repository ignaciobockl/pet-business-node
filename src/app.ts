/// <reference path="./types/express.d.ts" />

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.ts';
import { disconnectPrisma, testConnection } from './prisma.ts';
import userRoutes from './routes/userRoutes.ts';
import handleProcessErrors from './utils/exceptionHandler.ts';
import logger from './utils/logger.ts';

const app = express();

const envFile =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development';

dotenv.config({
  path: envFile,
});

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
handleProcessErrors();

const PORT = process.env.PORT || 3000;

// Connection to the database
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    logger.info(
      `Servidor corriendo en el entono ${process.env.NODE_ENV} en el puerto ${PORT}`
    );
  } else {
    testConnection();
    logger.debug(
      `Servidor corriendo en el entono ${process.env.NODE_ENV} en el puerto ${PORT}`
    );
  }
});

// Disconnection from the database
// This event is fired when 'Ctrl+C' is pressed
process.on('SIGINT', async () => {
  logger.info('Cerrando la aplicación...');
  await disconnectPrisma();
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});

// This event is fired when the process termination signal is received
process.on('SIGTERM', async () => {
  logger.info('Cerrando la aplicación...');
  await disconnectPrisma();
  server.close(() => {
    logger.info('Servidor cerrado');
    process.exit(0);
  });
});
