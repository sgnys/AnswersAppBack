import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'answers_app',
    namedPlaceholders: true,
    decimalNumbers: true,
})