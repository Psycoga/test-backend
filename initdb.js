const betterSqlite = require('better-sqlite3');

const db = new betterSqlite('database.db');

stmt = "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, ip TEXT, userAgent TEXT, localizacion TEXT, fecha TEXT)";

db.prepare(stmt).run();

//db.close();

module.exports = db;
