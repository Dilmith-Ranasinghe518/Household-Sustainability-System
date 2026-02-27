# 🌱 Household Sustainability System

A full-stack sustainability platform that helps households monitor energy usage, report electricity issues, manage waste, access disaster alerts, use a green marketplace, and receive AI-powered sustainability recommendations.

---

# 🌍 Live Deployment

### Backend (Render)
https://household-sustainability-system.onrender.com/api

### Frontend
Hosted on Vercel (or run locally using Vite)

---

# ✨ System Features

## 1️⃣ User Management System
- User registration with OTP verification
- Secure login using JWT
- Forgot password & reset password
- Role-based access (User / Admin)
- Protected routes

---

## 2️⃣ Waste Management System
- Users create and track waste logs
- Admin monitors all waste entries
- MongoDB-based data storage

---

## 3️⃣ Sustainability Marketplace
- Product listing
- Create, update, delete products
- User-specific product management
- Order creation
- Automatic order expiry via cron job

---

## 4️⃣ Issue Reporting & Management (Support Tickets)
- Users report electricity-related issues
- Provide bill amount, kWh usage, and time period
- Admin reviews and responds
- Ticket status tracking:
  - new
  - need_more_info
  - in_progress
  - resolved
  - closed
- Message thread between user and admin

---

## 5️⃣ Disaster Management System
- Admin creates disaster alerts (Flood, Fire, etc.)
- Update severity and status
- Users view disaster alerts

---

## 6️⃣ Recommendation, Actions & Blog System
- Sustainability action tracking
- Blog/article publishing
- Gemini AI integration
- Weather API integration

---

# 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Security
- JWT Authentication
- Role-based Authorization
- CORS configuration
- Input validation
- Error handling

### Deployment
- Backend → Render
- Frontend → Vercel

---

# 🏗 Project Structure

## Backend
```
backend/
 ├── src/
 │   ├── index.js
 │   ├── routes/
 │   ├── controllers/
 │   ├── models/
 │   ├── middleware/
 │   ├── services/
 │   └── utils/
```

## Frontend
```
frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── layouts/
 │   ├── services/
 │   ├── config/
 │   └── context/
```

---

# ⚙️ Local Setup

