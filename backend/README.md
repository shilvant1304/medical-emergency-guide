# India Health Aid Backend

Backend API for the India Health Aid project built with Express.js and MongoDB.

## Features

- 🏥 **Disease Management** - CRUD operations for diseases with search functionality
- 👤 **User Authentication** - Registration and login with JWT tokens
- 🔐 **Role-Based Access Control** - Admin and user roles
- 📊 **Admin Dashboard** - Stats and user management
- 🔒 **Secure** - Password hashing with bcryptjs
- 🗄️ **MongoDB** - NoSQL database for storage

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your configuration:**
   ```
   MONGODB_URI=mongodb://localhost:27017/india-health-aid
   PORT=5000
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

## Running the Backend

### Development Mode
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Diseases
- `GET /api/diseases` - Get all diseases (with search/filter)
  - Query params: `search`, `category`, `severity`
- `GET /api/diseases/:id` - Get disease by ID
- `POST /api/diseases` - Create disease (Admin only)
- `PUT /api/diseases/:id` - Update disease (Admin only)
- `DELETE /api/diseases/:id` - Delete disease (Admin only)

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ username, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/me` - Get current user (Protected)

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)
- `DELETE /api/admin/users/:id` - Delete user (Admin only)
- `PATCH /api/admin/users/:id/role` - Update user role (Admin only)

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## MongoDB Models

### Disease
- `name` (String, required, unique)
- `description` (String, required)
- `symptoms` (Array of strings)
- `prevention` (Array of strings)
- `treatment` (Array of strings)
- `category` (String: infectious, chronic, genetic, mental, other)
- `severity` (String: low, medium, high)
- `createdAt` (Date)
- `updatedAt` (Date)

### User
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String: user, admin)
- `createdAt` (Date)
- `updatedAt` (Date)

## Development

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.ts        # Main server file
├── package.json
├── tsconfig.json
└── .env.example
```

## Future Enhancements

- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add disease rating/reviews
- [ ] Add user favorites
- [ ] Add API rate limiting
- [ ] Add comprehensive logging
- [ ] Add automated tests
- [ ] Add API documentation with Swagger

## License

MIT
