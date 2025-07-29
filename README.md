# Todo-Automation

A simple full-stack Todo app with Node.js/Express backend, React frontend, and Playwright E2E tests. Includes CI/CD with GitHub Actions.

## 🚀 Quick Start

```bash
# 1. Clone the repo
 git clone <your-repo-url>
 cd Todo-Automation

# 2. Install all dependencies
 npm install

# 3. Install Playwright browsers
 npx playwright install

# 4. Start backend & frontend (in two terminals):
 npm run backend:dev   # http://localhost:3001
 npm run frontend:dev  # http://localhost:3000
```

## 🧪 Run Tests

```bash
# UI tests (Playwright)
npm test

# API tests (Newman/Postman)
npm run api:test

# Run tests with code coverage
npm run test

# View coverage report
npm run coverage:show
```

## 📊 Code Coverage

This project includes code coverage collection for frontend code during Playwright E2E tests.

### **Run Coverage:**
```bash
# Run tests with coverage collection
npm run test

# View the HTML coverage report
npm run coverage:show
```

### **Coverage Reports:**
- **HTML Report**: Interactive coverage report showing which lines of code were executed
- **Coverage Metrics**: 
  - **Statements**: Lines of code executed
  - **Branches**: Conditional paths taken
  - **Functions**: Functions called during tests
  - **Lines**: Lines covered by tests

### **What's Covered:**
- React components rendered during tests
- User interactions and form submissions
- Navigation and state changes
- API calls and error handling

## 🔑 Demo Login
- Username: `admin`
- Password: `admin`

## 🛠️ Troubleshooting
- If `npm ci` fails in CI, make sure `package-lock.json` is committed for each app.
- Never commit `node_modules/`.
- For more help, open an issue or check the code comments.

## 📦 Project Structure
- `backend/`   — Node.js API
- `frontend/`  — React app
- `tests/`     — Playwright E2E tests
- `.github/`   — CI/CD workflows

## 📬 Sample API Requests

### Login

**Request:**
```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

**Response:**
```json
{
  "token": "fake-jwt-token",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Get All Todos

**Request:**
```bash
curl -X GET http://localhost:3001/items \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
]
```

---
For advanced usage, see code comments or open an issue on GitHub.

## 🖼️ UI Test & Results Screenshots

Below are example screenshots from Playwright UI tests and test result reports. All screenshots are located in the `screenshots/` folder.

<p align="center">
  <img src="screenshots/Screenshot%202025-07-29%20at%2012.30.06.png" width="250" />
  <img src="screenshots/Screenshot%202025-07-29%20at%2012.30.33.png" width="250" />
  <img src="screenshots/Screenshot%202025-07-29%20at%2012.56.58.png" width="250" />
  <img src="screenshots/Screenshot%202025-07-29%20at%2012.57.59.png" width="250" />
  <img src="screenshots/Screenshot%202025-07-29%20at%2013.00.14.png" width="250" />
</p>