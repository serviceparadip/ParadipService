# GitHub Setup & Push Guide

## Prerequisites
- GitHub account
- Git installed locally
- ParadipService project ready

---

## Step 1: Initialize Git (if not already done)

```bash
cd C:\Users\lokan\Desktop\ParadipService
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

---

## Step 2: Create .gitignore

Create file: `ParadipService/.gitignore`

```
# Environment variables
.env
.env.local
.env.*.local
.env.production

# Node modules
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Build output
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite

# MongoDB
.mongodb/
data/

# Temp files
*.tmp
*.temp
```

---

## Step 3: Create Repository on GitHub

1. Go to https://github.com/new
2. Create new repository: `ParadipService`
3. Choose "Public" (or Private)
4. Do NOT initialize with README (we have one)
5. Click "Create repository"
6. Copy the repository URL (HTTPS)

---

## Step 4: Add Remote & Push

```bash
cd C:\Users\lokan\Desktop\ParadipService

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ParadipService.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: ParadipService booking system"

# Push to GitHub
git push -u origin main
```

If branch is named `master` instead of `main`:
```bash
git branch -M main
git push -u origin main
```

---

## Step 5: Verify on GitHub

1. Go to your repository on GitHub
2. You should see all your files
3. Check that `.env` is NOT included (should be in .gitignore)

---

## Step 6: Connect to Render

Once code is on GitHub:

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select "Build and deploy from Git repository"
4. Click "Connect" to GitHub
5. Select your `ParadipService` repository
6. Render will auto-deploy on every push!

---

## Future Deployments

After making changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Render automatically detects the push and redeploys!

---

## Useful Git Commands

```bash
# Check status
git status

# View recent commits
git log --oneline

# See differences
git diff

# Undo uncommitted changes
git checkout .

# View current remote
git remote -v

# Update from GitHub
git pull origin main
```

---

## Troubleshooting

### "Permission denied (publickey)"
- Generate SSH key: https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh
- Add to GitHub settings

### "fatal: 'origin' does not appear to be a 'git' repository"
- Make sure you're in the ParadipService directory
- Check: `git remote -v`

### Accidentally committed .env file
```bash
# Remove it (won't delete locally)
git rm --cached .env
git commit -m "Remove .env from tracking"
git push origin main

# Add to .gitignore for future
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to .gitignore"
git push origin main
```

---

## Security Note

🔒 **NEVER commit:**
- .env files with real passwords
- API keys or secrets
- Database credentials
- Private authentication tokens

Always use .gitignore and set secrets in Render dashboard!
