// services/user.service.js
const userRepository = require('../repositories/user.repository');

class UserService {
    async getAllUsers() {
        // Here you could add business logic, e.g., check user permissions
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async createUser(userData) {
        // Example of business logic: validate email format
        if (!userData.email || !userData.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        // Example of business logic: check for duplicate email
        // Note: The database already has a UNIQUE constraint, but doing it here
        // allows for a friendlier error message.
        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();
