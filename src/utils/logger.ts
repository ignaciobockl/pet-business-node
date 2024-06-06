import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const logFile = path.join(dirname, '../../logs/app.log');
let logCount = 0;

const applyColor = (
  message: string,
  level: 'info' | 'warn' | 'error'
): string => {
  switch (level) {
    case 'info':
      return chalk.blue(message);
    case 'warn':
      return chalk.yellow(message);
    case 'error':
      return chalk.red(message);
    default:
      return message;
  }
};

const log = (
  level: 'info' | 'warn' | 'error',
  message: string,
  meta?: Record<string, unknown>
): void => {
  let logMessage = `[${dayjs().format('YYYY-MM-DD HH:mm:ss')} - ${level.toUpperCase()}] ${message}`;

  logMessage = applyColor(logMessage, level);

  if (meta) {
    logMessage += ` - ${JSON.stringify(meta)}`;
  }

  console.log(logMessage);

  // Guardar el log en el archivo
  fs.appendFileSync(logFile, logMessage + '\n');

  // Incrementar el contador de logs y verificar si se debe guardar en la base de datos
  logCount++;
  if (logCount >= 200 || dayjs().date() === 1) {
    // saveLogsToDatabase(logFile);
    logCount = 0;
  }
};

// const saveLogsToDatabase = (logFilePath: string): void => {
//   const logs = fs.readFileSync(logFilePath, 'utf8');
//   // Aquí deberías guardar los logs en la base de datos como un archivo de texto
//   // Implementa la lógica para guardar 'logs' en la base de datos
//   console.log('Logs saved to database:', logs);
//   // Limpiar el archivo de logs después de guardarlos en la base de datos
//   fs.writeFileSync(logFilePath, '');
// };

export default log;
