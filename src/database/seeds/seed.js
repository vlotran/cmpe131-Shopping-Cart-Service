// database/seed.js
const { getDatabase, closeDatabase } = require('../../config/database');

async function seedDatabase() {
    try {
        const db = await getDatabase();

        console.log('🌱 Starting database seed...');

        // Seed test users
        console.log('Seeding users...');
        await db.run(`
            INSERT OR IGNORE INTO users (id, name, email) VALUES
            (1, 'Alex Buyer', 'alex@example.com'),
            (2, 'Jane Smith', 'jane@example.com'),
            (3, 'Bob Johnson', 'bob@example.com')
        `);
        console.log('✅ Users seeded');

        // Clear existing cart data for clean seed
        await db.run('DELETE FROM cart_items');
        await db.run('DELETE FROM carts');
        console.log('🧹 Cleared existing cart data');

        // Seed test carts
        console.log('Seeding carts...');
        await db.run(`
            INSERT INTO carts (id, user_id) VALUES
            (1, 1),
            (2, 2)
        `);
        console.log('✅ Carts seeded');

        // Seed test cart items
        console.log('Seeding cart items...');
        await db.run(`
            INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
            (1, 101, 2),
            (1, 102, 1),
            (2, 103, 3)
        `);
        console.log('✅ Cart items seeded');

        console.log('🎉 Database seeded successfully!');
        console.log('');
        console.log('Test data created:');
        console.log('- User 1 (Alex): Cart with 2 items (Product 101: qty 2, Product 102: qty 1)');
        console.log('- User 2 (Jane): Cart with 1 item (Product 103: qty 3)');
        console.log('- User 3 (Bob): No cart (will be created on first use)');
        
        await closeDatabase();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        await closeDatabase();
        process.exit(1);
    }
}

seedDatabase();