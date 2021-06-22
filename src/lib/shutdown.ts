import { Server } from 'net';
import * as pino from 'pino';
import { Connection } from 'typeorm';

export interface ShutdownOptions {
  db: Connection;

  logger: pino.Logger;
  nodeServer: Server;
}
// that all logging gets performed before process exit.
const shutdown = async (config: ShutdownOptions): Promise<void> => {
  config.logger.warn('Shutting down HTTP server.');
  config.nodeServer.close(() => {
    config.logger.warn('HTTP server closed.');

    config.db.close().then(() => {
      config.logger.warn('Database disconnected.');
      const finalLogger = pino.final(config.logger);
      finalLogger.warn('Bye.');
      process.exit(1);
    });
  });
};

export const setupErrorHandling = (config: ShutdownOptions): void => {
  process.on('uncaughtException', (err) => {
    config.logger.error(err, 'Uncaught Exception');
    shutdown(config);
  });
  process.on('unhandledRejection', (err) => {
    if (err) {
      config.logger.error(err, 'Uncaught Rejection');
      shutdown(config);
    }
  });
  process.on('SIGINT', async () => {
    config.logger.warn('Node process terminated via SIGINT...');
    shutdown(config);
  });
};
