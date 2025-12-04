import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/config/db';
import { MenuItem } from '@/server/models/MenuItem';

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

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const menuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
    
    // Group by category
    const grouped = {
      appetizers: menuItems.filter(item => item.category === 'appetizers'),
      mains: menuItems.filter(item => item.category === 'mains'),
      sushi: menuItems.filter(item => item.category === 'sushi')
    };

    // Auto-seed if empty
    if (grouped.appetizers.length === 0 && grouped.mains.length === 0 && grouped.sushi.length === 0) {
      console.log('Menu is empty, seeding initial data...');
      await MenuItem.insertMany(menuData);
      console.log(`Seeded ${menuData.length} menu items`);
      
      // Re-fetch after seeding
      const newMenuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
      const newGrouped = {
        appetizers: newMenuItems.filter(item => item.category === 'appetizers'),
        mains: newMenuItems.filter(item => item.category === 'mains'),
        sushi: newMenuItems.filter(item => item.category === 'sushi')
      };
      
      return NextResponse.json(newGrouped, { status: 200 });
    }

    return NextResponse.json(grouped, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}
