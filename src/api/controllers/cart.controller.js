// api/controllers/cart.controller.js
const cartService = require('../../services/cart.service');

class CartController {
    // Story C-02.1: GET /api/cart - View Cart Contents
    async getCart(req, res) {
        try {
            const userId = req.user.id; // From JWT auth middleware
            const cart = await cartService.getCart(userId);
            
            // Return 200 OK with cart contents (empty array if no items)
            res.status(200).json({ 
                message: "success", 
                data: cart 
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Story C-01.1: POST /api/cart/items - Add an Item to the Cart
    async addItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;

            const cart = await cartService.addItem(
                userId, 
                productId, 
                quantity || 1
            );
            
            // Return 200 OK with updated cart contents
            res.status(200).json({ 
                message: "success", 
                data: cart 
            });
        } catch (err) {
            // Story C-03.1: Product not found
            if (err.message === 'Product not found') {
                return res.status(404).json({ error: err.message });
            }
            
            if (err.message.includes('required') || 
                err.message.includes('must be') ||
                err.message.includes('greater than')) {
                return res.status(400).json({ error: err.message });
            }
            
            res.status(500).json({ error: err.message });
        }
    }

    // Story C-01.2: PUT /api/cart/items/:productId - Update Item Quantity
    async updateItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.params;
            const { quantity } = req.body;

            const cart = await cartService.updateItem(
                userId, 
                parseInt(productId), 
                quantity
            );
            
            // Return 200 OK with updated cart contents
            res.status(200).json({ 
                message: "success", 
                data: cart 
            });
        } catch (err) {
            // Return 404 if product not in cart
            if (err.message.includes('not found')) {
                return res.status(404).json({ error: err.message });
            }
            
            if (err.message.includes('required') || 
                err.message.includes('cannot be') ||
                err.message.includes('must be')) {
                return res.status(400).json({ error: err.message });
            }
            
            res.status(500).json({ error: err.message });
        }
    }

    // Story C-01.3: DELETE /api/cart/items/:productId - Remove Item
    async removeItem(req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.params;

            const cart = await cartService.removeItem(
                userId, 
                parseInt(productId)
            );
            
            // Return 200 OK with updated cart contents
            res.status(200).json({ 
                message: "success", 
                data: cart 
            });
        } catch (err) {
            if (err.message.includes('not found')) {
                return res.status(404).json({ error: err.message });
            }
            
            res.status(500).json({ error: err.message });
        }
    }

    // Story C-02.2: DELETE /api/cart - Clear Entire Cart
    async clearCart(req, res) {
        try {
            const userId = req.user.id;
            await cartService.clearCart(userId);
            
            // Return 204 No Content (no response body)
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CartController();