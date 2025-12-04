# Deployment Guide

This guide will help you deploy the Mangunrok restaurant application to production.

## Deployment Options

### Option 1: Vercel (Recommended - Native Next.js Support)

1. **Prepare Code**
   - Ensure all changes are committed to Git
   - Push to GitHub/GitLab/Bitbucket

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Configure environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
   - Click "Deploy"

3. **Initialize Database**
   - After deployment, run in Vercel's terminal:
     ```bash
     npm run init-menu
     ```
   - Or manually add data using MongoDB Atlas Web interface

4. **Access Application**
   - Vercel will provide a URL, e.g.: `https://your-app.vercel.app`

### Option 2: MongoDB Atlas (Cloud Database) + Vercel

1. **Set up MongoDB Atlas**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create a database user
   - Get connection string, format:
     ```
     mongodb+srv://username:password@cluster.mongodb.net/mangunrok
     ```

2. **Deploy on Vercel**
   - Use MongoDB Atlas connection string as `MONGODB_URI`
   - Deploy application

3. **Initialize Data**
   - Use MongoDB Compass or Atlas Web UI to add menu data
   - Or run `npm run init-menu` locally (requires correct MONGODB_URI configuration)

### Option 3: Other Platforms (Railway, Render, Heroku)

#### Railway

1. Create a new project on Railway
2. Add MongoDB service or use external MongoDB
3. Set environment variable `MONGODB_URI`
4. Deploy code

#### Render

1. Create a new Web Service
2. Connect Git repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variable `MONGODB_URI`

## Environment Variable Configuration

In production environment, ensure the following environment variable is set:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mangunrok
```

## Database Initialization

After deployment, you need to initialize menu data. There are several methods:

### Method 1: Using Initialization Script (Local)

1. Set up `.env.local` file locally, pointing to production database
2. Run: `npm run init-menu`

### Method 2: Using MongoDB Compass

1. Connect to your MongoDB database
2. Create `menuitems` collection
3. Insert data (refer to `server/scripts/initMenu.ts`)

### Method 3: Using MongoDB Atlas Web UI

1. Log in to MongoDB Atlas
2. Navigate to Collections
3. Manually add menu item documents

## Verify Deployment

After deployment, verify the following features:

1. ✅ Visit homepage, check if menu loads
2. ✅ Add items to cart
3. ✅ Submit order, check if successfully saved to database
4. ✅ Check order records in MongoDB database

## Troubleshooting

### Menu Not Displaying

- Check if MongoDB connection is working
- Verify `MONGODB_URI` environment variable is correctly set
- Confirm menu data has been initialized

### Order Submission Failed

- Check if API routes are working properly
- View server logs
- Verify database connection

### Database Connection Error

- Check MongoDB URI format
- Verify network access permissions (IP whitelist)
- Confirm database user permissions

## Production Best Practices

1. **Security**
   - Use environment variables to store sensitive information
   - Enable MongoDB authentication
   - Use HTTPS

2. **Performance**
   - Enable Next.js caching
   - Use CDN for static assets
   - Optimize database queries

3. **Monitoring**
   - Set up error monitoring (e.g., Sentry)
   - Monitor API response times
   - Track database performance

## Support

If you have questions, please check:
- Next.js documentation: https://nextjs.org/docs
- MongoDB documentation: https://docs.mongodb.com
- Vercel documentation: https://vercel.com/docs
