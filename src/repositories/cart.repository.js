const { getDatabase } = require('../config/database');

class CartRepository {
    // Get or create cart for a user
    async getOrCreateCart(userId) {
        const db = await getDatabase();
        
        let cart = await db.get(
            'SELECT * FROM carts WHERE user_id = ?',
            [userId]
        );

        if (!cart) {
            const result = await db.run(
                'INSERT INTO carts (user_id) VALUES (?)',
                [userId]
            );
            cart = {
                id: result.lastID,
                user_id: userId
            };
        }

        return cart;
    }

    // Get cart with items
    async getCartWithItems(cartId) {
        const db = await getDatabase();
        
        const rows = await db.all(`
            SELECT 
                c.id as cart_id,
                c.user_id,
                ci.id as item_id,
                ci.product_id,
                ci.quantity,
                ci.created_at,
                ci.updated_at
            FROM carts c
            LEFT JOIN cart_items ci ON c.id = ci.cart_id
            WHERE c.id = ?
        `, [cartId]);

        const cart = {
            cart_id: cartId,
            user_id: rows[0]?.user_id,
            items: rows
                .filter(row => row.item_id !== null)
                .map(row => ({
                    id: row.item_id,
                    product_id: row.product_id,
                    quantity: row.quantity,
                    created_at: row.created_at,
                    updated_at: row.updated_at
                })),
            item_count: rows.filter(row => row.item_id !== null).length
        };

        return cart;
    }

    // Add item to cart
    async addItem(cartId, productId, quantity) {
        const db = await getDatabase();

        // Check if item already exists
        const existingItem = await db.get(
            'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );

        if (existingItem) {
            // Update existing item - increase quantity
            await db.run(
                `UPDATE cart_items 
                 SET quantity = quantity + ?,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE cart_id = ? AND product_id = ?`,
                [quantity, cartId, productId]
            );
            return { id: existingItem.id, updated: true };
        } else {
            // Insert new item
            const result = await db.run(
                `INSERT INTO cart_items (cart_id, product_id, quantity)
                 VALUES (?, ?, ?)`,
                [cartId, productId, quantity]
            );
            return { id: result.lastID, updated: false };
        }
    }

    // Update item quantity
    async updateItemQuantity(cartId, productId, quantity) {
        const db = await getDatabase();

        const result = await db.run(
            `UPDATE cart_items 
             SET quantity = ?, 
                 updated_at = CURRENT_TIMESTAMP
             WHERE cart_id = ? AND product_id = ?`,
            [quantity, cartId, productId]
        );

        return result.changes;
    }

    // Remove item from cart
    async removeItem(cartId, productId) {
        const db = await getDatabase();

        const result = await db.run(
            'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );

        return result.changes;
    }

    // Clear cart (delete all items)
    async clearCart(cartId) {
        const db = await getDatabase();

        const result = await db.run(
            'DELETE FROM cart_items WHERE cart_id = ?',
            [cartId]
        );

        return result.changes;
    }
}

module.exports = new CartRepository();