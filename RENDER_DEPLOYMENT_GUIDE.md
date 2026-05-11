# Render Deployment Guide for ParadipService

## Prerequisites
- Render account (https://render.com)
- GitHub account with your repo pushed
- MongoDB Atlas account (free tier available)

---

## PART 1: Set Up MongoDB Atlas (Production Database)

### Step 1: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Create a new Project (e.g., "ParadipService-Production")
4. Click "Create" to build a database
5. Choose "Shared" cluster (free tier)
6. Select region closest to you
7. Wait for cluster creation (~5-10 minutes)

### Step 2: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username: `paradip_admin`
4. Create password: (use strong password - save it!)
5. Set privileges to "Atlas admin"
6. Click "Add User"

### Step 3: Add IP Whitelist
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Enter `0.0.0.0/0` (allows all IPs - safe for production with auth)
4. Click "Confirm"

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `ParadipService`
7. Save this URL - you'll need it for backend!

**Example format:**
```
mongodb+srv://paradip_admin:PASSWORD@cluster0.xxxxx.mongodb.net/ParadipService?retryWrites=true&w=majority
```

---

## PART 2: Deploy Backend to Render

### Step 1: Prepare Backend for Production

**Update backend/.env for Render:**
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://paradip_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ParadipService?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
ADMIN_EMAIL=admin@paradipservice.com
ADMIN_PASSWORD=StrongPassword123
BUSINESS_EMAIL=hello@paradipservice.in
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=ParadipService <no-reply@paradipservice.in>
CUSTOMER_CONFIRMATION_EMAIL=
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
WHATSAPP_TO=
```

**Verify backend/package.json has start script:**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### Step 2: Push to GitHub
```bash
cd ParadipService
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 3: Create Render Web Service for Backend

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Choose "Build and deploy from a Git repository"
4. Connect your GitHub account
5. Select `ParadipService` repository
6. Configure settings:
   - **Name:** `paradipservice-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Starter for production)

7. Click "Advanced"
8. Add Environment Variables (same as your .env file):
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGO_URI=mongodb+srv://paradip_admin:PASSWORD@...`
   - `JWT_SECRET=your_secret`
   - All other variables from .env

9. Click "Deploy Web Service"
10. Wait for deployment to complete (~5-10 minutes)
11. **Copy the Backend URL** from the dashboard (e.g., `https://paradipservice-backend.onrender.com`)

---

## PART 3: Deploy Frontend to Render

### Step 1: Update Frontend Configuration

**Create frontend/.env.production:**
```
VITE_API_URL=https://paradipservice-backend.onrender.com/api
```

**Update frontend/src/services/api.js:**
```javascript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// ... rest of the file
```

### Step 2: Create frontend/build-script.sh
```bash
#!/bin/bash
npm install
npm run build
```

### Step 3: Create Render Static Site for Frontend

1. Go to https://dashboard.render.com
2. Click "New +" → "Static Site"
3. Choose your GitHub repository
4. Configure settings:
   - **Name:** `paradipservice-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

5. Click "Advanced"
6. Add environment variable:
   - **VITE_API_URL:** `https://paradipservice-backend.onrender.com/api`

7. Click "Create Static Site"
8. Wait for build and deployment (~3-5 minutes)
9. **Copy the Frontend URL** (e.g., `https://paradipservice-frontend.onrender.com`)

---

## PART 4: Update CORS and Backend Configuration

### Step 1: Update Backend CORS Settings

**backend/src/app.js:**
```javascript
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "https://paradipservice-frontend.onrender.com",
    "http://localhost:5173",  // for local development
    "http://localhost:3000"
  ],
  credentials: true
}));
```

### Step 2: Deploy Updated Backend

```bash
git add backend/src/app.js
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-deploy when you push to main branch!

---

## PART 5: Verification & Testing

### Check Backend Deployment
1. Open: `https://paradipservice-backend.onrender.com/api/health`
2. Should return: `{"status":"ok","service":"ParadipService API"}`

### Check Frontend Deployment
1. Open: `https://paradipservice-frontend.onrender.com`
2. Click "Book Now"
3. Fill booking form
4. Submit - should save to MongoDB Atlas

### Test Booking Creation
```bash
curl -X POST https://paradipservice-backend.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "applianceType": "AC",
    "serviceType": "AC Repair",
    "address": "Test Address",
    "date": "2026-05-20",
    "time": "10:00",
    "brand": "Blue Star",
    "model": "Test Model",
    "tonnage": "1.5 Ton"
  }'
```

---

## PART 6: Production Checklist

- [ ] MongoDB Atlas cluster created and secured
- [ ] Backend deployed to Render with all env vars
- [ ] Frontend deployed to Render with API URL configured
- [ ] CORS updated to include frontend URL
- [ ] Test booking form submission
- [ ] Check MongoDB Atlas for saved bookings
- [ ] Setup email notifications (configure SMTP)
- [ ] Setup WhatsApp notifications (if needed)
- [ ] Custom domain (optional - in Render settings)
- [ ] Monitor logs in Render dashboard

---

## PART 7: Ongoing Maintenance

### Deploying Updates
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
# Render auto-deploys!
```

### Monitor Backend Logs
- Render Dashboard → Select Backend Service → Logs tab

### Monitor Frontend Logs
- Render Dashboard → Select Frontend Site → Logs tab

### Database Backups
- MongoDB Atlas → Backup settings (auto backups available)

### Scaling (Future)
- Render Dashboard → Service Settings → Upgrade plan for auto-scaling

---

## PART 8: Troubleshooting

### Backend not connecting to database
- Check MONGO_URI in Render env variables
- Verify IP whitelist on MongoDB Atlas
- Check database user password

### Frontend API errors
- Check VITE_API_URL env variable
- Verify CORS settings in backend
- Check backend is running in Render dashboard

### Build failures
- Check build logs in Render dashboard
- Verify all dependencies in package.json
- Ensure Node version compatibility

### Slow deployments
- Free tier has resource limits
- Upgrade to Starter plan for better performance
- Check backend logs for errors

---

## PART 9: Environment Variables Reference

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGO_URI=<your_mongodb_atlas_url>
JWT_SECRET=<strong_random_secret>
ADMIN_EMAIL=admin@paradipservice.com
ADMIN_PASSWORD=<secure_password>
BUSINESS_EMAIL=hello@paradipservice.in
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your_email>
SMTP_PASS=<app_password>
SMTP_FROM=ParadipService <no-reply@paradipservice.in>
```

### Frontend (.env.production)
```
VITE_API_URL=https://paradipservice-backend.onrender.com/api
```

---

## PART 10: Custom Domain (Optional)

1. Register domain (GoDaddy, Namecheap, etc.)
2. Render Dashboard → Service Settings → Custom Domains
3. Add your domain
4. Update DNS records as per Render instructions
5. Wait for DNS propagation (15-30 minutes)

---

## Success! 🎉

Your ParadipService is now live!
- **Frontend:** https://paradipservice-frontend.onrender.com
- **Backend:** https://paradipservice-backend.onrender.com
- **Database:** MongoDB Atlas (production)

Users can now book services online!
