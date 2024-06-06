import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const logFile = path.join(dirname, '../../logs/app.log');

/**
 * Registra un mensaje en el archivo de registro y en la consola.
 * @param {('info' | 'warn' | 'error')} level El nivel del mensaje.
 * @param {string} message El mensaje a registrar.
 * @param {Record<string, string>} [meta] Información adicional relacionada con el mensaje (opcional).
 * @returns {void}
 */
const log = (
  level: 'info' | 'warn' | 'error',
  message: string,
  meta?: Record<string, unknown>
): void => {
  let logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

  if (meta) {
    logMessage += ` - ${JSON.stringify(meta)}`;
  }

  console.log(logMessage);

  fs.appendFileSync(logFile, logMessage + '\n');
};

export default log;
