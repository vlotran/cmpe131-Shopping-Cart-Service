# Shopping Cart Service - CMPE 131

A scalable Node.js microservice for managing shopping cart operations, built with Express and SQLite. This service follows a layered architecture with clear separation of concerns between API, business logic, and data access layers.

## ✨ Features

* **Complete Shopping Cart API**: Full CRUD operations for cart management
* **Layered Architecture**: Separation of concerns with API, Service, and Repository layers
* **SQLite Database**: Lightweight, file-based database with foreign key support
* **User Isolation**: Each user has their own cart with automatic creation
* **Mock Authentication**: Header-based authentication (ready for JWT integration)
* **Auto-increment Quantities**: Adding existing items increases quantity automatically
* **Input Validation**: Comprehensive validation for all cart operations
* **Test Data Seeding**: Populate database with sample data for testing

-----

## 📂 Folder Structure

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
│   │   │   └── cart.controller.js      # Cart operations
│   │   │
│   │   ├── 📂 routes/                  # API endpoint definitions
│   │   │   ├── user.routes.js          # User API routes
│   │   │   └── cart.routes.js          # Cart API routes
│   │   │
│   │   └── 📂 middlewares/             # Reusable middleware functions
│   │       └── auth.middleware.js      # Authentication middleware
│   │
│   ├── 📂 config/
│   │   └── database.js                 # SQLite connection and initialization
│   │
│   ├── 📂 database/
│   │   ├── schema.sql                  # Cart table definitions
│   │   └── seed.js                     # Test data seeding script
│   │
│   ├── 📂 services/                    # Business logic layer
│   │   ├── user.service.js             # User business logic
│   │   └── cart.service.js             # Cart operations with validation
│   │
│   ├── 📂 repositories/                # Data access layer
│   │   ├── user.repository.js          # User database queries
│   │   └── cart.repository.js          # Cart database queries
│   │
│   ├── 📂 utils/                       # Helper/utility functions
│   │
│   ├── app.js                          # Express app configuration
│   └── server.js                       # Application entry point
│
├── .env                                # Environment variables (not committed)
├── .env.example                        # Environment configuration template
├── .gitignore                          # Git ignore rules
├── db.sqlite                           # SQLite database (auto-created)
├── package.json                        # Project metadata and dependencies
├── package-lock.json                   # Dependency version lock
└── README.md                           # Project documentation
```

-----

## 🚀 How a Request Flows

Here's how a `POST` request to `/api/cart/items` travels through the application:

1. **`server.js`**: Starts the server and initializes the database
2. **`app.js`**: Receives the request and routes to appropriate handler
3. **`api/routes/cart.routes.js`**: Matches the `POST /cart/items` endpoint
4. **`api/middlewares/auth.middleware.js`**: Verifies user authentication via `x-user-id` header
5. **`api/controllers/cart.controller.js`**: Extracts request data and calls `cartService.addItem()`
6. **`services/cart.service.js`**: Validates input, performs business logic, calls repository
7. **`repositories/cart.repository.js`**: Executes database queries (INSERT/UPDATE)
8. **Response**: Result flows back up, controller sends JSON response with status code

-----

## 🏁 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or later)
* [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)

### Installation & Setup

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

   Edit `.env` with your configuration:

   ```env
   PORT=3000
   NODE_ENV=development
   DB_PATH=./db.sqlite
   PRODUCT_CATALOG_URL=http://localhost:3001
   ```

4. **Seed the database (optional):**

   ```bash
   npm run seed
   ```

   This creates test users and sample cart data.

5. **Start the server:**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

-----

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Start the server in production mode |
| **Development** | `npm run dev` | Start with nodemon (auto-restart on changes) |
| **Seed** | `npm run seed` | Populate database with test data |

-----

## 📋 API Endpoints

All cart endpoints require authentication via `x-user-id` header.

### Shopping Cart API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/cart` | Get current user's cart | ✅ Yes |
| `POST` | `/api/cart/items` | Add item to cart | ✅ Yes |
| `PUT` | `/api/cart/items/:productId` | Update item quantity | ✅ Yes |
| `DELETE` | `/api/cart/items/:productId` | Remove item from cart | ✅ Yes |
| `DELETE` | `/api/cart` | Clear entire cart | ✅ Yes |

### User API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Retrieve all users |
| `GET` | `/user/:id` | Retrieve a single user by ID |
| `POST` | `/user` | Create a new user |
| `PATCH` | `/user/:id` | Update an existing user |
| `DELETE` | `/user/:id` | Delete a user by ID |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/` | Service information |

-----

## 🧪 Testing with Postman/Thunder Client

### 1. View Cart

```http
GET http://localhost:3000/api/cart
Headers:
  x-user-id: 1
```

**Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "cart_id": 1,
    "user_id": 1,
    "items": [],
    "item_count": 0
  }
}
```

### 2. Add Item to Cart

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

**Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "cart_id": 1,
    "user_id": 1,
    "items": [
      {
        "id": 1,
        "product_id": 101,
        "quantity": 2,
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-15T10:30:00.000Z"
      }
    ],
    "item_count": 1
  }
}
```

### 3. Update Item Quantity

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

### 4. Remove Item

```http
DELETE http://localhost:3000/api/cart/items/101
Headers:
  x-user-id: 1
```

### 5. Clear Cart

```http
DELETE http://localhost:3000/api/cart
Headers:
  x-user-id: 1
```

**Response: 204 No Content** (empty response)

-----

## 🗄️ Database Schema

### Carts Table
```sql
CREATE TABLE carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    UNIQUE(cart_id, product_id)
);
```

-----

## 🔐 Authentication

Currently uses **mock authentication** via `x-user-id` header for development.

**Example:**
```http
x-user-id: 1
```

**Future Implementation:** JWT-based authentication (placeholder included in `auth.middleware.js`)

-----

## 📝 User Stories Implemented

### EPIC C-01: Cart Item Management
- ✅ **C-01.1**: Add item to cart with automatic quantity increment
- ✅ **C-01.2**: Update item quantity (quantity 0 removes item)
- ✅ **C-01.3**: Remove item from cart

### EPIC C-02: Cart State & Viewing
- ✅ **C-02.1**: View cart contents
- ✅ **C-02.2**: Clear entire cart (204 No Content)

### EPIC C-03: Service & Data Integrity
- ✅ **C-03.1**: Product verification placeholder (ready for Product Catalog Service integration)

-----

## 🛡️ Error Handling

| Status Code | Scenario | Example |
|-------------|----------|---------|
| `200 OK` | Successful operation | Cart retrieved, item added/updated/removed |
| `204 No Content` | Cart cleared | Empty response body |
| `400 Bad Request` | Invalid input | Missing productId, negative quantity |
| `401 Unauthorized` | Missing authentication | No x-user-id header |
| `404 Not Found` | Resource not found | Item not in cart, product doesn't exist |
| `500 Internal Server Error` | Server error | Database connection failure |

-----

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DB_PATH` | SQLite database path | `./db.sqlite` |
| `PRODUCT_CATALOG_URL` | Product service URL | `http://localhost:3001` |

-----

## 🤝 Contributing

This is a class project for CMPE 131. For collaboration:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "feat: add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

-----

## 📄 License

This project is for educational purposes as part of CMPE 131 coursework.

-----

## 👥 Authors

- Vy Tran  - CMPE 131 Student
- Melody Deng  - CMPE 131 Student
- Ben Olson - CMPE 131 Student

