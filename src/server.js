// server.js
// 1. Load environment variables from .env file
require('dotenv').config();

const app = require('./app.js');

// 2. Use the PORT from process.env, with a fallback for safety
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
