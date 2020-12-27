var taskman = require('node-taskman');

// Process tasks.
var worker = taskman.createWorker('confirmationEmail');
worker.process(function sendEmail(participant, done) {
    console.log('sending ...', participant);
    done();
});