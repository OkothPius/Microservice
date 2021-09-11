const EventEmitter = require('events');

var url = 'http://hello.com/log';

class Logger extends EventEmitter {
	log(message) {
		//Send an http request
        	console.log(message);

		//Raise an Event
        	this.emit('Logging', {data: 'Message'});
   }


}

module.exports = Logger;
