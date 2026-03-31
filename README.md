# ParadipService - Full Stack MERN Website

ParadipService is a complete MERN-based home appliance repair platform for Odisha and nearby regions.

Tagline: **Fast and Reliable Home Appliance Repair at Your Doorstep**

## Tech Stack

- Frontend: React + Tailwind CSS + React Router
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Integrations: Axios, Nodemailer, JWT, WhatsApp API hook

## Project Structure

```text
ParadipService/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      app.js
      server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
      App.jsx
      main.jsx
```

## Backend Environment Setup

1. Copy `backend/.env.example` to `backend/.env`
2. Set values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/paradipservice
JWT_SECRET=change_this_secret
ADMIN_EMAIL=admin@paradipservice.com
ADMIN_PASSWORD=StrongPassword123

BUSINESS_EMAIL=hello@paradipservice.in
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password_or_app_password
SMTP_FROM=ParadipService <no-reply@paradipservice.in>
CUSTOMER_CONFIRMATION_EMAIL=

WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
WHATSAPP_TO=
```

## Frontend Environment Setup

1. Copy `frontend/.env.example` to `frontend/.env`
2. Set values:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=919999999999
```

## Install & Run

```bash
npm --prefix backend install
npm --prefix frontend install
```

Run backend:

```bash
npm run dev:backend
```

Run frontend:

```bash
npm run dev:frontend
```

## Seed Pricing & Service Data

```bash
npm run seed
```

This inserts the requested AC, refrigerator, washing machine, and Odisha rate card pricing data.

## Implemented API Endpoints

- `POST /api/bookings` -> Create booking
- `GET /api/bookings` -> Get all bookings (admin)
- `PUT /api/bookings/:id` -> Update booking status (admin)
- `GET /api/services` -> List services
- `GET /api/pricing` -> Get dynamic pricing
- `POST /api/contact` -> Save enquiry
- `GET /api/contact` -> List enquiries (admin)
- `POST /api/auth/login` -> Admin login and JWT

## Frontend Pages

- Home
- AC Service
- Services
- Service Charges (dynamic)
- Book Now (booking form)
- Contact Us
- Admin Login
- Admin Dashboard

## Features Included

- Responsive UI with blue-white-green brand theme
- Navbar dropdown menus
- Booking system with validation and toast notifications
- Nodemailer confirmation hook on booking
- Optional WhatsApp API notification hook
- Floating WhatsApp chat button
- Admin panel with JWT authentication
- Booking status update (Pending/Completed)
- Pricing management (create/delete)
- Enquiry viewer in admin dashboard
- SEO meta setup
- Loading spinner and error handling

## Deployment Guide

### Option 1: Railway (Backend)

1. Create new Railway project from GitHub repo.
2. Set root directory to `backend`.
3. Add environment variables from `.env`.
4. Build command: `npm install`
5. Start command: `npm start`

### Option 2: Render (Backend)

1. Create Web Service in Render.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all backend env vars.

### Option 3: Vercel (Frontend)

1. Create Vercel project.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_BASE_URL` pointing to deployed backend API.

## Notes

- Pricing and services are stored in MongoDB and fetched dynamically from API.
- Email and WhatsApp notifications are optional and controlled by environment variables.
