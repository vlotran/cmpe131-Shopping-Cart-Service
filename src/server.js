// server.js
// Purpose: Application entry point - bootstraps and starts the server

// 1. Load environment variables from .env file
require('dotenv').config();

const app = require('./app.js');
const dbPromise = require('./config/database');

// 2. Use the PORT from process.env, with a fallback for safety
const PORT = process.env.PORT || 3000;

// 3. Initialize database then start server
dbPromise
    .then(() => {
        console.log('✅ Database initialized successfully');
        
        app.listen(PORT, () => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🚀 Shopping Cart Service');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📍 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`💾 Database: ${process.env.DB_PATH || './db.sqlite'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📋 Available Endpoints:');
            console.log(`   GET    http://localhost:${PORT}/health`);
            console.log(`   GET    http://localhost:${PORT}/api/cart`);
            console.log(`   POST   http://localhost:${PORT}/api/cart/items`);
            console.log(`   PUT    http://localhost:${PORT}/api/cart/items/:productId`);
            console.log(`   DELETE http://localhost:${PORT}/api/cart/items/:productId`);
            console.log(`   DELETE http://localhost:${PORT}/api/cart`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });
    })
    .catch(err => {
        console.error('❌ Failed to initialize database:', err.message);
        console.error(err);
        process.exit(1); // Exit with error code
    });

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    process.exit(0);
});