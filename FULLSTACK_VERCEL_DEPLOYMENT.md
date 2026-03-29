# 🚀 Vercel Deployment Guide - Full Stack Patronex

## 📋 Overview
This guide covers deploying both **Frontend (Next.js)** and **Backend (Express + MongoDB)** on Vercel as a single unified application.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Vercel        │    │   Backend       │
│   (Next.js)     │────│   Router        │────│   (Express)     │
│   Port: 3000    │    │                 │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌────▼────┐              ┌────▼────┐
    │ Firebase │              │ Server  │              │ MongoDB │
    │ Auth     │              │ Functions│              │ Atlas   │
    └─────────┘              └─────────┘              └─────────┘
```

## 🛠️ Prerequisites

### 1. Database Setup (MongoDB Atlas)
```bash
# 1. Go to https://cloud.mongodb.com
# 2. Create free cluster
# 3. Create database user
# 4. Get connection string (SRV format)
# 5. Add Vercel IP to whitelist: 0.0.0.0/0
```

### 2. Firebase Setup
```bash
# 1. Go to Firebase Console → Project Settings → Service Accounts
# 2. Click "Generate new private key"
# 3. Download JSON file
# 4. Copy values for environment variables
```

### 3. GitHub Repository
```bash
# Ensure all code is pushed to GitHub
git add -A
git commit -m "Ready for Vercel deployment"
git push origin main
```

## 🚀 Deployment Steps

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository

### Step 2: Configure Build Settings
```json
{
  "Build Command": "npm run build",
  "Output Directory": ".next",
  "Install Command": "npm install",
  "Framework Preset": "Next.js"
}
```

### Step 3: Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patronex

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# Application URLs
FRONTEND_URL=https://your-app-name.vercel.app
BACKEND_URL=https://your-app-name.vercel.app
NODE_ENV=production

# File Upload Configuration
MAX_FILE_SIZE=52428800
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
ALLOWED_VIDEO_TYPES=video/mp4,video/mpeg,video/webm
ALLOWED_DOCUMENT_TYPES=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Test the application

## 🧪 Testing the Deployment

### 1. Frontend Test
Visit: `https://your-app-name.vercel.app`
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Sign in/up pages accessible

### 2. Backend Test
Visit: `https://your-app-name.vercel.app/api/health`
```json
{
  "success": true,
  "message": "Backend is running with Firebase Auth ✅"
}
```

### 3. Integration Test
1. Try signing up/in
2. Check if user profile is created
3. Test profile updates
4. Verify visit tracking

## 📊 API Endpoints

### Authentication Protected (all require Firebase token):
```
GET    /api/health           - Health check
GET    /api/profile          - Get current user profile
PUT    /api/profile          - Update user profile
GET    /api/profile/:userId  - Get public profile
POST   /api/visit            - Record profile visit
GET    /api/profile/uploads  - Get user uploads
POST   /api/profile/upload   - Upload file
DELETE /api/profile/upload/:id - Delete upload
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. MongoDB Connection Error
```bash
# Check: MONGODB_URI is correct
# Check: IP whitelist includes 0.0.0.0/0
# Check: Database user has correct permissions
```

#### 2. Firebase Auth Error
```bash
# Check: FIREBASE_PRIVATE_KEY format (use \n for line breaks)
# Check: FIREBASE_CLIENT_EMAIL is correct
# Check: Service account has proper permissions
```

#### 3. CORS Error
```bash
# Check: FRONTEND_URL matches deployed URL
# Check: No trailing slashes in URLs
```

#### 4. Build Failure
```bash
# Check: All dependencies are in package.json
# Check: No syntax errors in code
# Check: Environment variables are set correctly
```

## 🔄 CI/CD Workflow

### Automatic Deployments:
```bash
# Push to main branch → Auto-deploy to production
git push origin main

# Push to other branches → Preview deployment
git push origin feature-branch
```

### Manual Deployments:
```bash
# Redeploy latest commit
# In Vercel Dashboard → Deployments → Redeploy
```

## 📈 Monitoring

### Vercel Analytics:
- Visit Vercel Dashboard → Analytics
- Monitor page views, API calls, errors

### MongoDB Monitoring:
- Visit MongoDB Atlas → Metrics
- Monitor database performance

### Firebase Monitoring:
- Visit Firebase Console → Usage
- Monitor authentication usage

## 🎯 Best Practices

### 1. Environment Variables
- Never commit `.env.local` to git
- Use different values for development/production
- Update FRONTEND_URL after deployment

### 2. Database
- Use MongoDB Atlas for production
- Implement proper indexes for performance
- Monitor connection limits

### 3. Security
- All API routes are protected by Firebase Auth
- Rate limiting implemented
- CORS properly configured

### 4. Performance
- Serverless functions scale automatically
- Database connections are optimized
- Static assets are cached by Vercel

## 🆘 Support

### For Database Issues:
- Contact your database team member
- Check MongoDB Atlas documentation

### For Firebase Issues:
- Check Firebase Console
- Review service account configuration

### For Vercel Issues:
- Check Vercel deployment logs
- Review build output
- Contact Vercel support if needed

---

**🎉 Your full-stack application is now ready for production on Vercel!**
