// api/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// --- User API Routes ---

// GET /api/users - Retrieve all users
router.get("/users", userController.getAllUsers);

// GET /api/user/:id - Retrieve a single user by their ID
router.get("/user/:id", userController.getUserById);

// POST /api/user - Create a new user
router.post("/user", userController.createUser);

// PATCH /api/user/:id - Update an existing user's details
router.patch("/user/:id", userController.updateUser);

// DELETE /api/user/:id - Delete a user
router.delete("/user/:id", userController.deleteUser);

module.exports = router;

