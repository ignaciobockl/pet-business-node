/// <reference path="./types/express.d.ts" />

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.ts';
import { connectDatabase } from './prisma.ts';
import userRoutes from './routes/userRoutes.ts';
import handleProcessErrors from './utils/exceptionHandler.ts';
import handleAppShutdown from './utils/handleAppShutdown.ts';
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

export const startServer = async (port: number): Promise<Server> => {
  try {
    await connectDatabase();
    const server = app.listen(port, () => {
      const msg = `Server running in the environment ${process.env.NODE_ENV}, in the port ${port}`;
      if (process.env.NODE_ENV === 'production') {
        logger.info(msg);
      } else if (process.env.NODE_ENV === 'test') {
        logger.debug(msg);
      } else {
        logger.debug(msg);
      }
    });

    handleAppShutdown(server);

    return server;
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer(PORT).catch((err) => {
    logger.error('Server failed to start:', err);
  });
}

export default app;
