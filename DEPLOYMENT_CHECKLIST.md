# Render Deployment Quick Checklist

## Pre-Deployment
- [ ] All code committed and pushed to GitHub (main branch)
- [ ] `.env` files are in `.gitignore` (not committed)
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] IP whitelist updated (0.0.0.0/0)
- [ ] Connection string copied and password replaced

## Backend Setup on Render
- [ ] Create Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Add all environment variables:
  - PORT=5000
  - NODE_ENV=production
  - MONGO_URI=mongodb+srv://...
  - JWT_SECRET=<secure_secret>
  - ADMIN_EMAIL, BUSINESS_EMAIL
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- [ ] Wait for deployment to complete
- [ ] Copy Backend URL (e.g., https://paradipservice-backend.onrender.com)
- [ ] Test `/api/health` endpoint

## Frontend Setup on Render
- [ ] Create Static Site on Render
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Add environment variable:
  - VITE_API_BASE_URL=<backend_url>/api
- [ ] Wait for build to complete
- [ ] Copy Frontend URL
- [ ] Test booking form submission

## Post-Deployment Testing
- [ ] Frontend loads at https://paradipservice-frontend.onrender.com
- [ ] Backend API responds at https://paradipservice-backend.onrender.com/api/health
- [ ] Fill out booking form on frontend
- [ ] Submit booking
- [ ] Check MongoDB Atlas for new booking document
- [ ] Verify booking has `bookingRef` field

## Production Verification
- [ ] User can book a service
- [ ] Booking appears in MongoDB Atlas
- [ ] Booking has unique reference number
- [ ] Email fields validated
- [ ] Date validation prevents past dates
- [ ] AC-specific fields appear when AC selected
- [ ] Form resets after successful submission

## Optional: Custom Domain
- [ ] Domain registered
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] Test with custom domain

## Monitoring
- [ ] Setup Render alerts for deployment failures
- [ ] Check backend logs regularly
- [ ] Monitor MongoDB Atlas usage
- [ ] Setup email notifications

## Success!
🎉 ParadipService is now live in production!
