# Quick Start Guide

## 5-Minute Quick Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure MongoDB

#### Option A: Local MongoDB
1. Install and start MongoDB local service
2. Create `.env.local` file:
```bash
MONGODB_URI=mongodb://localhost:27017/mangunrok
```

#### Option B: MongoDB Atlas (Cloud Database - Recommended)
1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get connection string
4. Create `.env.local` file:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mangunrok
```

### Step 3: Initialize Menu Data
```bash
npm run init-menu
```

### Step 4: Start Application
```bash
npm run dev
```

Visit http://localhost:3000 to view the application!

## Verify Functionality

1. ✅ Menu should load from database
2. ✅ Can add items to cart
3. ✅ Can submit orders (orders will be saved to database)

## Common Questions

**Q: Menu not displaying?**
A: Make sure you've run `npm run init-menu` to initialize data

**Q: Database connection error?**
A: Check if `MONGODB_URI` in `.env.local` file is correct

**Q: Order submission failed?**
A: Check MongoDB connection and network permissions

## Next Steps

Check [README.md](./README.md) for complete documentation
Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide
