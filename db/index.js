const pgp = require("pg-promise")();

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:123456@127.0.0.1:5432/usersbackend';

const cn = {
    connectionString: databaseUrl,
    allowExitOnIdle: true,
    max:30
}
if(process.env.NODE_ENV === 'production'){
    cn.ssl = { rejectUnauthorized: false}
}

const db = pgp(cn);
module.exports = db;