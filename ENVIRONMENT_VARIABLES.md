# Production Environment Variables

## Backend (.env or Render Environment)
```
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://paradip_admin:PASSWORD@cluster0.xxxxx.mongodb.net/ParadipService?retryWrites=true&w=majority

# JWT
JWT_SECRET=use_a_strong_random_secret_here_min_32_chars

# Admin
ADMIN_EMAIL=admin@paradipservice.com
ADMIN_PASSWORD=StrongPassword123

# Email (Gmail requires App Password, not regular password)
BUSINESS_EMAIL=hello@paradipservice.in
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_FROM=ParadipService <no-reply@paradipservice.in>
CUSTOMER_CONFIRMATION_EMAIL=

# WhatsApp (Optional)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
WHATSAPP_TO=
WHATSAPP_STATUS_UPDATES_ENABLED=false
```

## Frontend (.env.production)
```
VITE_API_BASE_URL=https://paradipservice-backend.onrender.com/api
```

## Frontend (.env.development - Local)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## How to Generate Secure JWT_SECRET
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Gmail App Password Setup
1. Enable 2FA on Gmail account
2. Go to Google Account → Security → App Passwords
3. Select "Mail" and "Windows Computer"
4. Copy generated 16-character password
5. Use as SMTP_PASS

## MongoDB Atlas Connection String Format
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

Replace:
- `<username>`: Your database user (e.g., paradip_admin)
- `<password>`: Your database password (URL encoded if special chars)
- `<cluster>`: Your cluster name (e.g., cluster0.xxxxx)
- `<database>`: Database name (ParadipService)
