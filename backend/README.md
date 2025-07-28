# Todo Backend API

A simple RESTful API for a Todo application built with Node.js and Express. This backend is designed to demonstrate Playwright testing capabilities.

## Features

- ✅ Complete CRUD operations for todos
- 🔐 Simple authentication system
- 📝 Input validation and error handling
- 🕒 Timestamps for todos
- 🎯 Completion status tracking
- 🧪 Testing-friendly endpoints

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The API will be available at `http://localhost:3001`

## Authentication

The API uses a simple token-based authentication system for demonstration purposes.

### Login
```bash
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

Response:
```json
{
  "token": "fake-jwt-token",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Using the Token
Include the token in the Authorization header for all protected endpoints:
```
Authorization: Bearer fake-jwt-token
```

## API Endpoints

### Health Check
```bash
GET /health
```
Returns server status and todo count.

### Todos

#### Get All Todos
```bash
GET /items
Authorization: Bearer fake-jwt-token
```

#### Get Single Todo
```bash
GET /items/:id
Authorization: Bearer fake-jwt-token
```

#### Create Todo
```bash
POST /items
Authorization: Bearer fake-jwt-token
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": false
}
```

#### Update Todo
```bash
PUT /items/:id
Authorization: Bearer fake-jwt-token
Content-Type: application/json

{
  "title": "Buy groceries and milk",
  "completed": true
}
```

#### Toggle Todo Completion
```bash
PATCH /items/:id/toggle
Authorization: Bearer fake-jwt-token
```

#### Delete Todo
```bash
DELETE /items/:id
Authorization: Bearer fake-jwt-token
```

#### Delete All Todos (Testing)
```bash
DELETE /items
Authorization: Bearer fake-jwt-token
```

## Todo Object Structure

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## Testing with Playwright

This API is designed to be easily testable with Playwright. Key features for testing:

1. **Predictable responses** - All endpoints return consistent JSON responses
2. **Simple authentication** - Fixed token for easy testing
3. **Reset capability** - DELETE `/items` to clear all todos
4. **Health check** - GET `/health` to verify server status
5. **Error handling** - Proper HTTP status codes and error messages

### Example Test Setup
```javascript
// Login and get token
const loginResponse = await request.post('/login', {
  data: { username: 'admin', password: 'admin' }
});
const { token } = await loginResponse.json();

// Use token for authenticated requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## Development

- **Development mode**: `npm run dev` (uses nodemon for auto-restart)
- **Production mode**: `npm start`

## Notes

- Data is stored in memory and will be lost on server restart
- This is a demonstration API - not suitable for production use
- Authentication is simplified for testing purposes
- All timestamps are in ISO format 