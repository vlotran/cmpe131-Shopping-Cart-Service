// server.js
// Purpose: Application entry point - bootstraps and starts the server

// 1. Load environment variables from .env file
require('dotenv').config();

const app = require('./app.js');
const { getDatabase, closeDatabase } = require('./config/database');

// 2. Use the PORT from process.env, with a fallback for safety
const PORT = process.env.PORT || 3000;

// 3. Initialize database then start server
async function startServer() {
    try {
        await getDatabase();
        console.log('✅ Database initialized successfully');
        
        const server = app.listen(PORT, () => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🚀 Shopping Cart Service');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📍 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`💾 Database: ${process.env.DB_PATH || './db.sqlite'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📚 API Documentation:');
            console.log(`   Swagger UI: http://localhost:${PORT}/api-docs`);
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

        // Handle graceful shutdown
        const shutdown = async (signal) => {
            console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
            server.close(async () => {
                await closeDatabase();
                console.log('✅ Server closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));

    } catch (err) {
        console.error('❌ Failed to initialize database:', err.message);
        console.error(err);
        process.exit(1);
    }
}

startServer();