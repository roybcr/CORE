import pino from 'pino';

export const logManager = (): pino.Logger => {
  const loggingInstance = pino({ prettyPrint: { colorize: true } }, process.stdout);

  const lNow = new Date().toLocaleString();
  loggingInstance.info(`Logging initialized at ${lNow}`);

  return loggingInstance;
};
