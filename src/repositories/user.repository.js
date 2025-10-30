// repositories/user.repository.js (Using the 'sqlite' package)
const getDbPromise = require('../config/database.js'); // This is a promise now

class UserRepository {
    async findAll() {
        const db = await getDbPromise; // Get the resolved db connection
        console.log('DB instance in findAll:', db); // Debugging line
        return await db.all("SELECT * FROM users");
    }

    async findById(id) {
        const db = await getDbPromise;
        // The '?' placeholder is automatically handled
        return await db.get("SELECT * FROM users WHERE id = ?", id);
    }

    async create(data) {
        const db = await getDbPromise;
        const result = await db.run(
            'INSERT INTO users (name, email) VALUES (?,?)',
            data.name, data.email // You can pass params directly
        );
        // The result object CONTAINS lastID and changes!
        return { id: result.lastID, ...data };
    }

    async update(id, data) {
        const db = await getDbPromise;
        const result = await db.run(
           `UPDATE users set name = COALESCE(?,name), email = COALESCE(?,email) WHERE id = ?`,
           data.name, data.email, id
        );
        return { changes: result.changes };
    }

    async delete(id) {
        const db = await getDbPromise;
        const result = await db.run('DELETE FROM users WHERE id = ?', id);
        return { changes: result.changes };
    }
}

module.exports = new UserRepository();
