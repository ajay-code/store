const DB = {
    dbClient: process.env.DB_CLIENT || 'mysql2',
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbPort: parseInt(process.env.DB_PORT ?? '') || 3306,
    dbUser: process.env.DB_USERNAME || 'user',
    dbPassword: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_NAME || 'test', // name of the database to connect to
}

export default DB
