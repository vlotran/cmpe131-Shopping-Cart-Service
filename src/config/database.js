// database.js (Using the 'sqlite' package)
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

// Build the path relative to the current file's directory
const DBSOURCE = path.join(__dirname, '../../db.sqlite');

async function setupDatabase() {
    try {
        const db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');

        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON');

        // Create users table (if not exists)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Read and execute schema file for cart tables
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await db.exec(schema);
            console.log('Cart database tables created successfully.');
        }

        return db;
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
}

module.exports = setupDatabase();