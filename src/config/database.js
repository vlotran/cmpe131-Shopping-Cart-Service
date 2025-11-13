// database.js (Using the 'sqlite' package)
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs').promises;

// Build the path relative to the current file's directory
const DBSOURCE = path.join(__dirname, '../../db.sqlite');

let dbInstance = null;

async function setupDatabase() {
    // Return existing connection if already initialized
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');

        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON');

        // Use transaction for schema setup
        await db.exec('BEGIN TRANSACTION');
        
        try {
            // Create users table (if not exists)
            await db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Create index on email for faster lookups
            await db.exec(`
                CREATE INDEX IF NOT EXISTS idx_users_email 
                ON users(email)
            `);

            // Read and execute schema file for cart tables
            const schemaPath = path.join(__dirname, '../database/schema.sql');
            try {
                const schema = await fs.readFile(schemaPath, 'utf8');
                await db.exec(schema);
                console.log('Cart database tables created successfully.');
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
                console.warn('Schema file not found, skipping cart tables.');
            }

            await db.exec('COMMIT');
        } catch (err) {
            await db.exec('ROLLBACK');
            throw err;
        }

        dbInstance = db;
        return db;

    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
}

async function closeDatabase() {
    if (dbInstance) {
        await dbInstance.close();
        dbInstance = null;
        console.log('Database connection closed.');
    }
}

// Graceful shutdown handlers
process.on('SIGINT', async () => {
    await closeDatabase();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDatabase();
    process.exit(0);
});

module.exports = {
    getDatabase: setupDatabase,
    closeDatabase
};