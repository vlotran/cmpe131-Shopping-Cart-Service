// api/routes/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// --- Shopping Cart API Routes ---

// Apply authentication middleware to all cart routes
router.use(authMiddleware);

// GET /api/cart - Get the current user's cart
router.get("/cart", cartController.getCart);

// POST /api/cart/items - Add an item (product ID and quantity) to the cart
router.post("/cart/items", cartController.addItem);

// PUT /api/cart/items/:productId - Update the quantity of an item in the cart
router.put("/cart/items/:productId", cartController.updateItem);

// DELETE /api/cart/items/:productId - Remove an item from the cart
router.delete("/cart/items/:productId", cartController.removeItem);

// DELETE /api/cart - Clear the entire cart
router.delete("/cart", cartController.clearCart);

module.exports = router;