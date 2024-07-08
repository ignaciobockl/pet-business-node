/// <reference path="./types/express.d.ts" />

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
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

const PORT = process.env.PORT || 3000;

// Connection to the database
connectDatabase()
  .then(() => {
    const server = app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        logger.info(
          `Servidor corriendo en el entorno ${process.env.NODE_ENV} en el puerto ${PORT}`
        );
      } else if (process.env.NODE_ENV === 'test') {
        logger.debug(
          `Servidor corriendo en el entorno ${process.env.NODE_ENV} en el puerto ${PORT}`
        );
      } else {
        logger.debug(
          `Servidor corriendo en el entorno ${process.env.NODE_ENV} en el puerto ${PORT}`
        );
      }
    });

    //Handling application closure
    handleAppShutdown(server);
  })
  .catch((error) => {
    logger.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Salir con código de error
  });

export default app;
