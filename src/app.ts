/// <reference path="./types/express.d.ts" />

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.ts';
import userRoutes from './routes/userRoutes.ts';
// eslint-disable-next-line import/no-cycle
import startServer from './server.ts';
import handleProcessErrors from './utils/exceptionHandler.ts';
import logger from './utils/logger.ts';

const app = express();

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

const PORT = Number(process.env.PORT) || 3000;

startServer(PORT);

export default app;
