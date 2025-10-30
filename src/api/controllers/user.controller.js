// api/controllers/user.controller
const userService = require('../../services/user.service');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json({ message: "success", data: users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json({ message: "success", data: user });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json({ message: "success", data: newUser });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const result = await userService.updateUser(req.params.id, req.body);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: "success", changes: result.changes });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: "deleted", changes: result.changes });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UserController();
