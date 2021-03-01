const Queue = require('bee-queue');
const mail = require('./mail');
const redishost = process.env.REDIS_HOST || "localhost"
const confirmationQueue = new Queue('confirmationEmail', {
        redis: {
            host: redishost
        }
    }
);
const paymentConfirmationQueue = new Queue('paymentConfirmationEmail', {
        redis: {
            host: redishost
        }
    }
);
const bulkmailQueue = new Queue('bulkmail', {
        redis: {
            host: redishost
        }
    }
);


// Process jobs from as many servers or processes as you like
confirmationQueue.process(function (job, done) {
    console.log(`Processing confirmation mail ${job.id}`);
    mail.registrationEmail(job.data)
    return done(null, job.data);
});

paymentConfirmationQueue.process(function (job, done) {
    console.log(`Processing payment confirmation mail ${job.id}`);
    mail.confirmationEmail(job.data)
    return done(null, job.data);
});

bulkmailQueue.process(function (job,done) {
    console.log(`Processing bulkmail job ${job.id}`);
    mail.bulkmail(job.data)
    return done(null,job.data)
})

