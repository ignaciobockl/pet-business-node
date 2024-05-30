import { Request, Response, NextFunction } from 'express';

// TODO: sacar el enum de este archivo
enum ErrorCode {
  VALIDATION_ERROR = 400,
  UNAUTHORIZED_ERROR = 401,
  FORBIDDEN_ERROR = 403,
  NOT_FOUND_ERROR = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Función auxiliar para obtener el código de estado HTTP apropiado para un error.
 * @param {Error} err El error para el cual se desea obtener el código de estado.
 * @returns {number} El código de estado HTTP.
 */
const getStatusCode = (err: Error): number => {
  switch (err.name) {
    case 'ValidationError':
      return ErrorCode.VALIDATION_ERROR;
    case 'UnauthorizedError':
      return ErrorCode.UNAUTHORIZED_ERROR;
    case 'ForbiddenError':
      return ErrorCode.FORBIDDEN_ERROR;
    case 'NotFoundError':
      return ErrorCode.NOT_FOUND_ERROR;
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR;
  }
};

/**
 * Función auxiliar para obtener el mensaje de error apropiado para un error.
 * @param {Error} err El error para el cual se desea obtener el mensaje de error.
 * @returns {string} El mensaje de error.
 */
const getErrorMessage = (err: Error): string =>
  err.message || 'Internal Server Error';

/**
 * Middleware para manejar errores en las peticiones.
 * Registra el error en la consola y envía una respuesta JSON con el código de estado apropiado.
 * @param {Error} err El error que se produjo.
 * @param {Request} req El objeto de solicitud de Express.
 * @param {Response} res El objeto de respuesta de Express.
 * @param {NextFunction} next La función para pasar el control al siguiente middleware (no se utiliza en esta implementación).
 * @returns {void}
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  console.error(err);

  const statusCode = getStatusCode(err);
  const errorMessage = getErrorMessage(err);

  res.status(statusCode).json({ error: errorMessage });

  // Llama a next solo si deseas continuar con el siguiente middleware
  // next();
};

export default errorHandler;
