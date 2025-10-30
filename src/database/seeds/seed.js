// seed.js (with Faker)
const dbPromise = require('../../config/database');
const { faker } = require('@faker-js/faker');

async function seed() {
    try {
        const db = await dbPromise;

        console.log('Deleting existing users...');
        await db.run('DELETE FROM users');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'users');

        console.log('Inserting 20 fake users...');

        const insertPromises = [];
        for (let i = 0; i < 20; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email({ firstName: name.split(' ')[0], provider: 'example.com' }); // More realistic emails

            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            insertPromises.push(db.run(sql, name, email));
        }

        await Promise.all(insertPromises);

        console.log('Database seeded with fake data!');

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        const db = await dbPromise;
        await db.close();
        console.log('Database connection closed.');
    }
}

seed();