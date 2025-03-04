import pgPromise from 'pg-promise';
import { database } from './config/config.js';

const pgp = pgPromise();

const conn = {
    host: database.host,
    port: database.port,
    database: database.database,
    user: database.user,
    password: database.password,
    ssl: false
}
const db = pgp(conn);

export default db;