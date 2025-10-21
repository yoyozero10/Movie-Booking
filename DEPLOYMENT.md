# Deployment Guide

This guide covers deploying both the frontend and backend of your Movie Booking application.

---

## 🎨 Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (free)
- Netlify CLI installed globally: `npm install -g netlify-cli`

### Steps

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and deploy**:
   ```bash
   netlify init
   ```
   - Select "Create & configure a new site"
   - Choose your team
   - Enter a site name (e.g., `movie-booking-app`)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy to production**:
   ```bash
   netlify deploy --prod
   ```

### Environment Variables on Netlify
After deployment, add these in Netlify dashboard (Site settings → Environment variables):
- `VITE_API_URL` = Your Render backend URL (e.g., `https://movie-booking-api.onrender.com/api`)

---

## 🚀 Backend Deployment (Render)

### Prerequisites
- Render account (free): https://render.com
- GitHub/GitLab account
- MongoDB Atlas database

### Option 1: Deploy via Git (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Render**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration
   - Click "Apply" to create the service

4. **Set Environment Variables** in Render dashboard:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = A strong secret key (generate one: `openssl rand -base64 32`)
   - `FRONTEND_URL` = Your Netlify frontend URL (e.g., `https://movie-booking-app.netlify.app`)

### Option 2: Manual Deployment (No Git)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Choose "Build and deploy from a Git repository" or "Deploy from Docker"
3. **Configure manually**:
   - Name: `movie-booking-api`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables (see above)

---

## 🔧 Post-Deployment Configuration

### 1. Update Frontend API URL

After backend is deployed, update your frontend to use the production API:

In `src/lib/api.ts`, ensure it uses the environment variable:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 2. Update CORS Settings

Your backend is already configured to use `FRONTEND_URL` from environment variables.
Make sure it's set to your Netlify URL in Render.

### 3. Test the Deployment

1. Visit your Netlify frontend URL
2. Try logging in and booking a movie
3. Check Render logs for any errors: `https://dashboard.render.com/web/<your-service-id>/logs`

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier**:
- Service spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free

**Netlify Free Tier**:
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

### MongoDB Atlas
Make sure your MongoDB Atlas cluster:
- Is set to free tier (M0)
- Has IP whitelist set to `0.0.0.0/0` (allow all) for Render
- Connection string is added to Render environment variables

### Security Checklist
- ✅ Never commit `.env` file to Git
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Keep MongoDB credentials secure
- ✅ Set proper CORS origins
- ✅ Enable rate limiting (already configured)

---

## 🐛 Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from Render

### CORS errors
- Verify `FRONTEND_URL` in Render matches your Netlify URL exactly
- Check browser console for specific CORS error messages

### Cold starts taking too long
- Consider upgrading to Render paid tier ($7/month) for no cold starts
- Or use Railway/Fly.io alternatives

---

## 🔄 Continuous Deployment

Once set up with Git:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Render automatically rebuilds and deploys backend
4. Netlify automatically rebuilds and deploys frontend (if connected to Git)

---

## 📞 Support

If you encounter issues:
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

---

**Your URLs after deployment**:
- Frontend: `https://<your-site-name>.netlify.app`
- Backend: `https://<your-service-name>.onrender.com`
- API Health Check: `https://<your-service-name>.onrender.com/api/health`
