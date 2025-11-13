const express = require('express');
const cartRoutes = require('./api/routes/cart.routes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - Mount cart routes at /api/cart
app.use('/api/cart', cartRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Shopping Cart Service is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'Shopping Cart Service',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            cart: {
                getCart: 'GET /api/cart',
                addItem: 'POST /api/cart/items',
                updateItem: 'PUT /api/cart/items/:productId',
                removeItem: 'DELETE /api/cart/items/:productId',
                clearCart: 'DELETE /api/cart'
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
    });
});

module.exports = app;