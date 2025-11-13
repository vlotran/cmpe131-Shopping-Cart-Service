const cartRepository = require('../repositories/cart.repository');

class CartService {
    // Story C-02.1: View Cart Contents
    async getCart(userId) {
        const cart = await cartRepository.getOrCreateCart(userId);
        return await cartRepository.getCartWithItems(cart.id);
    }

    // Story C-01.1: Add an Item to the Cart
    async addItem(userId, productId, quantity) {
        // Validation
        if (!productId) {
            throw new Error('Product ID is required');
        }

        if (!quantity || quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        // Get or create cart
        const cart = await cartRepository.getOrCreateCart(userId);

        // Add item to cart (will increase quantity if already exists)
        await cartRepository.addItem(cart.id, productId, quantity);

        // Return updated cart
        return await cartRepository.getCartWithItems(cart.id);
    }

    // Story C-01.2: Update Item Quantity in Cart
    async updateItem(userId, productId, quantity) {
        // Validation
        if (quantity === undefined || quantity === null) {
            throw new Error('Quantity is required');
        }

        if (quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }

        const cart = await cartRepository.getOrCreateCart(userId);

        // If quantity is 0, remove the item entirely
        if (quantity === 0) {
            const changes = await cartRepository.removeItem(cart.id, productId);
            if (changes === 0) {
                throw new Error('Item not found in cart');
            }
        } else {
            // Update the quantity
            const changes = await cartRepository.updateItemQuantity(cart.id, productId, quantity);
            if (changes === 0) {
                throw new Error('Item not found in cart');
            }
        }

        return await cartRepository.getCartWithItems(cart.id);
    }

    // Story C-01.3: Remove an Item from the Cart
    async removeItem(userId, productId) {
        const cart = await cartRepository.getOrCreateCart(userId);
        const changes = await cartRepository.removeItem(cart.id, productId);

        if (changes === 0) {
            throw new Error('Item not found in cart');
        }

        return await cartRepository.getCartWithItems(cart.id);
    }

    // Story C-02.2: Clear the Entire Cart
    async clearCart(userId) {
        const cart = await cartRepository.getOrCreateCart(userId);
        await cartRepository.clearCart(cart.id);
        return null;
    }
}

module.exports = new CartService();