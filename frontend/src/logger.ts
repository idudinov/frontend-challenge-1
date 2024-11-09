import logger, { createLogger, setMode } from '@zajno/common/logger';

setMode('console'); // TODO disable logger for production here

export default logger;

export { createLogger };
