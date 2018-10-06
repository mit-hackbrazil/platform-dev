const pgp = require('pg-promise')();
import db_config from "./db_secret.json";

const connection = {
    host: db_config.host,
    port: db_config.port,
    database: db_config.database,
    user: db_config.user,
    password: db_config.password
};

export const db = pgp(connection);
