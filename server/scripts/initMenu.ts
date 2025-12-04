import connectDB from '../config/db';
import { MenuItem } from '../models/MenuItem';

const menuData = [
  // Appetizers
  { name: 'Gyoza (Pork or Veggie)', price: 8, category: 'appetizers' },
  { name: 'Spring Rolls (4 pcs)', price: 7, category: 'appetizers' },
  { name: 'Edamame with Sea Salt', price: 6, category: 'appetizers' },
  { name: 'Takoyaki (Octopus Balls)', price: 10, category: 'appetizers' },
  
  // Main Dishes
  { name: 'Tonkotsu Ramen', price: 16, category: 'mains' },
  { name: 'Curry with Rice', price: 14, category: 'mains' },
  { name: 'Korean BBQ Beef Bowl', price: 18, category: 'mains' },
  { name: 'Teriyaki Salmon Bento', price: 20, category: 'mains' },
  
  // Sushi
  { name: 'California Roll (8 pcs)', price: 12, category: 'sushi' },
  { name: 'Spicy Tuna Roll', price: 14, category: 'sushi' },
  { name: 'Dragon Roll', price: 16, category: 'sushi' },
  { name: 'Sashimi Platter', price: 22, category: 'sushi' }
];

async function initMenu() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert menu items
    await MenuItem.insertMany(menuData);
    console.log(`Inserted ${menuData.length} menu items`);

    process.exit(0);
  } catch (error) {
    console.error('Error initializing menu:', error);
    process.exit(1);
  }
}

initMenu();

