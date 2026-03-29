# Vercel Deployment Guide

## 🚀 Deploy Frontend + Backend on Vercel

### Prerequisites
- MongoDB Atlas account
- Firebase project with Admin SDK configured
- Vercel account

### Step 1: Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get your connection string (SRV format)

### Step 2: Setup Firebase Admin SDK
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the values to your Vercel environment variables

### Step 3: Deploy to Vercel

#### Option A: Single Repository (Recommended)
1. Push all changes to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect both frontend and backend

#### Option B: Separate Projects
1. **Frontend**: Deploy the main folder
2. **Backend**: Create separate Vercel project pointing to `backend` folder

### Step 4: Environment Variables

In Vercel dashboard, add these environment variables:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patronex

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# URLs
FRONTEND_URL=https://your-app-name.vercel.app
BACKEND_URL=https://your-app-name.vercel.app
NODE_ENV=production

# File Upload
MAX_FILE_SIZE=52428800
```

### Step 5: Test Deployment
1. Visit your frontend URL
2. Test authentication
3. Check API health: `https://your-app.vercel.app/api/health`

### Important Notes
- The backend runs as serverless functions on Vercel
- All `/api/*` routes go to the backend
- All other routes go to the Next.js frontend
- MongoDB connection is established per request
- Firebase Admin SDK is initialized per function

### Troubleshooting
- If backend fails: Check environment variables
- If CORS errors: Verify FRONTEND_URL is correct
- If MongoDB fails: Check connection string and IP whitelist