## Backend Setup
```bash
cd backend
npm install
npm start
```

Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_key
```

Backend runs at:
```
http://localhost:5000/api
```

---

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# 🌐 API Documentation

## Base URL

Production:
```
https://household-sustainability-system.onrender.com/api
```

Local:
```
http://localhost:5000/api
```

---

# 🔑 AUTH API (/api/auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register/initiate | Start registration and send OTP |
| POST | /auth/register/verify | Verify OTP |
| POST | /auth/register/complete | Complete registration |
| POST | /auth/login | Login and receive JWT |
| POST | /auth/forgot-password | Send reset link |
| POST | /auth/reset-password | Reset password |

---

# 👤 USER API (/api/user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /user/profile | Get logged-in user profile |

---

# 🛡 ADMIN API (/api/admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/dashboard | Admin dashboard |
| GET | /admin/users | Get all users |
| PUT | /admin/users/:id | Update user |
| DELETE | /admin/users/:id | Delete user |

---

# ⚡ ISSUE MANAGEMENT (/api/issues)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /issues | Create support ticket |
| GET | /issues/my | Get user tickets |
| GET | /issues/:id | Get specific ticket |
| POST | /issues/:id/messages | Add message |
| GET | /issues | Get all tickets |
| PUT | /issues/:id | Update ticket |
| DELETE | /issues/:id | Delete ticket |

---

# 🌪 DISASTER MANAGEMENT (/api/disasters)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /disasters | Get disasters |
| GET | /disasters/:id | Get single disaster |
| POST | /disasters | Create disaster |
| PUT | /disasters/:id | Update disaster |
| DELETE | /disasters/:id | Delete disaster |

---

# ♻️ WASTE MANAGEMENT (/api/waste)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /waste | Get user waste logs |
| POST | /waste | Create waste entry |
| PUT | /waste/:id | Update waste |
| GET | /waste/all | Get all waste records |

---

# 🛒 MARKETPLACE PRODUCTS (/api/products)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products |
| GET | /products/:id | Get single product |
| POST | /products | Create product |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| GET | /products/my | Get user's products |
| GET | /products/admin | Get all products (admin) |

---

# 📦 ORDERS (/api/orders)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /orders | Create order |
| GET | /orders | Get user orders |
| GET | /orders/admin | Get all orders |
| PUT | /orders/:id | Update order status |

---

# 📝 ARTICLES (/api/articles)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /articles | Get published articles |
| GET | /articles/:id | Get single article |
| POST | /articles | Create article |
| PUT | /articles/:id | Update article |
| DELETE | /articles/:id | Delete article |

---

# 📊 ACTIONS (/api/actions)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /actions | Get actions |
| POST | /actions | Create action |
| PUT | /actions/:id | Update action |
| DELETE | /actions/:id | Delete action |

---

# 🤖 GEMINI API (/api/gemini)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /gemini | Get AI recommendation |

---

# 🌦 WEATHER API (/api/weather)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /weather | Get weather data |

---

# 📘 API Usage Guide

This document explains:

- HTTP Methods used
- Authentication requirements
- Request format
- Response format
- Example requests & responses

Base URL (Production):
https://household-sustainability-system.onrender.com/api

Base URL (Local):
http://localhost:5000/api

------------------------------------------------------------

# 📌 HTTP Methods Used

GET
- Used to retrieve data
- Does NOT modify data

POST
- Used to create new data

PUT
- Used to update existing data

DELETE
- Used to remove data

------------------------------------------------------------

# 🔐 Authentication Requirements

Most protected endpoints require JWT authentication.

After login, the server returns a JWT token.

All protected requests must include this header:

Authorization: Bearer <JWT_TOKEN>

Example:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Admin-only endpoints require:
- Valid JWT
- role = "admin"

------------------------------------------------------------

# 📄 Request Format

All requests use JSON format.

Headers:

Content-Type: application/json

Example Request Body:

{
  "title": "High electricity bill",
  "monthlyBillLKR": 6777,
  "monthlyKwh": 321
}

------------------------------------------------------------

# 📦 Response Format

Success Response Example:

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error Response Example:

{
  "success": false,
  "message": "Error message"
}

Note:
Some endpoints return direct objects or arrays instead of wrapped "success/data".

------------------------------------------------------------

# 🔑 AUTHENTICATION EXAMPLE

## Login

POST /api/auth/login

Request:

{
  "email": "user@gmail.com",
  "password": "123456"
}

Response:

{
  "success": true,
  "token": "jwt_token_here"
}

------------------------------------------------------------

# ⚡ ISSUE MANAGEMENT EXAMPLE

## Create Support Ticket

POST /api/issues
Authorization: Bearer <JWT_TOKEN>

Request:

{
  "title": "High electricity bill",
  "category": "High Bill",
  "monthlyBillLKR": 6777,
  "monthlyKwh": 321,
  "text": "My bill increased suddenly."
}

Response:

{
  "_id": "66aa123",
  "title": "High electricity bill",
  "status": "new",
  "priority": "low"
}

------------------------------------------------------------

# 🌪 DISASTER MANAGEMENT EXAMPLE

## Create Disaster (Admin Only)

POST /api/disasters
Authorization: Bearer <ADMIN_TOKEN>

Request:

{
  "title": "Flood Warning",
  "type": "Flood",
  "severity": "high",
  "status": "active"
}

Response:

{
  "_id": "77bb123",
  "title": "Flood Warning",
  "severity": "high",
  "status": "active"
}

------------------------------------------------------------

# 🛒 MARKETPLACE EXAMPLE

## Create Product

POST /api/products
Authorization: Bearer <JWT_TOKEN>

Request:

{
  "name": "Reusable Bottle",
  "price": 2500,
  "stock": 10
}

Response:

{
  "_id": "99dd123",
  "name": "Reusable Bottle",
  "price": 2500
}

------------------------------------------------------------

# ♻️ WASTE MANAGEMENT EXAMPLE

## Create Waste Entry

POST /api/waste
Authorization: Bearer <JWT_TOKEN>

Request:

{
  "type": "Plastic",
  "quantity": 5
}

Response:

{
  "_id": "88cc123",
  "type": "Plastic",
  "quantity": 5
}

------------------------------------------------------------

# 📦 ORDER EXAMPLE

## Create Order

POST /api/orders
Authorization: Bearer <JWT_TOKEN>

Request:

{
  "productId": "99dd123",
  "quantity": 2
}

Response:

{
  "_id": "aaee123",
  "status": "pending",
  "quantity": 2
}

------------------------------------------------------------

# 📝 ARTICLE EXAMPLE

## Create Article (Admin)

POST /api/articles
Authorization: Bearer <ADMIN_TOKEN>

Request:

{
  "title": "Save Energy",
  "content": "Reduce AC usage",
  "isPublished": true
}

Response:

{
  "success": true,
  "message": "Article created successfully"
}

------------------------------------------------------------

# 🤖 GEMINI AI EXAMPLE

POST /api/gemini
Authorization: Bearer <JWT_TOKEN>

Request:

{
  "prompt": "Give energy saving tips"
}

Response:

{
  "success": true,
  "answer": "Try using LED bulbs and reduce standby power."
}

------------------------------------------------------------

# 🌦 WEATHER API EXAMPLE

GET /api/weather?city=Colombo

Response:

{
  "city": "Colombo",
  "temp": 29,
  "condition": "Cloudy"
}

# 🚀 Future Improvements
- Complete full frontend UI polish
- Add unit testing (Jest)
- Add performace testing
- Add load testing
- Add analytics dashboards


---

# 👥 Project Type
Software Engineering Academic Group Project  
Secure RESTful API with MongoDB Integration
