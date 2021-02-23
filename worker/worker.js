const Queue = require('bee-queue');
const mail = require('./mail');
const confirmationQueue = new Queue('confirmationEmail', {
        redis: {
            host: process.env.REDIS_HOST || "localhost"
        }
    }
);
const paymentConfirmationQueue = new Queue('paymentConfirmationEmail', {
        redis: {
            host: process.env.REDIS_HOST || "localhost"
        }
    }
);

// Process jobs from as many servers or processes as you like
confirmationQueue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    mail.registrationEmail(job.data)
    return done(null, job.data);
});

paymentConfirmationQueue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    mail.confirmationEmail(job.data)
    return done(null, job.data);
});

