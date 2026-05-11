# 🎯 Render Deployment - Quick Reference

## Visual Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Prepare (5 mins)                                    │
│ - Add .gitignore                                            │
│ - git init && git add . && git commit                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: MongoDB Atlas (10 mins)                             │
│ - Create cluster                                            │
│ - Create database user                                      │
│ - Add IP whitelist (0.0.0.0/0)                             │
│ - Copy connection string                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: GitHub (5 mins)                                     │
│ - Create repository on GitHub                              │
│ - git remote add origin [repo-url]                         │
│ - git push -u origin main                                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Backend on Render (15 mins)                         │
│ - Create Web Service                                        │
│ - Root: backend                                             │
│ - Start: npm start                                          │
│ - Set env vars (MONGO_URI, JWT_SECRET, etc)               │
│ - Copy backend URL                                          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Frontend on Render (15 mins)                        │
│ - Create Static Site                                        │
│ - Root: frontend                                            │
│ - Build: npm install && npm run build                      │
│ - Publish: dist                                             │
│ - VITE_API_BASE_URL: [backend-url]/api                     │
│ - Copy frontend URL                                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Test (10 mins)                                      │
│ - Backend health: https://backend-url.onrender.com/api/health
│ - Frontend: https://frontend-url.onrender.com              │
│ - Test booking submission                                  │
│ - Check MongoDB Atlas for booking                          │
└─────────────────────────────────────────────────────────────┘
                          ↓
                  🎉 LIVE! 🎉
```

---

## Environment Variables Quick Map

```
┌─ Backend (Render Env Vars) ────────────────────────────────┐
│                                                            │
│ PORT=5000                                                  │
│ NODE_ENV=production                                        │
│ MONGO_URI=mongodb+srv://user:pass@cluster/db              │
│ JWT_SECRET=[generate-random-32-chars]                     │
│ ADMIN_EMAIL=admin@paradipservice.com                      │
│ ADMIN_PASSWORD=[secure-password]                          │
│ BUSINESS_EMAIL=hello@paradipservice.in                    │
│ SMTP_HOST=smtp.gmail.com                                  │
│ SMTP_PORT=587                                             │
│ SMTP_USER=[your-gmail]                                    │
│ SMTP_PASS=[app-password]                                  │
│ SMTP_FROM=ParadipService <no-reply@paradipservice.in>    │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌─ Frontend (Render Env Vars) ───────────────────────────────┐
│                                                            │
│ VITE_API_BASE_URL=https://paradipservice-backend.         │
│                   onrender.com/api                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## MongoDB Atlas Setup Checklist

```
✓ Go to https://www.mongodb.com/cloud/atlas
✓ Sign up or log in
✓ Create new project (ParadipService-Prod)
✓ Create cluster (Shared/Free)
✓ Wait for cluster creation (~5-10 min)
✓ Go to Database Access
✓ Create user: paradip_admin
✓ Go to Network Access
✓ Add IP: 0.0.0.0/0
✓ Click Connect
✓ Choose "Connect your application"
✓ Select Node.js
✓ Copy connection string
✓ Replace <password> with user password
✓ Replace <database> with ParadipService
```

---

## GitHub Push Commands

```bash
# One-time setup
git config user.name "Your Name"
git config user.email "your@email.com"

# After each change
git add .
git commit -m "Description of changes"
git push origin main

# First time pushing new repo
git remote add origin https://github.com/USERNAME/ParadipService.git
git branch -M main
git push -u origin main
```

---

## Render Dashboard Links

- **Backend Service**: https://dashboard.render.com → Web Services
- **Frontend Site**: https://dashboard.render.com → Static Sites
- **View Logs**: Click service name → Logs tab
- **Env Vars**: Click service name → Environment

---

## Testing Commands

```bash
# Test backend health
curl https://paradipservice-backend.onrender.com/api/health

# Expected response:
# {"status":"ok","service":"ParadipService API"}

# Check MongoDB for bookings
# Go to MongoDB Atlas → Collections → bookings
# Should see your test booking with bookingRef
```

---

## Common Issues Quick Fix

| Issue | Fix |
|-------|-----|
| Backend won't deploy | Check build logs, verify Node version |
| Frontend won't build | Check npm dependencies, verify React/Vite |
| Can't connect to DB | Check MONGO_URI format and IP whitelist |
| API calls fail | Check VITE_API_BASE_URL and CORS settings |
| Slow performance | Upgrade plan from Free to Starter |
| Build timeout | Increase timeout or upgrade plan |

---

## Cost Calculator

| Service | Plan | Cost |
|---------|------|------|
| Render Backend | Free | $0/mo |
| Render Frontend | Free | $0/mo |
| MongoDB | Free 512MB | $0/mo |
| **Total Free** | - | **$0/mo** |
| | | |
| Render Backend | Starter | $7/mo |
| Render Frontend | Starter | $7/mo |
| MongoDB | M2 Shared | $0.59/mo |
| **Total Production** | - | **~$15/mo** |

---

## Success Checklist

- [ ] Code on GitHub
- [ ] MongoDB Atlas cluster running
- [ ] Backend deployed (shows "Server running on port 5000")
- [ ] Frontend deployed (shows static site)
- [ ] Backend responds to /api/health
- [ ] Frontend loads without errors
- [ ] Booking form works
- [ ] Booking saves to database
- [ ] Booking has unique bookingRef
- [ ] CORS errors resolved
- [ ] API calls successful

---

## Support Resources

| Resource | Link |
|----------|------|
| Render Docs | https://render.com/docs |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Express.js | https://expressjs.com |
| React | https://react.dev |
| Vite | https://vitejs.dev |

---

## File Locations

```
📁 ParadipService/
├── 📄 RENDER_DEPLOYMENT_GUIDE.md ← START HERE (detailed)
├── 📄 DEPLOYMENT_CHECKLIST.md ← USE THIS (quick)
├── 📄 ENVIRONMENT_VARIABLES.md ← REFERENCE (env vars)
├── 📄 GITHUB_SETUP.md ← FOLLOW (Git help)
├── 📄 QUICK_REFERENCE.md ← THIS FILE
├── 📄 render.yaml (Render config)
├── 📁 backend/
│   └── (your backend code)
└── 📁 frontend/
    └── (your frontend code)
```

---

## Time Estimate

| Phase | Time |
|-------|------|
| Prepare & Git | 5 min |
| MongoDB Atlas | 10 min |
| GitHub Push | 5 min |
| Backend Deploy | 15 min |
| Frontend Deploy | 15 min |
| Testing | 10 min |
| **Total** | **60 min** |

---

## 🚀 Ready to Deploy?

1. Read: **RENDER_DEPLOYMENT_GUIDE.md**
2. Follow: **DEPLOYMENT_CHECKLIST.md**
3. Reference: **ENVIRONMENT_VARIABLES.md**
4. Deploy: Use this quick reference as you go!

**Good luck! Your app will be live in 60 minutes! 🎉**
