module.exports = {
    "development": {
        "username": "pace",
        "password": "pace",
        "database": "pace",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "dev": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": "pace",
        "host": process.env.POSTGRES_HOST,
        "dialect": "postgres"

    },
    "production": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": "pace",
        "host": process.env.POSTGRES_HOST,
        "dialect": "postgres"
    }
};
