import { JwtPayload } from 'jsonwebtoken';
import { Logger } from 'pino';

declare global {
  namespace Express {
    interface Request {
      log: Logger;
      user?: string | JwtPayload;
    }
  }
}
