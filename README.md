```markdown
# Shopping Cart Service - CMPE 131

A RESTful microservice for managing shopping carts, built with Node.js, Express, and SQLite.

## ✨ Features

- Complete CRUD operations for shopping cart management
- User-specific cart isolation
- SQLite database with automatic schema creation
- Mock authentication (ready for JWT integration)
- Interactive API documentation with Swagger UI
- CORS enabled for frontend integration

---

## 📂 Project Structure

```
ShoppingCartService_CMPE131/
│
├── 📂 node_modules/                    # Dependencies managed by npm
│
├── 📂 src/
│   │
│   ├── 📂 api/
│   │   ├── 📂 controllers/             # Request/response handlers
│   │   │   ├── user.controller.js      # User CRUD operations
│   │   │   └── cart.controller.js      # Cart operations (getCart, addItem, updateItem, removeItem, clearCart)
│   │   │
│   │   ├── 📂 routes/                  # API endpoint definitions
│   │   │   ├── user.routes.js          # User API routes
│   │   │   └── cart.routes.js          # Cart API routes (GET, POST, PUT, DELETE /api/cart)
│   │   │
│   │   └── 📂 middlewares/             # Reusable middleware functions
│   │       └── auth.middleware.js      # Authentication via x-user-id header (mock JWT)
│   │
│   ├── 📂 config/
│   │   └── database.js                 # SQLite connection and table initialization
│   │
│   ├── 📂 database/
│   │   ├── schema.sql                  # Cart and cart_items table definitions
│   │   └── seed.js                     # Test data seeding script
│   │
│   ├── 📂 services/                    # Business logic layer
│   │   ├── user.service.js             # User business logic
│   │   └── cart.service.js             # Cart operations with validation and product verification
│   │
│   ├── 📂 repositories/                # Data access layer
│   │   ├── user.repository.js          # User database queries
│   │   └── cart.repository.js          # Cart database queries (CRUD operations)
│   │
│   ├── 📂 utils/                       # Helper/utility functions
│   │
│   ├── app.js                          # Express app configuration and middleware setup
│   └── server.js                       # Application entry point, starts HTTP server
│
├── .env                                # Environment variables (local only, not committed)
├── .env.example                        # Environment configuration template
├──  openapi.yaml                       # API specification
├── .gitignore                          # Files and folders for Git to ignore
├── db.sqlite                           # SQLite database file (auto-created, ignored by git)
├── package.json                        # Project metadata and dependencies
├── package-lock.json                   # Dependency version lock file
└── README.md                           # Project documentation
---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ShoppingCartService_CMPE131.git
   cd ShoppingCartService_CMPE131
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

   Server runs at `http://localhost:3000`

---

## 📋 API Endpoints

All cart endpoints require the `x-user-id` header for authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get user's cart |
| `POST` | `/api/cart/items` | Add item to cart |
| `PUT` | `/api/cart/items/:productId` | Update item quantity |
| `DELETE` | `/api/cart/items/:productId` | Remove item |
| `DELETE` | `/api/cart` | Clear cart |

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api-docs` | Swagger UI documentation |

---

## 🧪 Testing

### Using Swagger UI (Recommended)

1. Visit `http://localhost:3000/api-docs`
2. Click on any endpoint
3. Click "Try it out"
4. Enter `1` for the `x-user-id` parameter
5. Click "Execute"

### Using Postman

**Get Cart:**
```http
GET http://localhost:3000/api/cart
Headers:
  x-user-id: 1
```

**Add Item:**
```http
POST http://localhost:3000/api/cart/items
Headers:
  x-user-id: 1
  Content-Type: application/json
Body:
{
  "productId": 101,
  "quantity": 2
}
```

**Update Item:**
```http
PUT http://localhost:3000/api/cart/items/101
Headers:
  x-user-id: 1
  Content-Type: application/json
Body:
{
  "quantity": 5
}
```

**Remove Item:**
```http
DELETE http://localhost:3000/api/cart/items/101
Headers:
  x-user-id: 1
```

**Clear Cart:**
```http
DELETE http://localhost:3000/api/cart
Headers:
  x-user-id: 1
```

---

## 🗄️ Database Schema

**Carts Table:**
- `id` - Primary key
- `user_id` - User identifier (unique)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

**Cart Items Table:**
- `id` - Primary key
- `cart_id` - Foreign key to carts
- `product_id` - Product identifier
- `quantity` - Item quantity
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

---

## 🔐 Authentication

Uses mock authentication with `x-user-id` header for development.

**Example:**
```
x-user-id: 1
```

Ready for JWT integration (see `auth.middleware.js`).

---

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server |
| `npm run dev` | Start with auto-reload |
| `npm run seed` | Seed test data |

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment |
| `DB_PATH` | `./db.sqlite` | Database path |

---

## 📦 Dependencies

- **express** - Web framework
- **sqlite** / **sqlite3** - Database
- **swagger-ui-express** - API documentation
- **yamljs** - YAML parsing
- **cors** - Cross-origin support
- **dotenv** - Environment variables

---

## 👥 Team

- Vy Tran - CMPE 131
- Melody Deng - CMPE 131  
- Ben Olson - CMPE 131

---

## 📄 License

Educational project for CMPE 131 coursework.
```
