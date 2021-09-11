const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

//Register an event
logger.on('Logging', (e) => console.log('Listener called', e));

logger.log('message');

