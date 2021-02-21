const Queue = require('bee-queue');
const queue = new Queue('confirmationEmail', {
        redis: {
            host: process.env.REDIS_HOST || "localhost"
        }
    }
);

// Process jobs from as many servers or processes as you like
queue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    console.log(job.data)
    return done(null, job.data);
});

