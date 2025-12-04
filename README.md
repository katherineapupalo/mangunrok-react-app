# Mangunrok Asian Bistro - Full Stack Restaurant Application

This is a full-stack restaurant web application built with Next.js, Node.js, Express, and MongoDB.

## Features

- 🍜 **Menu Management**: All menu items are dynamically loaded from MongoDB database
- 🛒 **Shopping Cart**: Add, update, and remove items from cart
- 📦 **Order Processing**: Orders are automatically saved to MongoDB database
- 💾 **Data Persistence**: All changes (menu, orders) are persisted to database
- 🎨 **Modern UI**: Responsive design built with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

### Backend
- Next.js API Routes
- MongoDB (via Mongoose)
- TypeScript

## Installation and Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB

Create `.env.local` file (based on `.env.local.example`):

```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/mangunrok

# Or use MongoDB Atlas (Cloud Database)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mangunrok
```

### 3. Initialize Menu Data

Run the initialization script to populate menu items in the database:

```bash
npm run init-menu
```

### 4. Start Development Server

```bash
npm run dev
```

The application will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### GET /api/menu
Get all menu items, grouped by category.

**Response Example:**
```json
{
  "appetizers": [
    { "name": "Gyoza (Pork or Veggie)", "price": 8, "category": "appetizers" }
  ],
  "mains": [...],
  "sushi": [...]
}
```

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "items": [
    { "name": "Tonkotsu Ramen", "price": 16, "quantity": 2 }
  ]
}
```

**Response:**
```json
{
  "message": "Order placed successfully",
  "orderId": "...",
  "total": 32
}
```

### GET /api/orders
Get all orders (for administrative purposes).

## Project Structure

```
mangunrok-react-app/
├── app/
│   ├── api/
│   │   ├── menu/
│   │   │   └── route.ts          # Menu API endpoint
│   │   └── orders/
│   │       └── route.ts          # Orders API endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── server/
│   ├── config/
│   │   └── db.ts                 # MongoDB connection configuration
│   ├── models/
│   │   ├── MenuItem.ts           # Menu item model
│   │   └── Order.ts              # Order model
│   └── scripts/
│       └── initMenu.ts           # Menu initialization script
├── package.json
└── README.md
```

## Deployment

### Deploy with Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable `MONGODB_URI`
4. After deployment, run `npm run init-menu` to initialize menu data

### Using Other Platforms

Ensure:
- Set `MONGODB_URI` environment variable
- Run `npm run build` to build the project
- Run `npm run init-menu` to initialize database

## Development

### Adding New Menu Items

1. Edit `server/scripts/initMenu.ts`
2. Run `npm run init-menu` to reinitialize database

Or add data directly through MongoDB client.

## License

MIT
