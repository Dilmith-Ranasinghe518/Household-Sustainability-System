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
PORT=5500
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_key
```

Backend runs at:
```
http://localhost:5500/api
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
http://localhost:5500/api
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
